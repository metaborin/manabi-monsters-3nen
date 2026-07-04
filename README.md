# まなびモンスターズ：3年生のひみつ島

## 概要

小学3年生が、国語・算数・理科・社会・英語を学びながら遊べるWebブラウザゲームです。
問題に答えてコインや経験値を集め、まなびモンスターを仲間にして、まなび島をにぎやかにしていきます。

## 現在できること

- 5教科エリア（国語・算数・理科・社会・英語）でクエストを遊べる
- 問題に答えてコインと経験値を獲得できる
- モンスターを仲間にできる
- 図鑑で仲間モンスターを確認できる
- 図鑑・結果画面・まなび島でモンスター画像を表示できる
- ショップでアイテムを購入できる
- まなび島に仲間やアイテムを飾れる
- スマホ・タブレット・PCで遊びやすいレスポンシブ表示に対応

## 起動方法

```
npm install
npm run dev
```

起動後、表示されたURL（通常は http://localhost:5173 ）をブラウザで開いてください。

## ビルド方法

```
npm run build
```

`dist` フォルダに公開用のファイルが生成されます。

## プレビュー方法

本番ビルドの内容をローカルで確認できます。

```
npm run preview
```

## 使用技術

- React
- TypeScript
- Vite
- CSS（通常のCSS。CSSフレームワークは未使用）
- localStorage

## プロジェクト構成

```
src/
  App.tsx              画面遷移（stateベース。ルーターは未使用）
  main.tsx             エントリーポイント
  styles.css           スタイル
  types/game.ts        型定義（Subject / Area / Question / Quest / Monster / PlayerState / QuestResult / ShopItem）
  data/                エリア・問題・クエスト・モンスター・ショップアイテムのデータ
  components/          各画面コンポーネント
  hooks/useGameState   プレイヤー状態の管理と自動保存
  utils/               localStorage・シャッフル・レベル計算
```

## 保存データ

localStorage（保存キー：`manabi-monsters-save`）を使って、以下を保存しています。

- プレイヤー名
- コイン
- 経験値
- 仲間モンスター
- クリア済みクエスト
- 購入済みアイテム

古い保存データに新しい項目がない場合も、安全に読み込めるようにしています。

## GitHub Pagesで公開する方法

1. GitHubリポジトリを Public にする
2. `vite.config.ts` の `base` が `/リポジトリ名/`（このプロジェクトでは `/manabi-monsters-3nen/`）になっていることを確認する
3. `.github/workflows/deploy.yml` がリポジトリに含まれていることを確認する
4. `main` ブランチに push する
5. GitHub の Settings → Pages を開く
6. Build and deployment の Source を「GitHub Actions」にする
7. Actions タブでデプロイの実行が成功するまで待つ
8. 公開URLにアクセスする

リポジトリ名が `manabi-monsters-3nen` の場合、公開URLは次の形になります。

```
https://metaborin.github.io/manabi-monsters-3nen/
```

補足：`base` の設定がリポジトリ名と合っていないと、公開後に画面が真っ白になり、CSSやJSが読み込まれません。真っ白なときは、まず `vite.config.ts` の `base` を確認してください。

## スマホ・タブレットにアプリとして追加する方法

PWA対応しているので、ホーム画面に追加するとアプリのように全画面で遊べます。

公開URL：https://metaborin.github.io/manabi-monsters-3nen/

### iPhone / iPad（Safari）
1. Safari で公開URLを開く
2. 画面下（または上）の「共有」ボタンを押す
3. メニューから「ホーム画面に追加」を選ぶ
4. 追加すると、ホーム画面のまなびモンスターズのアイコンから起動できる

### Android（Chrome）
1. Chrome で公開URLを開く
2. 右上のメニュー（︙）を開く
3. 「アプリをインストール」または「ホーム画面に追加」を選ぶ
4. ホーム画面のアイコンから起動できる

### PC（Chrome / Edge）
1. Chrome または Edge で公開URLを開く
2. アドレスバー右側に出るインストールアイコン（またはメニューの「インストール」）を押す
3. アプリとして追加できる

### 表示が古いときは
このアプリは Service Worker を使っています。更新後に古い画面が表示される場合は、
ページを再読み込み（スマホは引っぱって更新、PCは Ctrl+F5）してください。
それでも直らないときは、ブラウザのキャッシュ／サイトデータを削除してから開き直してください。

## 今後追加したい機能

- 各教科のクエスト追加
- 効果音
- 画像素材の差し替え
- 町づくり
- ボスバトル
- スマホ・タブレット最適化
- GitHub Pages または Vercel で公開

## 注意

このゲームは学習用のオリジナルゲームです。既存作品のキャラクター・画像・世界観は使用していません。
