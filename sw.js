// Modo sin conexión. Sube VERSION cuando cambies la lista de ficheros.
const VERSION = "v16";
const CACHE = "cortes-" + VERSION;
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
  "icons/icon-maskable-512.png",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("cortes-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// La página se pide primero a la red (así siempre se ve la última versión) y, sin conexión
// o si la red tarda más de 3 s, se usa la copia guardada.
// El resto (iconos, fuentes) se sirve de la caché al momento y se actualiza por detrás.
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const fonts = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!sameOrigin && !fonts) return;
  if (sameOrigin && req.mode === "navigate") {
    e.respondWith(
      caches.open(CACHE).then(async cache => {
        const cached = () => cache.match("index.html");
        const network = fetch(req, { cache: "no-store" }).then(res => {
          if (res && res.ok) cache.put("index.html", res.clone());
          return res;
        });
        const timeout = new Promise(r => setTimeout(r, 3000)).then(async () => (await cached()) || network);
        try { return await Promise.race([network, timeout]); }
        catch (err) { return (await cached()) || Response.error(); }
      })
    );
    return;
  }
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const key = sameOrigin && req.mode === "navigate" ? "index.html" : req;
      const cached = await cache.match(key, { ignoreSearch: sameOrigin });
      const network = fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) cache.put(key, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
