import type { DesignSettings, PortfolioData } from "@/types/portfolio";

const PROJECT_KEY = "portify-project-v1";
const IDB_NAME = "portify-db";
const IDB_STORE = "kv";

function idbOpen(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(IDB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(key: string, value: unknown): Promise<void> {
  const db = await idbOpen();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).put(JSON.stringify(value), key);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

async function idbGet<T>(key: string): Promise<T | null> {
  try {
    const db = await idbOpen();
    return await new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => {
        db.close();
        try {
          resolve(req.result ? (JSON.parse(req.result) as T) : null);
        } catch {
          resolve(null);
        }
      };
      req.onerror = () => {
        db.close();
        resolve(null);
      };
    });
  } catch {
    return null;
  }
}

async function idbDel(key: string): Promise<void> {
  try {
    const db = await idbOpen();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).delete(key);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); resolve(); };
    });
  } catch {}
}

export interface StoredProject {
  cvText: string;
  cvFileName: string;
  profession: string;
  suggestedProfession?: string;
  portfolioLanguage: "en" | "ar";
  templateId: string;
  data: PortfolioData;
  design: DesignSettings;
  updatedAt: number;
}

export const defaultDesign = (accent = "#6C4CF1"): DesignSettings => ({
  accentColor: accent,
  backgroundColor: "#FFFFFF",
  textColor: "#171625",
  mutedColor: "#73738A",
  fontFamily: "Inter",
  borderRadius: 14,
  spacing: "comfortable",
  darkMode: false,
});

export async function saveProject(p: StoredProject): Promise<void> {
  p.updatedAt = Date.now();
  try {
    window.localStorage.setItem(
      PROJECT_KEY,
      JSON.stringify({ ...p, cvText: p.cvText.slice(0, 4000), data: undefined, design: p.design, templateId: p.templateId, profession: p.profession, portfolioLanguage: p.portfolioLanguage, updatedAt: p.updatedAt })
    );
  } catch {}
  try {
    await idbSet(PROJECT_KEY, p);
  } catch {}
  try {
    window.dispatchEvent(new CustomEvent("portify:saved", { detail: { at: p.updatedAt } }));
  } catch {}
}

export async function loadProject(): Promise<StoredProject | null> {
  const full = await idbGet<StoredProject>(PROJECT_KEY);
  if (full && full.data) return full;
  try {
    const raw = window.localStorage.getItem(PROJECT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.data) return parsed as StoredProject;
    return null;
  } catch {
    return null;
  }
}

export async function clearProject(): Promise<void> {
  try {
    window.localStorage.removeItem(PROJECT_KEY);
  } catch {}
  await idbDel(PROJECT_KEY);
  try {
    window.localStorage.removeItem("portify-cv-text");
    window.localStorage.removeItem("portify-profession");
    window.localStorage.removeItem("portify-template");
  } catch {}
}

export function saveSmall(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

export function loadSmall(key: string, fallback = ""): string {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function exportJson(p: StoredProject): string {
  return JSON.stringify(p, null, 2);
}

export function parseImportedJson(text: string): StoredProject | null {
  try {
    const j = JSON.parse(text);
    if (!j?.data?.personalInfo) return null;
    return j as StoredProject;
  } catch {
    return null;
  }
}
