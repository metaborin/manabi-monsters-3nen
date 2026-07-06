# 開発メモ

「まなびモンスターズ：3年生のひみつ島」の開発の進行記録です。

## v0.1
遊べる最小版。算数エリア「計算のどうくつ」のわり算クエスト、
クイズ・正誤判定・解説・報酬（コイン/経験値）、
初回クリアでカズピョンが仲間に、モンスター図鑑、localStorage保存、
データリセットを実装。

## v0.1.1
選択肢のシャッフル、初回クリアと練習クリア（コイン半分）の分離、
レベル表示（上限5）、結果画面の強化（正答率・メッセージ）を追加。

## v0.1.2
算数に2つ目のクエスト（かけ算）を追加。クエスト選択画面、
問題プール構造、問題順シャッフル、レベルアップ演出、
クエストのクリア状況表示を追加。

## v0.2
国語エリア「ことばの森」を追加。漢字読みクエストとコトバードを実装。

## v0.2.1
国語に2つ目のクエスト（主語・述語）を追加。
レベル上限を10まで拡張。漢字問題の選択肢を紛らわしいものに改善。

## v0.3
理科エリア「ふしぎ研究所」を追加。こん虫のからだクエストとジッケンコを実装。

## v0.4
社会エリア「わくわくタウン」を追加。町のしごとクエストとチズモンを実装。

## v0.5
英語エリア「えいご広場」を追加。あいさつクエストとハロリンを実装し、5教科がそろう。
図鑑コンプリート演出を追加。

## v0.6
まなびショップを追加。コインでアイテムを購入できるようにし、
購入済みアイテムを保存（purchasedItemIds）。記念品「まなび島の旗」は5体コンプリートで解放。

## v0.7
まなび島画面を追加。仲間モンスターと購入済みアイテムを島に飾って表示。
にぎやか度、旗の特別表示、ショップとの相互移動を実装。

## v0.7.1
公開準備とプロジェクト整理。README、.gitignore、開発メモの作成、
vite.config.ts への公開先コメント追加、バージョン表示（v0.7.1）を追加。
ゲーム機能そのものの変更はなし。

## v0.7.2
GitHub Pages公開用に vite.config.ts の base を `/kotoba-monster-zukan/` に設定。
GitHub Actions のデプロイワークフロー（.github/workflows/deploy.yml）を追加。
README に GitHub Pages 公開手順を追記。バージョン表示を v0.7.2 に更新。
ゲーム機能そのものの変更はなし。

## v0.7.3
GitHub Pages公開先を、別ゲーム用の kotoba-monster-zukan から、まなびモンスターズ用の manabi-monsters-3nen に変更。
vite.config.ts の base、README内URL、公開手順を更新。バージョン表示を v0.7.3 に更新。
ゲーム機能そのものの変更はなし。

## v0.7.4
スマホ・タブレットで遊びやすいように、ボタン・カード・問題画面・ショップ・まなび島のレスポンシブ表示を調整。
横スクロール防止（overflow-x、単語折り返し）、ステータスの折り返し、
768px/560px/360px のブレークポイントでカードの縦並び・文字サイズ・余白を最適化。
ゲーム機能そのものの変更はなし。

アプリアイコンを追加。public/ に icon-512 / icon-192 / apple-touch-icon(180) / favicon-32 を配置し、
index.html にファビコン・apple-touch-icon・theme-color を設定。
（緑色のまなびモンスターが本を読むオリジナルアイコン）

## v0.7.5
PWA対応を追加。public/manifest.webmanifest（GitHub Pagesサブパス用に絶対パス指定）、
index.html にホーム画面追加用meta（apple-mobile-web-app-*、mobile-web-app-capable、manifestリンク）を整備し、
スマホ・タブレットでアプリのように起動しやすくした。
Service Worker（public/sw.js）を追加。本番ビルド時のみ登録し、
network-first方針・バージョン付きキャッシュ名（manabi-monsters-v0.7.5）・
activate時の古いキャッシュ削除で、更新後に古い画面が残りすぎないようにした。
READMEにホーム画面追加手順と「表示が古い場合の再読み込み」案内を追記。

