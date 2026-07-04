# まなびモンスターズ 画像素材整理メモ

対象: v0.7.5〜v0.7.6 用の先行素材

今回はアプリ本体の実装は変更せず、5教科の仲間モンスター画像だけを作成・保存した。

## 作成した画像一覧

| 教科 | モンスター | 1024px版 | 512px版 | 用途 |
| --- | --- | --- | --- | --- |
| 算数 | カズピョン | `public/assets/monsters/mon_kazupyon.png` | `public/assets/monsters/mon_kazupyon_512.png` | 算数クエスト報酬、図鑑、島表示、リザルト表示 |
| 国語 | コトバード | `public/assets/monsters/mon_kotobird.png` | `public/assets/monsters/mon_kotobird_512.png` | 国語クエスト報酬、図鑑、島表示、リザルト表示 |
| 理科 | ジッケンコ | `public/assets/monsters/mon_jikkenko.png` | `public/assets/monsters/mon_jikkenko_512.png` | 理科クエスト報酬、図鑑、島表示、リザルト表示 |
| 社会 | チズモン | `public/assets/monsters/mon_chizumon.png` | `public/assets/monsters/mon_chizumon_512.png` | 社会クエスト報酬、図鑑、島表示、リザルト表示 |
| 英語 | ハロリン | `public/assets/monsters/mon_halolin.png` | `public/assets/monsters/mon_halolin_512.png` | 英語クエスト報酬、図鑑、島表示、リザルト表示 |

## 画像仕様

- 形式: PNG
- 背景: 透過
- 1024px版: 1024 x 1024
- 512px版: 512 x 512
- 画像内文字: なし
- スタイル: かわいい2Dゲーム風、丸みのあるキャラクター、やさしい表情、軽い影
- 生成方法: GPT Imageで単色クロマキー背景の画像を生成し、ローカルで背景を透過化
- 後処理: Pillowで1024px / 512pxにリサイズし、PNG最適化

## 画像生成プロンプト

### カズピョン

Create a square 1024x1024 PNG-style game character illustration on a perfectly flat solid #00ff00 chroma-key background for later background removal. The background must be one uniform color with no texture, gradient, shadows, floor, or reflection. Keep the subject fully separated from the background with crisp edges and generous padding. Do not use #00ff00 in the subject.

Subject: Kazupyon, an original cute rabbit-like math monster with a round body, big ears, bright eyes, short arms and legs, and an energetic smile. It holds a small abacus-like counting item made only of bead shapes, with no markings.

Style: cute 2D game art, rounded forms, soft outline, bright safe colors, light cel shading, collectible educational game mascot. Main palette blue and yellow.

Constraints: no text, no letters, no numbers, no symbols, no logo, no watermark, no existing-character likeness, no famous-work resemblance, no cast shadow, no contact shadow.

### コトバード

Create a square 1024x1024 PNG-style game character illustration on a perfectly flat solid #ff00ff chroma-key background for later background removal. The background must be one uniform color with no texture, gradient, shadows, floor, or reflection. Keep the subject fully separated from the background with crisp edges and generous padding. Do not use #ff00ff in the subject.

Subject: Kotobird, an original cute bird-like language monster with a round body, fluffy wings, gentle smiling face, and soft friendly posture. It holds a small closed book or simple scroll with completely blank surfaces and no markings.

Style: cute 2D game art, rounded forms, soft outline, bright safe colors, light cel shading, collectible educational game mascot. Main palette green and cream.

Constraints: no text, no letters, no numbers, no symbols, no logo, no watermark, no existing-character likeness, no famous-work resemblance, no cast shadow, no contact shadow.

### ジッケンコ

Create a square 1024x1024 PNG-style game character illustration on a perfectly flat solid #00ff00 chroma-key background for later background removal. The background must be one uniform color with no texture, gradient, shadows, floor, or reflection. Keep the subject fully separated from the background with crisp edges and generous padding. Do not use #00ff00 in the subject.

Subject: Jikkenko, an original cute chick-like science monster that loves experiments and observation, with a round yellow body, small lab-coat-like outfit, round goggles, and a curious bright smile. It holds either a small magnifying glass or a small rounded flask with simple colored liquid, with no markings.

Style: cute 2D game art, rounded forms, soft outline, bright safe colors, light cel shading, collectible educational game mascot. Main palette yellow and light blue.

Constraints: no text, no letters, no numbers, no symbols, no logo, no watermark, no existing-character likeness, no famous-work resemblance, no cast shadow, no contact shadow.

### チズモン

Create a square 1024x1024 PNG-style game character illustration on a perfectly flat solid #ff00ff chroma-key background for later background removal. The background must be one uniform color with no texture, gradient, shadows, floor, or reflection. Keep the subject fully separated from the background with crisp edges and generous padding. Do not use #ff00ff in the subject.

Subject: Chizumon, an original cute turtle-like social studies monster that teaches maps and towns, with a round friendly body, small map-pattern shell made from simple abstract paths and blocks with no written labels, gentle calm smile, holding a small blank map sheet or compass-like round item with no letters or symbols.

Style: cute 2D game art, rounded forms, soft outline, bright safe colors, light cel shading, collectible educational game mascot. Main palette green and orange.

Constraints: no text, no letters, no numbers, no symbols, no logo, no watermark, no existing-character likeness, no famous-work resemblance, no cast shadow, no contact shadow.

### ハロリン

Create a square 1024x1024 PNG-style game character illustration on a perfectly flat solid #00ff00 chroma-key background for later background removal. The background must be one uniform color with no texture, gradient, shadows, floor, or reflection. Keep the subject fully separated from the background with crisp edges and generous padding. Do not use #00ff00 in the subject.

Subject: Halolin, an original cute English-learning monster inspired by rainbow arcs and small stars, with a round body, small wings or ribbon-like accents, and a bright smiling face. It holds a small blank balloon or blank card with no writing.

Style: cute 2D game art, rounded forms, soft outline, bright safe colors, light cel shading, collectible educational game mascot. Main palette pink and light blue with rainbow-color accents, but avoid pure chroma green.

Constraints: no text, no letters, no numbers, no symbols, no logo, no watermark, no existing-character likeness, no famous-work resemblance, no cast shadow, no contact shadow.

## 今後アプリに組み込むときの候補箇所

実装時は、既存のモンスターID、クエストID、保存キー、localStorage構造を変えず、画像パスだけを追加するのが安全。

- `src/data/monsters.ts`: 各モンスターに `image` または `imagePath` を追加し、既存の `emoji` はフォールバックとして残す。
- `src/types/game.ts`: `Monster` 型に画像パス用の任意プロパティを追加する。
- `src/components/MonsterDex.tsx`: `.dex-emoji` 表示を、所持済みなら画像、未所持なら `❓` に切り替える候補。
- `src/components/ResultScreen.tsx`: 仲間になった演出の `.monster-get-emoji` を画像表示に置き換える候補。
- `src/components/IslandScreen.tsx`: モンスター広場の `.island-monster-emoji` を画像表示に置き換える候補。
- `src/styles.css`: 画像用に正方形枠、object-fit、レスポンシブサイズ、未所持時のシルエットや不透明度を追加する候補。

Viteの `public` 配下にあるため、アプリから参照する場合は現在の `base` 設定を変更せず、ビルド後に `assets/monsters/...` として配信される前提で扱う。
