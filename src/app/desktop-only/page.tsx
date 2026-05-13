export default function DesktopOnlyPage() {
  const wrapStyle = {
    minHeight: "100vh",
    backgroundColor: "#f4f1e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const cardStyle = {
    maxWidth: "560px",
    backgroundColor: "#fff",
    border: "1.5px solid #e8e4d8",
    padding: "40px 28px",
    textAlign: "center" as const,
  };

  const iconCircleStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "72px",
    height: "72px",
    backgroundColor: "#cc1429",
    color: "#fff",
    borderRadius: "50%",
    marginBottom: "24px",
    fontSize: "32px",
  };

  const eyebrowStyle = {
    fontSize: "11px",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "#a09b8d",
    fontWeight: 600,
    marginBottom: "12px",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: 900,
    color: "#0c0c0c",
    lineHeight: 1.15,
    marginBottom: "20px",
    letterSpacing: "-0.01em",
  };

  const paragraphStyle = {
    fontSize: "15px",
    color: "#3d3d3d",
    lineHeight: 1.6,
    marginBottom: "24px",
  };

  const noticeStyle = {
    padding: "16px",
    backgroundColor: "#fef9e7",
    border: "1px solid #f4d35e",
    textAlign: "left" as const,
    marginBottom: "24px",
    fontSize: "13px",
    color: "#5a4400",
    lineHeight: 1.5,
  };

  const smallTextStyle = {
    fontSize: "13px",
    color: "#6b6b6b",
    lineHeight: 1.6,
    marginBottom: "8px",
  };

  const ctaStyle = {
    display: "inline-block",
    padding: "12px 24px",
    backgroundColor: "#0c0c0c",
    color: "#f4f1e8",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
  };

  const footerStyle = {
    marginTop: "32px",
    paddingTop: "20px",
    borderTop: "1px solid #e8e4d8",
    fontSize: "11px",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "#a09b8d",
  };

  return (
    <main style={wrapStyle}>
      <div style={cardStyle}>
        <div style={iconCircleStyle}>🖥️</div>
        <div style={eyebrowStyle}>Accesso limitato</div>
        <h1 style={titleStyle}>Questo strumento è accessibile solo da desktop</h1>
        <p style={paragraphStyle}>
          Per la sicurezza dei dati personali raccolti, il CRM del Nucleo Garbatella è accessibile esclusivamente da computer desktop, laptop o tablet.
        </p>
        <div style={noticeStyle}>
          <strong>⚠️ Nota di sicurezza.</strong> Il CRM gestisce dati anagrafici e informazioni politiche sensibili (categoria speciale ai sensi del GDPR). L&apos;accesso da smartphone è disabilitato per ridurre rischi di esposizione accidentale dei dati.
        </div>
        <p style={smallTextStyle}><strong>Sei un militante al banchetto?</strong></p>
        <p style={smallTextStyle}>Usa il form dedicato per inserire nuovi contatti:</p>
        <p style={{ marginTop: "16px", marginBottom: "0" }}>
          <a href="https://nucleogarbatella.it/banchetto" style={ctaStyle}>Vai al form banchetto →</a>
        </p>
        <div style={footerStyle}>Nucleo Garbatella · Gioventù Nazionale</div>
      </div>
    </main>
  );
}
