import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Eyebrow + title */}
        <div className="mb-10">
          <div className="text-[11px] uppercase tracking-[0.2em] text-graymid mb-3">
            Pannello operativo · v0.1
          </div>
          <h1 className="text-5xl mb-4">Dashboard</h1>
          <p className="text-base text-ink-soft max-w-2xl leading-relaxed">
            Sistema gestionale del Nucleo Garbatella. Da qui consulti contatti,
            iscritti, militanti, e gestisci le attività operative del nucleo
            nei municipi VIII, IX e X di Roma.
          </p>
        </div>

        {/* KPI per municipio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Municipio VIII", value: "—" },
            { label: "Municipio IX", value: "—" },
            { label: "Municipio X", value: "—" },
          ].map((kpi) => (
            <Card key={kpi.label}>
              <div className="text-[10px] uppercase tracking-[0.2em] text-graymid mb-3">
                {kpi.label}
              </div>
              <div className="font-display font-black text-5xl text-ink leading-none">
                {kpi.value}
              </div>
              <div className="text-xs text-graymid mt-3">contatti totali</div>
            </Card>
          ))}
        </div>

        {/* Status box */}
        <Card>
          <div className="text-[10px] uppercase tracking-[0.2em] text-graymid mb-3">
            Stato sistema
          </div>
          <h2 className="text-2xl mb-4">Setup in corso</h2>
          <p className="text-base text-ink-soft mb-6 max-w-2xl leading-relaxed">
            Schema database completo, RLS attive, audit log operativo.
            Autenticazione e funzionalità operative in implementazione nelle
            prossime fasi di sviluppo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">Documentazione</Button>
            <Button variant="outline" size="sm">Repository GitHub</Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