## v0.7.6
作成済みの5教科モンスター画像をアプリ画面に組み込み。`public/assets/monsters/` の512px版PNGを通常表示に使い、モンスター図鑑・結果画面・まなび島のモンスター広場で画像表示に対応。画像パスは `import.meta.env.BASE_URL` を使ってGitHub Pagesのbaseに対応し、画像が読み込めない場合は従来の絵文字表示にフォールバックするようにした。保存キー、保存データ構造、モンスターID、クエストID、問題ID、Vite base、PWA設定、Service Workerは変更なし。

## v0.7.7
作成済みの各教科エリア画像素材をアプリ画面に組み込み。`public/assets/areas/` の512px版カード画像をホーム画面の教科カードに表示し、画像が読み込めない場合は従来の絵文字表示にフォールバックするようにした。クエスト選択画面とクエスト開始・問題画面では、教科ごとの背景画像を薄いオーバーレイ付きで表示し、問題文・選択肢・ボタンの読みやすさを保つように調整。保存キー、保存データ構造、クエストID、問題ID、モンスターID、Vite base、PWA設定、Service Workerは変更なし。

## v0.8.0
ホーム画面を「まなび島マップ」に強化。中央広場（現在地）表示と「行き先ガイド」を追加し、
5教科エリアに加えてショップ・モンスター図鑑・コレクション広場を「島のしせつ」として
エリアカードと同じ見た目のカード（MapSpotCard）で並べ、島から各行き先へ移動する形にした。
各画面の戻る導線を「島マップへもどる」に統一。既存のエリア画像・モンスター画像・
画像フォールバック（絵文字）・レスポンシブ・保存データ構造・クエスト/問題/モンスターID・
Vite base・PWA設定・Service Workerは変更なし。

## v0.8.1
まなび島マップに進行ガイドを追加。「つぎのおすすめ」カードで次に行く場所を短く案内し、
各教科カードに進行状況（✨はじめよう／🔸つづき 〇/〇／✅ぜんぶクリア）と、
おすすめエリアの「👉つぎ」・未クリアの「NEW」コーナーバッジ（軽いアニメーション）を表示。
施設カード（ショップ・図鑑・コレクション広場）にも状態表示（買えるよ／〇体あつめた／なかま〇体）を追加。
現在地「ちゅうおう広場」に「ここから たんけんしよう！」の一言を追加。
進行状況は既存の clearedQuestIds・monsterIds・purchasedItemIds から計算し、保存データ構造は変更なし。
Vite base・PWA設定・Service Worker・各種IDは変更なし。

## v0.8.2
まなび島マップから各エリア・施設に入るときの短い入場演出（EntranceOverlay）を追加。
到着メッセージ（例「ことばの森にとうちゃく！／ことばモンスターをさがそう！」）を
0.8秒だけ表示してから本来の画面へ進む。演出中に画面をタップ／クリックするとすぐに進める。
軽いフェードとポップのみで、テンポを損なわないように調整。
教科エリアは「〇〇にとうちゃく！」＋教科ごとの一言、ショップ・図鑑・コレクション広場にも専用メッセージ。
既存のルーティングは大きく変えず、App に transition 状態を1つ足してホーム画面の上にオーバーレイ表示する形。
保存データ構造・各種ID・Vite base・PWA設定・Service Worker・進行ガイド・バッジは変更なし。

## v0.8.3
クエスト選択画面をステージ選択画面らしく強化。各クエストカードに状態バッジ
（⭐おすすめ＝エリア内の最初の未クリア／✨NEW＝その他の未クリア／✅クリア済み）、
「ステージ〇」表示、報酬コイン（既存の問題データ rewardCoins の合計、クリア後は「受け取りずみ」）、
仲間になるモンスター（画像＋名前、画像が無ければ絵文字にフォールバック）を追加。
つづき表示はクエスト単位の途中進行を安全に判定できないため見送り、NEW/おすすめ/クリア済みを優先。
報酬コインは表示用ヘルパー（utils/questReward.ts）で計算するだけで、保存データ構造・保存キー・
クエストID・問題ID・モンスターID・Vite base・PWA設定・Service Workerは変更なし。

