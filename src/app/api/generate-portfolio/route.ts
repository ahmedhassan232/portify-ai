import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key is missing" },
        { status: 500 }
      );
    }

    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey,
    });

    const { cvText } = await req.json();

    if (
      !cvText ||
      typeof cvText !== "string" ||
      cvText.trim().length < 20
    ) {
      return NextResponse.json(
        { error: "Please provide valid CV text" },
        { status: 400 }
      );
    }

    const completion = await client.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert CV analyst and portfolio designer.
Extract information from the CV and return ONLY valid JSON.

Use this structure:
{
  "name": "",
  "title": "",
  "email": "",
  "phone": "",
  "location": "",
  "summary": "",
  "skills": [],
  "experience": [],
  "education": [],
  "projects": [],
  "languages": []
}

Never invent information. Use empty strings or arrays when information is missing.
Write professional English.`,
        },
        {
          role: "user",
          content: cvText.slice(0, 30000),
        },
      ],
      temperature: 0.2,
    });

    const result = completion.choices[0]?.message?.content;

    if (!result) {
      throw new Error("Empty AI response");
    }

    const cleaned = result
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const portfolio = JSON.parse(cleaned);

    return NextResponse.json({ success: true, portfolio });
  } catch (error) {
    console.error("OpenRouter error:", error);

    return NextResponse.json(
      { error: "AI portfolio generation failed" },
      { status: 500 }
    );
  }
}