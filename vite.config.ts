import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 公開先について:
// - GitHub Pages で https://metaborin.github.io/manabi-monsters-3nen/ に公開するため、
//   base を '/manabi-monsters-3nen/' に設定しています（先頭と末尾に / が必要）。
//   リポジトリ名を変更した場合は、この base のリポジトリ名部分も合わせて変更してください。
// - Vercel で公開する場合は base 設定なし（'/'）で問題ありません。
export default defineConfig({
  plugins: [react()],
  base: '/manabi-monsters-3nen/',
});