## v0.8.4
ホーム画面（まなび島マップ拠点）の上部に豪華なタイトルビジュアルを追加。
Codex作成のタイトル素材（wide版）を1000×375に最適化して public/assets/title/title_logo.png として配置し、
ホーム上部にタイトルロゴとして表示。下に一言タグライン
「🗺️ しまを ぼうけんして モンスターを あつめよう！」を追加。
画像が読み込めない場合はHTML文字（まなびモンスターズ／3年生のひみつ島）にフォールバック。
※提供素材3種はいずれもタイトル文字が焼き込まれた完成ロゴだったため、
文字を別途HTMLで重ねると二重表示になる。安全のため画像をタイトルロゴとして使い、
HTML文字はフォールバック＋タグラインとして用いた。
保存データ構造・保存キー・各種ID・Vite base・PWA設定・Service Worker・manifest・アイコンは変更なし。

## v0.8.5
最初の名前入力ページ（タイトル画面）の上部タイトル表示を、ホーム画面と統一。
v0.8.4で追加したタイトルロゴ画像（public/assets/title/title_logo.png）をそのまま再利用し、
名前入力ページ上部にも表示。画像には文字が焼き込まれているため二重表示を避け、
画像が読み込めない場合のみ従来のHTML文字（🏝️✨／まなびモンスターズ／〜 3年生のひみつ島 〜）に
フォールバック。名前入力欄・はじめるボタン・つづきから・データリセットの挙動は変更なし。
保存データ構造・保存キー・各種ID・Vite base・PWA設定・Service Worker・manifest・アイコンは変更なし。

## v0.8.6
ホーム画面「まなび島マップ拠点」を、島全体マップを使ったゲームらしい画面に強化。
ホーム上部（タイトルロゴとヘッダーの下）に島全体マップ画像を表示し、その上に9施設の
アイコン（国語・算数・理科・社会・英語・ショップ・図鑑・まなび島・広場）をabsolute配置。
施設アイコンを押すと既存の画面遷移（各教科エリア／ショップ／図鑑／コレクション広場）を呼び出す。
中央拠点「まなび島」は「いまいるところ」で、押すとマップ上部へスムーズスクロール。
- 表示切り替え：600px以下（スマホ幅）は縦長の専用マップ（manabi_island_map_mobile.png）と
  スマホ専用座標、それより広い画面（PC・タブレット）は横長マップ（manabi_island_map_base.png）と
  base座標を使う。useMediaQueryフックで判定し、画像は片方だけ読み込む。
- アイコンサイズはCSS clampで可変（PC通常92px前後／まなび島108px前後、
  スマホ通常64px前後／まなび島76px前後）。
- ラベルはHTML/CSSで表示。英語・図鑑など下側で混む場所はラベルを上に逃がす。
- 画像読み込み失敗時のフォールバック：マップ画像が読めない場合は地図を出さず案内文のみ表示、
  施設アイコンが読めない場合は絵文字にフォールバック。どちらでも下のカード型メニューで移動可能。
- 既存のカード型メニュー（きょうかの島／島のしせつ）はそのまま下部に残した。
使用素材：
  public/assets/island-map/manabi_island_map_base.png（prepared/v087/map の base_sample をコピー）
  public/assets/island-map/manabi_island_map_mobile.png（同 mobile_sample をコピー）
  public/assets/facilities/facility_*.png 9点（prepared/v084/facilities の *_sample をコピー）
  ※ prepared 配下の試作素材一式・確認用HTMLはコミットに含めていない。
保存データ構造・保存キー・各種ID（クエスト／問題／モンスター／ショップアイテム）・Vite base
（/manabi-monsters-3nen/）・PWA設定・Service Worker・manifest・アイコンは変更なし。

## v0.8.7
クエスト選択画面のクエストカードを、用意済み画像素材で強化してゲームらしくした。
- 状態バッジ（NEW／おすすめ／クリア済み）：バッジ背景画像＋小型状態アイコン＋HTML文字。
  文字は画像に頼らず必ずHTML/CSSで表示（NEW／おすすめ／クリア済み）。
- ステージ番号：stage_number_plate 画像のプレートに「ステージ N」を表示。
- 報酬コイン：coin_reward_plate＋reward_coin_icon で「ほうしゅう ○○コイン」を表示。
  クリア済みは「受取ずみ」。既存のコイン計算（getQuestRewardCoins）はそのまま利用。
- 仲間モンスター：friend_reward_frame の円フレームに既存モンスター画像を入れて表示。
  状態文は「クリアで なかま」／クリア済みは「✅ なかま」。仲間なしのクエストは従来どおり
  「れんしゅうクエスト」。画像フォールバックは モンスター画像→reward_friend_monster_icon→絵文字。
