import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Service Worker は本番ビルドのときだけ登録する（開発中の邪魔にならないように）。
// base に追従させるため import.meta.env.BASE_URL を使う。
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      // 登録に失敗してもゲームは通常どおり遊べる
    });
  });
}
