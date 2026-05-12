"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, X } from "lucide-react";
import type { Municipio, Fonte } from "@/lib/queries/contatti";

const MUNICIPI: { value: Municipio; label: string }[] = [
  { value: "VIII", label: "Municipio VIII" },
  { value: "IX", label: "Municipio IX" },
  { value: "X", label: "Municipio X" },
];

const FONTI: { value: Fonte; label: string }[] = [
  { value: "banchetto", label: "Banchetto" },
  { value: "form_online", label: "Form online" },
  { value: "sito_web", label: "Sito web" },
  { value: "evento", label: "Evento" },
  { value: "social", label: "Social" },
  { value: "passaparola", label: "Passaparola" },
  { value: "contatto_diretto", label: "Contatto diretto" },
  { value: "altro", label: "Altro" },
];

type Props = {
  initialQ: string;
  initialMunicipio?: Municipio;
  initialFonte?: Fonte;
  initialDataRif: string;
  initialEtaFilter: "tutti" | "maggiorenni" | "minorenni";
};

export function ElettoriFilters({
  initialQ,
  initialMunicipio,
  initialFonte,
  initialDataRif,
  initialEtaFilter,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [q, setQ] = useState(initialQ);
  const [dataRif, setDataRif] = useState(initialDataRif);

  function applyFilters(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.length > 0) params.set(key, value);
      else params.delete(key);
    });
    params.delete("page");
    startTransition(() => router.push(`/elettori?${params.toString()}`));
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    applyFilters({ q });
  }

  function handleDataRif(e: React.FormEvent) {
    e.preventDefault();
    applyFilters({ dataRif });
  }

  function clearAll() {
    setQ("");
    startTransition(() => router.push("/elettori"));
  }

  const hasActiveFilters =
    !!initialQ || !!initialMunicipio || !!initialFonte || initialEtaFilter !== "tutti";

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-graymid" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cerca per nome, cognome, email, telefono…"
            className="w-full h-10 pl-9 pr-3 bg-white border-[1.5px] border-grayline text-sm text-ink-soft focus:border-red focus:outline-none transition-colors"
          />
        </div>
        <button type="submit" className="h-10 px-4 bg-ink text-cream text-[13px] font-display font-bold uppercase tracking-wider hover:bg-red transition-colors">
          Cerca
        </button>
      </form>

      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={initialMunicipio ?? ""}
          onChange={(e) => applyFilters({ municipio: e.target.value || undefined })}
          className="h-10 px-3 bg-white border-[1.5px] border-grayline text-sm text-ink-soft focus:border-red focus:outline-none min-w-[160px]"
        >
          <option value="">Municipio (tutti)</option>
          {MUNICIPI.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={initialFonte ?? ""}
          onChange={(e) => applyFilters({ fonte: e.target.value || undefined })}
          className="h-10 px-3 bg-white border-[1.5px] border-grayline text-sm text-ink-soft focus:border-red focus:outline-none min-w-[160px]"
        >
          <option value="">Fonte (tutte)</option>
          {FONTI.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={initialEtaFilter}
          onChange={(e) => applyFilters({ eta: e.target.value === "tutti" ? undefined : e.target.value })}
          className="h-10 px-3 bg-white border-[1.5px] border-grayline text-sm text-ink-soft focus:border-red focus:outline-none min-w-[160px]"
        >
          <option value="tutti">Età (tutti)</option>
          <option value="maggiorenni">Solo maggiorenni</option>
          <option value="minorenni">Solo minorenni</option>
        </select>

        <form onSubmit={handleDataRif} className="flex items-center gap-2">
          <label className="text-[11px] uppercase tracking-wider text-graymid">Alla data:</label>
          <input
            type="date"
            value={dataRif}
            onChange={(e) => setDataRif(e.target.value)}
            onBlur={handleDataRif}
            className="h-10 px-3 bg-white border-[1.5px] border-grayline text-sm text-ink-soft focus:border-red focus:outline-none"
          />
        </form>

        {hasActiveFilters && (
          <button onClick={clearAll} className="flex items-center gap-1 h-10 px-3 text-[12px] uppercase tracking-wider text-graymid hover:text-red transition-colors">
            <X size={14} /> Azzera
          </button>
        )}

        {isPending && (
          <span className="text-[11px] uppercase tracking-wider text-graymid">Caricamento…</span>
        )}
      </div>
    </div>
  );
}