- 実装は新規 src/components/QuestCardParts.tsx（QuestStateBadge / QuestStagePlate /
  QuestCoinReward / QuestFriendReward）にまとめ、QuestSelectScreen から利用。
  各パーツは画像onErrorでCSS/絵文字フォールバックし、素材が無くても表示が壊れない。
- 状態判定ロジック（未クリアの先頭＝おすすめ、clearedQuestIds でクリア判定）は変更なし。
  「つづき」バッジ・ボス・イベントは今回未対応。
- スマホ：報酬は縦積み、プレート幅はCSS clampで可変。375px幅で横スクロールなしを確認。
使用素材（prepared→安定保存先へ _sample を外してコピー）：
  public/assets/quest-ui/badges/{badge_new_bg,badge_recommended_bg,badge_clear_bg}.png
  public/assets/quest-ui/icons/{icon_new_state,icon_recommended_state,icon_clear_state,
    reward_coin_icon,reward_friend_monster_icon}.png
  public/assets/quest-ui/ui/{stage_number_plate,coin_reward_plate,friend_reward_frame}.png
  ※ prepared 配下の試作素材一式・docs/previews・docs/image-prompts はコミットに含めていない。
保存データ構造・保存キー・各種ID・Vite base（/manabi-monsters-3nen/）・PWA設定・
Service Worker・manifest・アイコン・島マップの挙動は変更なし。

## v0.8.8
各教科に2つ目のクエストを1つずつ追加（データ追記が中心）。既存クエスト・問題・モンスターは変更なし。
- 追加クエスト（各3問構成、報酬コイン30・経験値15が最大）：
  国語 quest_connect_words_bridge（つなぎ言葉）→ mon_tsunagumo
  算数 quest_remainder_river（あまりのあるわり算）→ mon_amarisu
  理科 quest_sun_shadow_watch（太陽とかげ）→ mon_kagepika
  社会 quest_map_symbols_square（地図の見方）→ mon_markame
  英語 quest_color_words_beach（色の英語）→ mon_cololing
- 追加問題15問（各 rewardCoins:10 / rewardExp:5）：
  japanese_connect_words_001〜003 / math_remainder_division_001〜003 /
  science_sun_shadow_001〜003 / social_map_symbols_001〜003 / english_color_words_001〜003
- 追加モンスター5体（画像なし＝emoji fallback）：
  mon_tsunagumo(☁️) / mon_amarisu(🌰) / mon_kagepika(💧) / mon_markame(🧭) / mon_cololing(🎨)
- レビュー指摘の反映：
  ・算数の解説に「あまりは割る数より小さい（1○○に入れる□より少ない）」の補足を追加。
  ・英語の問題1は既存 english_greeting_004（赤→Red）と重なるため red→green に差し替え。
  ・社会 mon_markame は既存 mon_chizumon と印象が近いので、emoji を 🧭 にし、説明文で
    「方位や地図記号」「しるしをたよりに」とコンパス・地図記号感を強めて差別化。
  ・国語 002 は「長く走ることは」に自然化。
- 図鑑完成表示の追従：モンスターが5→10体になるため、ハードコードだった「5体」表記を
  MONSTERS.length に置き換え（ShopScreen の「○体そろえてね／○体そろうと買えるよ」、
  IslandScreen の「○体のモンスターがそろったよ」）。判定は従来どおり MONSTERS.every(...)。
  ※「5教科」の表記（島の旗の説明）は教科数のままなので変更なし。
- v0.8.7 のクエストカードUI（状態バッジ／ステージ番号／報酬コイン／仲間モンスター）は
  データ追記だけで新クエストにもそのまま適用。ステージ番号は area 内の並び順どおり表示。
保存データ構造・保存キー・既存ID・PlayerState・Vite base（/manabi-monsters-3nen/）・
PWA設定・Service Worker・manifest・アイコン・島マップ・クエスト画面の挙動は変更なし。

## v0.8.9
v0.8.8で追加した新モンスター5体（emoji表示だった）に、Codex(GPTImage)生成の画像を組み込み。
- 本番採用は軽量な 512版のみ。既存ルール（public/assets/monsters/mon_<id>_512.png、
  データ側は assets/monsters/mon_<id>_512.png を参照）に合わせて5枚をコピー：
  mon_tsunagumo_512.png / mon_amarisu_512.png / mon_kagepika_512.png /
  mon_markame_512.png / mon_cololing_512.png
