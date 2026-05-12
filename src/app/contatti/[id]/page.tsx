import { AppShell } from "@/components/layout/AppShell";
import { getContattoById } from "@/lib/queries/contatti";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const MUNICIPIO_LABEL: Record<string, string> = {
  VIII: "Municipio VIII",
  IX: "Municipio IX",
  X: "Municipio X",
  altro_roma: "Altro Roma",
  fuori_roma: "Fuori Roma",
  da_classificare: "Da classificare",
};

const CATEGORIA_LABEL: Record<string, string> = {
  simpatizzante_fdi: "Simpatizzante FdI",
  simpatizzante_gn: "Simpatizzante GN",
  richiesta_iscrizione_gn: "Richiesta iscrizione GN",
  iscritto_gn: "Iscritto GN",
  militante: "Militante",
  dirigente_gn: "Dirigente GN",
  iscritto_fdi: "Iscritto FdI",
};

const FONTE_LABEL: Record<string, string> = {
  banchetto: "Banchetto",
  form_online: "Form online",
  sito_web: "Sito web",
  evento: "Evento",
  social: "Social",
  passaparola: "Passaparola",
  contatto_diretto: "Contatto diretto",
  import_storico: "Import storico",
  altro: "Altro",
};

// Color palette (matches Tailwind theme)
const C = {
  cream: "#f4f1e8",
  creamSoft: "#ebe7d8",
  ink: "#0c0c0c",
  inkSoft: "#2a2a2a",
  red: "#cc1429",
  redSoft: "rgba(204,20,41,0.08)",
  redBorder: "rgba(204,20,41,0.3)",
  green: "#006837",
  graymid: "#8a8478",
  graylight: "#d8d3c4",
  grayline: "#c7c1b0",
  white: "#ffffff",
};

type Params = Promise<{ id: string }>;

