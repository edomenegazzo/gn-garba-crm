import { AppShell } from "@/components/layout/AppShell";
import { getElettori, getElettoriStats } from "@/lib/queries/elettori";
import { ElettoriFilters } from "@/components/elettori/ElettoriFilters";
import { ElettoriStatsCard } from "@/components/elettori/ElettoriStatsCard";
import { ContattiTable } from "@/components/contatti/ContattiTable";
import { ContattiPagination } from "@/components/contatti/ContattiPagination";
import type { Municipio, Fonte } from "@/lib/queries/contatti";

type SearchParams = Promise<{
  q?: string;
  municipio?: Municipio;
  fonte?: Fonte;
  eta?: "maggiorenni" | "minorenni";
  dataRif?: string;
  page?: string;
}>;

export default async function ElettoriPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const dataRif = params.dataRif ?? new Date().toISOString().split("T")[0];

  // Calcola soglie età basate su dataRif
  const sogliaDate = new Date(dataRif);
  sogliaDate.setFullYear(sogliaDate.getFullYear() - 18);
  const sogliaStr = sogliaDate.toISOString().split("T")[0];

  let natoEntro: string | undefined;
  let natoDopo: string | undefined;
  if (params.eta === "maggiorenni") natoEntro = sogliaStr;
  if (params.eta === "minorenni") natoDopo = sogliaStr;

  const [result, stats] = await Promise.all([
    getElettori({
      q: params.q,
      municipio: params.municipio,
      fonte: params.fonte,
      natoEntro,
      natoDopo,
      page: params.page ? parseInt(params.page, 10) : 1,
      pageSize: 50,
    }),
    getElettoriStats(dataRif),
  ]);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="mb-8">
          <div className="text-[11px] uppercase tracking-[0.2em] text-graymid mb-3">
            Bacino territoriale · {result.total} elettori
          </div>
          <h1 className="text-5xl mb-4">Elettori</h1>
          <p className="text-base text-ink-soft max-w-2xl leading-relaxed">
            Contatti territoriali raccolti nei Municipi VIII, IX, X. Bacino di mobilitazione per campagne e iniziative del nucleo.
          </p>
        </div>

        <ElettoriStatsCard stats={stats} dataRiferimento={dataRif} />

        <div className="mb-6">
          <ElettoriFilters
            initialQ={params.q ?? ""}
            initialMunicipio={params.municipio}
            initialFonte={params.fonte}
            initialDataRif={dataRif}
            initialEtaFilter={params.eta ?? "tutti"}
          />
        </div>

        <ContattiTable rows={result.rows} />

        {result.totalPages > 1 && (
          <div className="mt-6">
            <ContattiPagination
              currentPage={result.page}
              totalPages={result.totalPages}
              total={result.total}
              pageSize={result.pageSize}
            />
          </div>
        )}
      </div>
    </AppShell>
  );
}