- src/data/monsters.ts の対象5体に image を追加（emoji は読み込み失敗時の fallback として残す）。
  既存の MonsterImage（img→emoji フォールバック）をそのまま利用するため、コンポーネント変更なし。
- 透過確認：5枚とも RGBA(colortype6)で四隅は完全透過([0,0,0,0])、透過ピクセル約50〜62%。
  緑・ピンクの四角い背景は無し（Codexプレビューの色は素材ではなくプレビュー背景由来）。
  図鑑・クエストカードの仲間フレーム・結果画面で、カード背景と自然になじむことを実機確認。
- prepared 配下（public/assets/prepared/v088/monsters）はコミットに含めない。本番採用の5枚のみ。
保存データ構造・保存キー・既存ID・PlayerState・Vite base（/manabi-monsters-3nen/）・
PWA設定・Service Worker・manifest・アイコン・島マップ・クエスト/ショップ/図鑑の挙動は変更なし。

## v0.9.0
「アイテムに意味を持たせる」第一歩として、クエスト攻略につかえる消費アイテム3種を実装。
- 追加した「たすけアイテム」（消費アイテム／新規ID）：
  ・item_hint_candy（ヒントキャンディ 15コイン）… クエスト中に今の問題のヒントを表示。
  ・item_retry_ticket（やりなおしチケット 15コイン）… まちがえたとき1回だけやりなおせる。
  ・item_coin_star（コインアップスター 10コイン）… つかうとクリア報酬コインが +5。
- 保存データは後方互換で最小拡張：PlayerState に `itemCounts: Record<string, number>`（消費アイテムの
  所持数）を追加。既存の飾りアイテム（purchasedItemIds）とは別管理なので、まなび島の飾り表示・
  アイテム数カウント（N/SHOP_ITEMS.length）に影響なし。古い保存は itemCounts を空として読み込む
  （storage.ts でサニタイズ）。保存キー `manabi-monsters-save` は変更なし。
- 消費アイテムは飾りアイテムと別リスト（新規 src/data/helpItems.ts の HELP_ITEMS）。ショップは
  「🎒 たすけアイテム（クエストでつかう）」セクションを追加し、所持数バッジ付き・複数購入可・画像表示。
- クエスト開始画面に「つかうアイテム」パネル：コインアップスターをここでつかう／ヒント・やりなおしの
  所持数を表示。クイズ中は「🍬 ヒントをみる」「🎫 やりなおしチケットをつかう（まちがえたとき）」を表示。
  使用で itemCounts を1減算（useGameState.consumeItem）。
- 問題に短いヒント（hint）を追加（Question.hint は任意）。今回は v0.8.8 の15問に付与、他は共通ヒント
  「よく考えてみよう！」にフォールバック。
- 結果画面：コインアップ使用時は「⭐ コインアップ +5」行を表示（コイン行と分けて表示、合計は実加算と一致）。
  +5 は練習クリアの半減の対象にせず、半減後に加算。
- 画像は本番採用の3枚（512版）だけを public/assets/items/ にコピー（item_hint_candy_512.png /
  item_retry_ticket_512.png / item_coin_star_512.png）。四隅完全透過を確認。未使用の素材（heart_cookie /
  exp_note / skill_star / boss_key / badge_case）と prepared 配下はコミットに含めない。
今回まだ実装しないもの：ハート制・モンスタースキル・教科ボス（今後の v0.9.1〜）。
既存のクエスト/問題/モンスター/ショップアイテムID・図鑑・まなび島・リセット・Vite base
（/manabi-monsters-3nen/）・PWA・Service Worker・manifest・アイコンは変更なし。

## v0.9.1
クエストに「ハート制」を追加（小学3年生向けにやさしい設計）。
- ルール：クエスト開始時ハート3つ。まちがえると1つへる。0になるとそのクエストは失敗
  （クリア扱いにしない・仲間モンスターやクリア報酬コイン/経験値は付与しない）。
- ハートは QuestScreen の一時状態（保存しない）。**保存データ構造・保存キーは変更なし。**
  失敗時は onFinish を呼ばないので applyQuestResult も走らず、保存は無傷。
- 失敗画面：やさしいイラスト（ui_failure_icon）＋「もういちど ちょうせんしよう！」＋
  「🔁 もういちど」「🗺️ エリアにもどる」。もういちどは開始画面に戻ってやり直せる。
