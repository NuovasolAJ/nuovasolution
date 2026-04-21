export default function PoliticaPrivacidad() {
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
          Política de Privacidad
        </h1>

        <Section title="Responsable del tratamiento">
          <p>Antonio Jesus Diaz Gomez</p>
          <p>Prolongación Hernando de Carabeo, Nerja, Málaga, España</p>
          <p>
            <a
              href="mailto:antonio@nuovasolution.com"
              style={{ color: "rgba(214,180,122,0.70)", textDecoration: "none" }}
            >
              antonio@nuovasolution.com
            </a>
          </p>
        </Section>

        <Section title="Finalidad">
          <p>
            Usamos tus datos únicamente para responder a tu consulta y prestarte el servicio
            que has solicitado. Nada más.
          </p>
        </Section>

        <Section title="Base legal">
          <p>
            Tratamos tus datos con base en tu consentimiento, que nos das al ponerte en contacto con nosotros.
          </p>
        </Section>

        <Section title="Conservación de datos">
          <p>
            Guardamos tus datos el tiempo necesario para gestionar tu solicitud.
            Puedes pedirnos que los eliminemos en cualquier momento.
          </p>
        </Section>

        <Section title="Derechos del usuario">
          <p>
            Puedes consultar, corregir o eliminar tus datos cuando quieras.
            Escríbenos a{" "}
            <a
              href="mailto:antonio@nuovasolution.com"
              style={{ color: "rgba(214,180,122,0.70)", textDecoration: "none" }}
            >
              antonio@nuovasolution.com
            </a>
            .
          </p>
        </Section>

        <Section title="Terceros">
          <p>
            No vendemos ni compartimos tus datos con nadie.
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
