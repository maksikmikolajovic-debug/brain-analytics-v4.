"use strict";

self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();

      await Promise.all(
        names
          .filter(name => /brain/i.test(name))
          .map(name => caches.delete(name))
      );

      await self.clients.claim();
    })()
  );
});

// Запити йдуть напряму в мережу.
// Сторінка та ринкові дані не кешуються цим worker.
