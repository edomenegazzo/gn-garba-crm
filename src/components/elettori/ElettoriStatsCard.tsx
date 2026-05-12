import type { ElettoriStats } from "@/lib/queries/elettori";

type Props = {
  stats: ElettoriStats;
  dataRiferimento: string;
};

export function ElettoriStatsCard({ stats, dataRiferimento }: Props) {
  const formatDate = (d: string) => new Date(d).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-white border border-graylight p-5">
        <div className="text-[10px] uppercase tracking-[0.2em] text-graymid mb-2 font-semibold">Totale Elettori</div>
        <div className="font-display font-black text-4xl text-ink leading-none">{stats.totale}</div>
        <div className="text-[11px] text-graymid mt-2">contatti territoriali</div>
      </div>

      <div className="bg-white border border-graylight p-5">
        <div className="text-[10px] uppercase tracking-[0.2em] text-graymid mb-2 font-semibold">Maggiorenni</div>
        <div className="font-display font-black text-4xl text-green leading-none">{stats.maggiorenni}</div>
        <div className="text-[11px] text-graymid mt-2">al {formatDate(dataRiferimento)}</div>
      </div>

      <div className="bg-white border border-graylight p-5">
        <div className="text-[10px] uppercase tracking-[0.2em] text-graymid mb-2 font-semibold">Minorenni</div>
        <div className="font-display font-black text-4xl text-warning leading-none">{stats.minorenni}</div>
        <div className="text-[11px] text-graymid mt-2">non votanti alla data</div>
      </div>

      <div className="bg-cream-soft border border-graylight p-5">
        <div className="text-[10px] uppercase tracking-[0.2em] text-graymid mb-2 font-semibold">Municipio VIII</div>
        <div className="font-display font-black text-3xl text-ink leading-none">{stats.municipio_viii}</div>
      </div>

      <div className="bg-cream-soft border border-graylight p-5">
        <div className="text-[10px] uppercase tracking-[0.2em] text-graymid mb-2 font-semibold">Municipio IX</div>
        <div className="font-display font-black text-3xl text-ink leading-none">{stats.municipio_ix}</div>
      </div>

      <div className="bg-cream-soft border border-graylight p-5">
        <div className="text-[10px] uppercase tracking-[0.2em] text-graymid mb-2 font-semibold">Municipio X</div>
        <div className="font-display font-black text-3xl text-ink leading-none">{stats.municipio_x}</div>
      </div>
    </div>
  );
}
