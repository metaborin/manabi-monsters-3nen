// まなびモンスターズ Service Worker
// 方針: network-first（オンライン時は常に最新を取得し、オフライン時だけキャッシュを使う）
// キャッシュ名にバージョンを付け、activate 時に古いキャッシュを削除して更新が残りすぎないようにする。
const CACHE = 'manabi-monsters-v0.7.5';
const BASE = '/manabi-monsters-3nen/';
const CORE_ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.webmanifest',
  BASE + 'favicon-32.png',
  BASE + 'icon-192.png',
  BASE + 'icon-512.png',
  BASE + 'apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  // 新しい Service Worker をすぐ有効化する
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .catch(() => {
        // 一部の事前キャッシュに失敗してもインストールは続行する
      }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  // GET 以外・別オリジンはそのまま通す
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }
  // network-first: まずネットワーク、失敗したらキャッシュ、最後に index.html を返す
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches
          .open(CACHE)
          .then((cache) => cache.put(request, copy))
          .catch(() => {});
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => cached || caches.match(BASE + 'index.html')),
      ),
  );
});
