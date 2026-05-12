import Link from "next/link";
import type { ContattoCompleto } from "@/lib/queries/contatti";

type Props = { rows: ContattoCompleto[] };

const MUNICIPIO_LABEL: Record<string, string> = {
  VIII: "VIII",
  IX: "IX",
  X: "X",
  altro_roma: "Altro Roma",
  fuori_roma: "Fuori Roma",
  da_classificare: "?",
};

const CATEGORIA_LABEL: Record<string, string> = {
  simpatizzante_fdi: "Simp. FdI",
  simpatizzante_gn: "Simp. GN",
  richiesta_iscrizione_gn: "Rich. iscr.",
  iscritto_gn: "Iscritto GN",
  militante: "Militante",
  dirigente_gn: "Dirigente",
  iscritto_fdi: "Iscritto FdI",
};

export function ContattiTable({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="bg-cream-soft border border-graylight rounded-sm p-12 text-center">
        <div className="text-[11px] uppercase tracking-[0.2em] text-graymid mb-2">
          Nessun contatto trovato
        </div>
        <p className="text-sm text-ink-soft">
          Prova a modificare i filtri o ad azzerare la ricerca.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-graylight rounded-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream-soft border-b border-graylight">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] uppercase tracking-[0.15em] text-graymid font-semibold">Nome</th>
              <th className="px-4 py-3 text-left text-[10px] uppercase tracking-[0.15em] text-graymid font-semibold">Contatti</th>
              <th className="px-4 py-3 text-left text-[10px] uppercase tracking-[0.15em] text-graymid font-semibold">Municipio</th>
              <th className="px-4 py-3 text-left text-[10px] uppercase tracking-[0.15em] text-graymid font-semibold">Categorie</th>
              <th className="px-4 py-3 text-left text-[10px] uppercase tracking-[0.15em] text-graymid font-semibold">Fonte</th>
              <th className="px-4 py-3 text-left text-[10px] uppercase tracking-[0.15em] text-graymid font-semibold">Acquisito</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id ?? undefined} className="border-b border-graylight last:border-b-0 hover:bg-cream-soft/50 transition-colors">
                <td className="px-4 py-3 align-top">
                  <Link href={`/contatti/${row.id}`} className="text-ink hover:text-red font-medium transition-colors">
                    {row.cognome} {row.nome}
                  </Link>
                  <div className="text-[11px] text-graymid mt-0.5">{row.data_nascita}</div>
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="text-ink-soft">{row.telefono}</div>
                  <div className="text-[11px] text-graymid truncate max-w-[200px]">{row.email}</div>
                </td>
                <td className="px-4 py-3 align-top">
                  <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium bg-cream-soft border border-graylight rounded-sm">
                    {MUNICIPIO_LABEL[row.municipio ?? ""] ?? row.municipio}
                  </span>
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-wrap gap-1">
                    {row.categorie_attive && row.categorie_attive.length > 0 ? (
                      row.categorie_attive.map((cat) => (
                        <span key={cat} className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium bg-red/10 text-red rounded-sm border border-red/30">
                          {CATEGORIA_LABEL[cat] ?? cat}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-graymid">—</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <span className="text-[12px] text-ink-soft capitalize">
                    {row.fonte?.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3 align-top">
                  <span className="text-[12px] text-graymid">
                    {row.data_acquisizione ? new Date(row.data_acquisizione).toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