- クイズ上部にハートバー（ui_heart_full / ui_heart_empty、画像→絵文字フォールバック）。
  まちがえると「💔 ハートが1つへったよ」をやさしく表示。
- v0.9.0アイテム連携：
  ・ヒントキャンディは従来どおり。
  ・やりなおしチケットをつかうと、そのまちがい分のハートを1つもどす（＝ハートは減らない）。
    つかわなければハートは1つへる。
  ・コインアップスターはクリア時のみ +5。失敗時はコインアップも報酬も出さない
    （使ったアイテムは使用済みのまま）。
- 追加アイテム（任意・土台が軽いので同時実装）：item_heart_cookie（ハートクッキー 20コイン）…
  クエスト中にハートを1つ回復（最大3を超えない）。HELP_ITEMS に追加、ショップに自動表示。
- 画像は本番採用の4枚のみコピー：public/assets/ui/{ui_heart_full,ui_heart_empty,ui_failure_icon}_512.png、
  public/assets/items/item_heart_cookie_512.png。四隅完全透過を確認。未使用素材と prepared 配下は非commit。
既存のクエスト/問題/モンスター/ショップアイテムID・v0.9.0アイテム効果・図鑑・まなび島・リセット・
Vite base（/manabi-monsters-3nen/）・PWA・Service Worker・manifest・アイコンは変更なし。

## v0.9.2
「モンスタースキル」の第一歩：仲間モンスターを「クエストの相棒」にする仕組みを追加。
- 相棒えらび：クエスト開始画面に「🤝 いっしょに行くモンスターをえらぼう」を追加。所持モンスターから
  1体、または「相棒なし」を選べる。仲間0体でも開始可能（「まだ仲間がいないよ」表示）。
- クエスト中の相棒表示：ハートバーの下に相棒ストリップ（モンスター画像＋名前＋スキル状態）。相棒なしは非表示。
- 相棒スキル（全モンスター共通「ヒント」）：クイズ中に「相棒スキル：ヒント」ボタン。押すと今の問題の
  ヒントを表示（ヒントキャンディは消費しない・別枠）。1クエストにつき1回だけ（skillUsed で管理）。使用後は
  ストリップに「✅ スキルをつかったよ」。ヒントキャンディ（別枠）は従来どおり使える。
- 相棒ボーナス：相棒の教科（Monster.subject）と クエストの教科（Area.subject）が同じなら、クリア時に
  +3コイン（PARTNER_SUBJECT_BONUS）。結果画面に「🤝 相棒ボーナス +3」行。失敗時は onFinish を呼ばない
  ので相棒ボーナスもコインアップも出ない。コインアップ＋相棒ボーナス両取り時は両方の行を表示。
- データ：Monster.subject / Area.subject は既存なので**モンスターデータの変更なし**。相棒・スキルは
  QuestScreen の一時状態で**保存しない**（保存キー・保存データ構造は変更なし。QuestResult に任意の
  partnerBonus を追加のみ）。
- 画像：本番採用は skill_hint_icon_512.png の1枚のみを public/assets/skills/ にコピー（相棒スキルボタン用、
  img→非表示フォールバック）。他のスキル素材と prepared 配下は非commit。相棒表示は既存モンスター画像を使用。
既存のクエスト/問題/モンスター/ショップアイテムID・v0.9.0アイテム・v0.9.1ハート制・図鑑・まなび島・
リセット・Vite base（/manabi-monsters-3nen/）・PWA・Service Worker・manifest・アイコンは変更なし。

## v0.9.3
「教科ボスクエスト」を追加。5教科それぞれに、通常クエストの後で挑む手ごわいボスと教科バッジを用意。
- 追加ボスクエスト5（各5問・仲間モンスターなし・isBoss:true）：
  国語 quest_boss_kokugo_kotoba_dragon（ことばドラゴン）／算数 quest_boss_sansu_warizan_golem
  （わり算ゴーレム）／理科 quest_boss_rika_kage_maou（かげのまおう）／
  社会 quest_boss_shakai_map_guardian（地図の番人）／英語 quest_boss_eigo_color_sphinx（カラフルスフィンクス）。
