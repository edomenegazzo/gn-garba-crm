"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, X } from "lucide-react";
import type {
  Municipio,
  Fonte,
  Categoria,
} from "@/lib/queries/contatti";

const MUNICIPI: { value: Municipio; label: string }[] = [
  { value: "VIII", label: "Municipio VIII" },
  { value: "IX", label: "Municipio IX" },
  { value: "X", label: "Municipio X" },
  { value: "altro_roma", label: "Altro Roma" },
  { value: "fuori_roma", label: "Fuori Roma" },
  { value: "da_classificare", label: "Da classificare" },
];

const FONTI: { value: Fonte; label: string }[] = [
  { value: "banchetto", label: "Banchetto" },
  { value: "form_online", label: "Form online" },
  { value: "sito_web", label: "Sito web" },
  { value: "evento", label: "Evento" },
  { value: "social", label: "Social" },
  { value: "passaparola", label: "Passaparola" },
  { value: "contatto_diretto", label: "Contatto diretto" },
  { value: "import_storico", label: "Import storico" },
  { value: "altro", label: "Altro" },
];

const CATEGORIE: { value: Categoria; label: string }[] = [
  { value: "simpatizzante_fdi", label: "Simpatizzante FdI" },
  { value: "simpatizzante_gn", label: "Simpatizzante GN" },
  { value: "richiesta_iscrizione_gn", label: "Richiesta iscriz. GN" },
  { value: "iscritto_gn", label: "Iscritto GN" },
  { value: "militante", label: "Militante" },
  { value: "dirigente_gn", label: "Dirigente GN" },
  { value: "iscritto_fdi", label: "Iscritto FdI" },
];

type Props = {
  initialQ: string;
  initialMunicipio?: Municipio;
  initialFonte?: Fonte;
  initialCategoria?: Categoria;
};

export function ContattiFilters({
  initialQ,
  initialMunicipio,
  initialFonte,
  initialCategoria,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [q, setQ] = useState(initialQ);

  function applyFilters(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.length > 0) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset paginazione quando cambiano i filtri
    params.delete("page");

    startTransition(() => {
      router.push(`/contatti?${params.toString()}`);
    });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    applyFilters({ q });
  }

  function clearAll() {
    setQ("");
    startTransition(() => {
      router.push("/contatti");
    });
  }

  const hasActiveFilters =
    !!initialQ || !!initialMunicipio || !!initialFonte || !!initialCategoria;

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-graymid"
          />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cerca per nome, cognome, email, telefono…"
            className="w-full h-10 pl-9 pr-3 bg-white border-[1.5px] border-grayline text-sm text-ink-soft focus:border-red focus:outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          className="h-10 px-4 bg-ink text-cream text-[13px] font-display font-bold uppercase tracking-wider hover:bg-red transition-colors"
        >
          Cerca
        </button>
      </form>

      {/* Dropdown filtri */}
      <div className="flex flex-wrap gap-2 items-center">
        <FilterSelect
          label="Municipio"
          value={initialMunicipio ?? ""}
          options={MUNICIPI}
          onChange={(v) => applyFilters({ municipio: v || undefined })}
        />
        <FilterSelect
          label="Fonte"
          value={initialFonte ?? ""}
          options={FONTI}
          onChange={(v) => applyFilters({ fonte: v || undefined })}
        />
        <FilterSelect
          label="Categoria"
          value={initialCategoria ?? ""}
          options={CATEGORIE}
          onChange={(v) => applyFilters({ categoria: v || undefined })}
        />

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1 h-10 px-3 text-[12px] uppercase tracking-wider text-graymid hover:text-red transition-colors"
          >
            <X size={14} /> Azzera filtri
          </button>
        )}

        {isPending && (
          <span className="text-[11px] uppercase tracking-wider text-graymid">
            Caricamento…
          </span>
        )}
      </div>
    </div>
  );
}

type FilterSelectProps<T extends string> = {
  label: string;
  value: T | "";
  options: { value: T; label: string }[];
  onChange: (value: string) => void;
};

function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 px-3 bg-white border-[1.5px] border-grayline text-sm text-ink-soft focus:border-red focus:outline-none transition-colors min-w-[160px]"
    >
      <option value="">{label} (tutti)</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
