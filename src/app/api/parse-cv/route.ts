import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BYTES = 10 * 1024 * 1024;

function isPdf(buffer: Buffer) {
  // A surprising number of “PDFs” are HTML error/login pages saved with a .pdf name.
  return buffer.subarray(0, 5).toString("ascii") === "%PDF-";
}

function pdfErrorMessage(error: unknown) {
  const detail = error instanceof Error ? error.message : String(error);
  if (/xref|formaterror|invalid pdf|unexpected eof|corrupt/i.test(detail)) {
    return "This PDF has an invalid internal structure and cannot be read. Re-export it from the original document, or upload the DOCX version.";
  }
  if (/password|encrypted|security/i.test(detail)) {
    return "This PDF is password-protected. Remove the password and upload it again, or use a DOCX file.";
  }
  return "Could not read this PDF. If it is a scanned document, export it with selectable text or upload the DOCX version.";
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "File too large. Max 10MB." }, { status: 413 });
    if (file.size === 0) return NextResponse.json({ error: "Empty file" }, { status: 400 });

    const name = (file.name || "").toLowerCase();
    const type = file.type || "";
    const buf = Buffer.from(await file.arrayBuffer());

    let text = "";
    let method = "";

    if (name.endsWith(".pdf") || type === "application/pdf") {
      if (!isPdf(buf)) {
        return NextResponse.json({ error: "This file is not a valid PDF document. Please download or export the CV again.", code: "INVALID_PDF" }, { status: 422 });
      }
      try {
        const pdfParse = require("pdf-parse");
        const fn = pdfParse?.default ?? pdfParse;
        const out = await fn(buf);
        text = String(out?.text ?? "");
        method = "pdf-parse";
      } catch (e) {
        // Do not emit parser stack traces for a user-supplied malformed document.
        // PDF repair/OCR would require a dedicated service; silently guessing text is unsafe.
        return NextResponse.json({ error: pdfErrorMessage(e), code: "PDF_UNREADABLE" }, { status: 422 });
      }
    } else if (name.endsWith(".docx") || type.includes("wordprocessingml") || type.includes("officedocument")) {
      try {
        const mammoth = await import("mammoth");
        const out = await mammoth.extractRawText({ buffer: buf });
        text = String(out?.value ?? "");
        method = "mammoth";
      } catch (e) {
        return NextResponse.json({ error: "Could not read this DOCX file." }, { status: 422 });
      }
    } else if (name.endsWith(".txt") || type.startsWith("text/")) {
      text = buf.toString("utf-8");
      method = "text";
    } else {
      return NextResponse.json({ error: "Unsupported format. Upload PDF or DOCX." }, { status: 415 });
    }

    text = text.replace(/\r/g, "\n").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, 60000);

    if (!text || text.length < 20) {
      return NextResponse.json({ error: "No extractable text found. Scanned PDFs need OCR — export your CV as a text-based PDF or DOCX.", text: "", method }, { status: 422 });
    }

    return NextResponse.json({ text, chars: text.length, method, fileName: file.name });
  } catch {
    return NextResponse.json({ error: "Failed to parse file" }, { status: 500 });
  }
}