- 追加問題25（boss_<教科>_001〜005、各 rewardCoins:4 / rewardExp:2、hint付き、小3向け）。
  → 5問全問正解で 20コイン・10経験値（既存の問題ベース報酬をそのまま利用、報酬処理変更なし）。
- 解放条件：同じ教科の「通常クエストを2つ以上クリア」でボス解放（BOSS_UNLOCK_NEEDED=2）。
  ボスは通常クエストのステージ番号に含めない。未解放時は「🔒 あと○こクリアでボスにちょうせん！」表示。
- ボスカード（BossQuestCard）：ボス画像・5問・ハート3つ・教科バッジ表示。ロック時はグレー＋🔒。
- 教科バッジ：新しい保存キーは増やさず、「対応するボスの questId が clearedQuestIds にある」で判定。
  結果画面に「○○バッジをゲット！」（初回）／「もう持っているよ」（再クリア）。まなび島に「🏅 教科バッジ N/5」。
- ボスクエストは QuestScreen をそのまま利用：ハート制・アイテム（ヒント/やりなおし/ハートクッキー/
  コインアップ）・相棒スキル・相棒ボーナス（教科一致で+3）すべて有効。失敗時は onFinish 未呼び出しで
  報酬・経験値・バッジなし。ボスは rewardMonsterId:null なので図鑑の仲間には追加されない。
- データ型：Quest に任意 isBoss/bossImage、QuestResult に任意 badgeSubject を追加（表示・判定用）。
  **保存キー・保存データ構造（PlayerState）は変更なし。** モンスターデータも変更なし。
- 画像：本番採用はボス5枚のみ public/assets/bosses/boss_*_512.png にコピー。四隅完全透過を確認。
  prepared 配下は非commit。
既存のクエスト/問題/モンスター/ショップアイテムID・v0.9.0〜v0.9.2の機能・図鑑・ショップ・まなび島・
リセット・Vite base（/manabi-monsters-3nen/）・PWA・Service Worker・manifest・アイコンは変更なし。

## v1.0.0
最終目標「まなびのしんでん」とエンディングを追加。5教科バッジをすべて集めると神殿が開き、
エンディング（最終クリア画面）に到達できる。
- 解放条件：教科バッジ5個（＝5つの教科ボスを全クリア）。v0.9.3の clearedQuestIds から
  countEarnedBadges()（quests.ts、TOTAL_SUBJECT_BADGES=getBossQuests().length）で導出。新規判定用の
  保存値は増やさない。
- まなび島（IslandScreen）の一番上に神殿カードを追加：
  ・ロック（0〜4個）：閉じた神殿画像＋「きょうかバッジ N/5」＋「あと○こバッジを集めるとひらくよ！」（ボタンなし）。
  ・解放（5個・未クリア）：開いた神殿画像＋光エフェクト＋「まなびのしんでんが ひらいたよ！」＋「🚪 しんでんに はいる」。
  ・クリア済み：「🎉 しんでんクリアずみ！」＋「もういちど見る」。
- エンディング画面（新規 EndingScreen、App の 'ending' 画面）：開いた神殿＋光＋お祝いバナー＋
  5教科コンプリートバッジ＋学びのカギ＋「おめでとう！5つのきょうかを ぜんぶクリアしたよ！きみはまなびマスター！」。
  ボタン：もういちど見る（先頭へスクロール）／まなび島にもどる。
- クリア済み管理：最小の保存追加として PlayerState に templeCleared:boolean（後方互換・storageで
  false 既定）。神殿に入ったとき markTempleCleared() で true。**保存キー・既存フィールドは変更なし。**
  既に5バッジある古いsaveは、更新後すぐ神殿が解放状態になり、入ってクリア済みになる。
- 画像：本番採用は goal 6枚のみ public/assets/goal/*_512.png にコピー（temple_closed/open・
  badge_complete_5subjects・clear_congratulations_banner・key_of_learning・light_effect）。四隅完全透過を確認。
  door_closed/open 等の未使用素材と prepared 配下は非commit。全画像は img→絵文字フォールバック。
既存のクエスト/問題/モンスター/ショップアイテムID・v0.9.0〜v0.9.3の機能（通常/ボスクエスト・モンスター獲得・
アイテム・ハート・相棒スキル・教科バッジ）・図鑑・ショップ・まなび島・リセット・Vite base
（/manabi-monsters-3nen/）・PWA・Service Worker・manifest・アイコンは変更なし。
