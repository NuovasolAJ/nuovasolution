export default function AvisoLegal() {
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
          Aviso Legal
        </h1>

        <Section title="Titular">
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

        <Section title="Actividad">
          <p>
            NuovaSolution ayuda a agencias inmobiliarias a responder consultas automáticamente,
            cualificar leads e identificar los clientes con más potencial.
          </p>
        </Section>

        <Section title="Aceptación de condiciones">
          <p>
            Al usar este sitio web, aceptas las condiciones recogidas en este aviso.
            Si no estás de acuerdo, te pedimos que no lo utilices.
          </p>
        </Section>

        <Section title="Responsabilidad">
          <p>
            Intentamos mantener la información actualizada y correcta, pero no podemos garantizarlo.
            No nos hacemos responsables de los problemas que puedan surgir del uso de este sitio.
          </p>
        </Section>

        <Section title="Propiedad intelectual">
          <p>
            Todo el contenido de este sitio, incluyendo textos, imágenes y código, pertenece a NuovaSolution.
            No puede reproducirse sin permiso por escrito.
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
