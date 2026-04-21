export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>

        <Section title="Data Controller">
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

        <Section title="Purpose">
          <p>
            We only use your data to reply to your inquiry and provide the service you asked about.
            Nothing else.
          </p>
        </Section>

        <Section title="Legal Basis">
          <p>
            We process your data based on your consent, given when you contact us.
          </p>
        </Section>

        <Section title="Data Retention">
          <p>
            We keep your data for as long as needed to handle your request.
            You can ask us to delete it at any time.
          </p>
        </Section>

        <Section title="Your Rights">
          <p>
            You can ask to see, correct, or delete your data at any time.
            Just send an email to{" "}
            <a
              href="mailto:antonio@nuovasolution.com"
              style={{ color: "rgba(214,180,122,0.70)", textDecoration: "none" }}
            >
              antonio@nuovasolution.com
            </a>
            .
          </p>
        </Section>

        <Section title="Third Parties">
          <p>
            We do not sell or share your data with anyone.
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
