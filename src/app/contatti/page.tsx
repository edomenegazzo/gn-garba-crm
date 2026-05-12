import { AppShell } from "@/components/layout/AppShell";
import { getContatti } from "@/lib/queries/contatti";
import { ContattiFilters } from "@/components/contatti/ContattiFilters";
import { ContattiTable } from "@/components/contatti/ContattiTable";
import { ContattiPagination } from "@/components/contatti/ContattiPagination";
import type {
  Municipio,
  Fonte,
  Categoria,
} from "@/lib/queries/contatti";

type SearchParams = Promise<{
  q?: string;
  municipio?: Municipio;
  fonte?: Fonte;
  categoria?: Categoria;
  page?: string;
}>;

export default async function ContattiPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const result = await getContatti({
    q: params.q,
    municipio: params.municipio,
    fonte: params.fonte,
    categoria: params.categoria,
    page: params.page ? parseInt(params.page, 10) : 1,
    pageSize: 50,
  });

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="text-[11px] uppercase tracking-[0.2em] text-graymid mb-3">
            Anagrafica · {result.total} contatti totali
          </div>
          <h1 className="text-5xl mb-4">Contatti</h1>
          <p className="text-base text-ink-soft max-w-2xl leading-relaxed">
            Tutti i contatti raccolti: simpatizzanti, iscritti, militanti.
            Usa i filtri qui sotto per restringere l'elenco.
          </p>
        </div>

        {/* Filtri */}
        <div className="mb-6">
          <ContattiFilters
            initialQ={params.q ?? ""}
            initialMunicipio={params.municipio}
            initialFonte={params.fonte}
            initialCategoria={params.categoria}
          />
        </div>

        {/* Tabella */}
        <ContattiTable rows={result.rows} />

        {/* Paginazione */}
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
