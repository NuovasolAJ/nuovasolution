/** @type {import('next').NextConfig} */
const nextConfig = {
  // E-FU2 test page (owner line 27.10.): noindex on the page and its picture at the HTTP level too; nothing else changes
  async headers() {
    return [
      { source: "/es/prueba-objeto", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/prueba/imagen-prueba.jpg", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
