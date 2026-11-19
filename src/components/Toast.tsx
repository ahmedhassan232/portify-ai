"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface ToastItem { id: number; kind: "success" | "error" | "info"; msg: string }
const Ctx = createContext<{ push: (msg: string, kind?: ToastItem["kind"]) => void }>({ push: () => {} });
export const useToast = () => useContext(Ctx);

let seq = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const push = useCallback((msg: string, kind: ToastItem["kind"] = "info") => {
    const id = seq++;
    setItems((p) => [...p, { id, kind, msg }]);
    setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 4200);
  }, []);
  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 inset-inline-0 z-[100] flex flex-col items-center gap-2 px-4" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className="pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl border border-[#E9E7F0] bg-white px-4 py-3 shadow-xl animate-fade-up">
            {t.kind === "success" ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : t.kind === "error" ? <AlertCircle className="h-5 w-5 text-rose-600" /> : <Info className="h-5 w-5 text-[#6C4CF1]" />}
            <p className="text-sm font-medium text-[#171625]">{t.msg}</p>
            <button onClick={() => setItems((p) => p.filter((x) => x.id !== t.id))} className="ms-2 rounded-full p-1 hover:bg-slate-100" aria-label="dismiss"><X className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
