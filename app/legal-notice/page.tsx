export default function LegalNotice() {
  return (
    <main
      style={{
        background: "#0A0908",
        minHeight: "100vh",
        color: "rgba(255,255,255,0.80)",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "clamp(80px, 10vw, 120px) 24px clamp(60px, 8vw, 96px)",
        }}
      >
        <a
          href="/"
          style={{
            display: "inline-block",
            fontSize: "0.75rem",
            color: "rgba(214,180,122,0.55)",
            textDecoration: "none",
            letterSpacing: "0.04em",
            marginBottom: 48,
          }}
        >
          ← NuovaSolution
        </a>

        <p
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(214,180,122,0.50)",
            marginBottom: 16,
          }}
        >
          Legal
        </p>

        <h1
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.92)",
            marginBottom: 48,
          }}
        >
          Legal Notice
        </h1>

        <Section title="Owner">
          <p>Antonio Jesus Diaz Gomez</p>
          <p>Prolongación Hernando de Carabeo, Nerja, Málaga, Spain</p>
          <p>
            <a
              href="mailto:antonio@nuovasolution.com"
              style={{ color: "rgba(214,180,122,0.70)", textDecoration: "none" }}
            >
              antonio@nuovasolution.com
            </a>
          </p>
        </Section>

        <Section title="Activity">
          <p>
            NuovaSolution helps real estate agencies respond to inquiries automatically,
            qualify leads, and identify the ones worth following up on.
          </p>
        </Section>

        <Section title="Acceptance of Terms">
          <p>
            By using this website, you agree to the terms in this notice.
            If you do not agree, please do not use the site.
          </p>
        </Section>

        <Section title="Liability">
          <p>
            We do our best to keep information accurate, but we cannot guarantee it.
            We are not responsible for any issues arising from use of this website.
          </p>
        </Section>

        <Section title="Intellectual Property">
          <p>
            All content on this site, including text, visuals, and code, belongs to NuovaSolution.
            Please do not reproduce it without written permission.
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.38)",
          marginBottom: 10,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontSize: "0.9375rem",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.62)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {children}
      </div>
    </div>
  );
}