export default async function ContattoDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const contatto = await getContattoById(id);

  if (!contatto) notFound();

  const dataNascita = contatto.data_nascita
    ? new Date(contatto.data_nascita).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })
    : "—";

  const dataAcquisizione = contatto.data_acquisizione
    ? new Date(contatto.data_acquisizione).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })
    : "—";

  const telHref = "tel:" + contatto.telefono;
  const mailHref = "mailto:" + contatto.email;

  // Styles
  const labelStyle: React.CSSProperties = {
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: C.graymid,
    fontWeight: 600,
  };
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: C.graymid,
    fontWeight: 600,
  };
  const cardStyle: React.CSSProperties = {
    background: C.white,
    border: "1px solid " + C.graylight,
    borderRadius: "2px",
  };
  const cardHeaderStyle: React.CSSProperties = {
    padding: "12px 20px",
    borderBottom: "1px solid " + C.graylight,
  };
  const cardBodyStyle: React.CSSProperties = {
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  };
  const defRowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "140px 1fr",
    alignItems: "center",
    gap: "16px",
  };
  const valueStyle: React.CSSProperties = {
    fontSize: "14px",
    color: C.inkSoft,
  };
  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 8px",
    fontSize: "11px",
    fontWeight: 500,
    background: C.creamSoft,
    border: "1px solid " + C.graylight,
    borderRadius: "2px",
    width: "fit-content",
  };

  return (
    <AppShell>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px" }}>

        {/* Back link */}
        <Link
          href="/contatti"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: C.graymid,
            marginBottom: "24px",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={13} /> Contatti
        </Link>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "32px",
            paddingBottom: "24px",
            borderBottom: "1px solid " + C.graylight,
          }}
        >
          <div>
            <div style={{ ...sectionTitleStyle, marginBottom: "8px" }}>Scheda contatto</div>
            <h1 style={{ fontSize: "40px", marginBottom: "12px", lineHeight: 1 }}>
              {contatto.cognome} {contatto.nome}
            </h1>
            {contatto.categorie_attive && contatto.categorie_attive.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {contatto.categorie_attive.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "3px 8px",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontWeight: 600,
                      background: C.redSoft,
                      color: C.red,
                      border: "1px solid " + C.redBorder,
                      borderRadius: "2px",
                    }}
                  >
                    {CATEGORIA_LABEL[cat] ?? cat}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ ...sectionTitleStyle, marginBottom: "4px" }}>Acquisito</div>
            <div style={valueStyle}>{dataAcquisizione}</div>
            <div style={{ fontSize: "11px", color: C.graymid, marginTop: "2px" }}>
              via {contatto.fonte ? FONTE_LABEL[contatto.fonte] ?? contatto.fonte : "—"}
            </div>
          </div>
        </div>

        {/* Layout 2/3 + 1/3 */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>

          {/* COLONNA SX */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Dati di contatto */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={sectionTitleStyle}>Dati di contatto</div>
              </div>
              <div style={cardBodyStyle}>
                <div style={defRowStyle}>
                  <div style={labelStyle}>Telefono</div>
                  <a href={telHref} style={{ ...valueStyle, textDecoration: "none" }}>{contatto.telefono}</a>
                </div>
                <div style={defRowStyle}>
                  <div style={labelStyle}>Email</div>
                  <a href={mailHref} style={{ ...valueStyle, textDecoration: "none", wordBreak: "break-all" }}>{contatto.email}</a>
                </div>
              </div>
            </div>

            {/* Anagrafica */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={sectionTitleStyle}>Anagrafica</div>
              </div>
              <div style={cardBodyStyle}>
                <div style={defRowStyle}>
                  <div style={labelStyle}>Data di nascita</div>
                  <div style={valueStyle}>{dataNascita}</div>
                </div>
                <div style={defRowStyle}>
                  <div style={labelStyle}>Sesso</div>
                  <div style={valueStyle}>{contatto.sesso ?? "—"}</div>
                </div>
              </div>
            </div>

            {/* Residenza */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={sectionTitleStyle}>Residenza</div>
              </div>
              <div style={cardBodyStyle}>
                <div style={defRowStyle}>
                  <div style={labelStyle}>Indirizzo</div>
                  <div style={valueStyle}>{contatto.indirizzo_via} {contatto.indirizzo_civico}</div>
                </div>
                <div style={defRowStyle}>
                  <div style={labelStyle}>CAP</div>
                  <div style={valueStyle}>{contatto.cap}</div>
                </div>
                <div style={defRowStyle}>
                  <div style={labelStyle}>Municipio</div>
                  <div>
                    <span style={badgeStyle}>{MUNICIPIO_LABEL[contatto.municipio ?? ""] ?? contatto.municipio}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            {contatto.note ? (
              <div
                style={{
                  borderLeft: "3px solid " + C.red,
                  background: C.creamSoft,
                  padding: "16px 20px",
                  borderRadius: "2px",
                }}
              >
                <div style={{ ...sectionTitleStyle, marginBottom: "8px" }}>Note</div>
                <p style={{ fontSize: "14px", color: C.inkSoft, lineHeight: 1.6, margin: 0 }}>{contatto.note}</p>
              </div>
            ) : null}

          </div>

          {/* COLONNA DX */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Schede */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={sectionTitleStyle}>Schede</div>
              </div>
              <div style={cardBodyStyle}>
                <ScheRow label="Iscritto GN" active={!!contatto.ha_scheda_iscritto} C={C} />
                <ScheRow label="Militante" active={!!contatto.ha_scheda_militante} C={C} />
                <ScheRow label="Documento ID" active={!!contatto.ha_documento} C={C} />
              </div>
            </div>

            {/* Interazioni */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={sectionTitleStyle}>Interazioni</div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "32px", color: C.ink, lineHeight: 1 }}>
                    {contatto.numero_interazioni ?? 0}
                  </span>
                  <span style={{ fontSize: "11px", color: C.graymid }}>registrate</span>
                </div>
                {contatto.ultima_interazione_at ? (
                  <div style={{ fontSize: "11px", color: C.graymid, marginTop: "8px" }}>
                    Ultima: {new Date(contatto.ultima_interazione_at).toLocaleDateString("it-IT")}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Consensi GDPR */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={sectionTitleStyle}>Consensi GDPR</div>
              </div>
              <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <ConsensoBlock label="Privacy" accepted={!!contatto.consenso_privacy} timestamp={contatto.consenso_privacy_at} C={C} />
                <ConsensoBlock label="Comunicazioni" accepted={!!contatto.consenso_comunicazioni} timestamp={contatto.consenso_comunicazioni_at} C={C} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </AppShell>
  );
}

function ScheRow({ label, active, C }: { label: string; active: boolean; C: Record<string, string> }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: "14px", color: C.inkSoft }}>{label}</span>
      <span
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 600,
          color: active ? C.green : C.graymid,
        }}
      >
        {active ? "Presente" : "—"}
      </span>
    </div>
  );
}

function ConsensoBlock({
  label,
  accepted,
  timestamp,
  C,
}: {
  label: string;
  accepted: boolean;
  timestamp: string | null | undefined;
  C: Record<string, string>;
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "14px", color: C.inkSoft }}>{label}</span>
        <span
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 600,
            color: accepted ? C.green : C.red,
          }}
        >
          {accepted ? "✓ Sì" : "✕ No"}
        </span>
      </div>
      {timestamp ? (
        <div style={{ fontSize: "10px", color: C.graymid, marginTop: "4px" }}>
          {new Date(timestamp).toLocaleString("it-IT", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      ) : null}
    </div>
  );
}
