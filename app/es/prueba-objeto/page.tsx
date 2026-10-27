import type { Metadata } from "next";

/**
 * E-FU2: the owner's own test listing on the production domain (owner's decision line for exactly this one page;
 * PM_TO_WEBSITE_1025_PRUEBA_OBJETO_FIELDS_v1). Spanish only, PM's exact labels as server-rendered text, noindex/nofollow,
 * not linked from anywhere, no form, no phone, no link out. The values are the ones the owner's release line fixes; they
 * must equal the inventory row API writes. "Estado: Disponible" stays while the test runs; afterwards "Retirado" with the
 * date, then the page answers 410 and the picture goes. The picture: the licensed sample photo with "PRUEBA" burnt in.
 */
export const metadata: Metadata = {
  title: "[PRUEBA] Piso de demostración NuovaSolution",
  robots: { index: false, follow: false, nocache: true },
};

const PRUEBA = {
  ref: "NS-TEST-0001",
  estado: "Disponible",
  actualizado: "27/10/2026",
  precio: "315.000 €",
  ubicacion: "Estepona, Málaga",
  tipo: "piso",
  dormitorios: "2",
  banos: "2",
  superficie: "78 m²",
  operacion: "Venta",
};

const rows: [string, string][] = [
  ["Referencia", PRUEBA.ref],
  ["Estado", PRUEBA.estado],
  ["Actualizado", PRUEBA.actualizado],
  ["Precio", PRUEBA.precio],
  ["Ubicación", PRUEBA.ubicacion],
  ["Tipo", PRUEBA.tipo],
  ["Dormitorios", PRUEBA.dormitorios],
  ["Baños", PRUEBA.banos],
  ["Superficie", PRUEBA.superficie],
  ["Operación", PRUEBA.operacion],
];

export default function PruebaObjeto() {
  return (
    <main style={{ background: "#fbfaf7", minHeight: "100vh", color: "#1a1917", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px 80px" }}>
        <article style={{ border: "1px solid rgba(26,25,23,0.12)", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/prueba/imagen-prueba.jpg" alt="Imagen de prueba NuovaSolution" width={1200} height={800} style={{ display: "block", width: "100%", height: "auto" }} />
          <div style={{ padding: 24 }}>
            <h1 style={{ fontSize: "1.5rem", lineHeight: 1.2, margin: 0 }}>[PRUEBA] Piso de demostración NuovaSolution</h1>
            <dl style={{ display: "grid", gridTemplateColumns: "9rem minmax(0, 1fr)", rowGap: 8, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(26,25,23,0.12)", fontSize: "1.0625rem", lineHeight: 1.5 }}>
              {rows.map(([k, v]) => (
                <div key={k} style={{ display: "contents" }}>
                  <dt style={{ color: "#635f58" }}>{k}:</dt>
                  <dd style={{ margin: 0, fontWeight: 500 }}>{v}</dd>
                </div>
              ))}
            </dl>
            <p style={{ marginTop: 20, fontSize: "0.9375rem", color: "#4b4843" }}>Este es un inmueble de prueba de NuovaSolution. No es una oferta real.</p>
          </div>
          <p style={{ margin: 0, padding: "12px 24px", borderTop: "1px solid rgba(26,25,23,0.12)", fontSize: "0.8125rem", color: "#635f58" }}>Imagen: licencia Pexels 12715501 (Keegan Checks), marcada PRUEBA por NuovaSolution</p>
        </article>
      </div>
    </main>
  );
}
