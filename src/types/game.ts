/** 教科 */
export type Subject = 'kokugo' | 'sansu' | 'rika' | 'shakai' | 'eigo';

/** 教科の日本語表示名 */
export const SUBJECT_LABELS: Record<Subject, string> = {
  kokugo: '国語',
  sansu: '算数',
  rika: '理科',
  shakai: '社会',
  eigo: '英語',
};

/** 教科エリア */
export interface Area {
  id: string;
  name: string;
  subject: Subject;
  emoji: string;
  cardImage?: string;
  backgroundImage?: string;
  description: string;
  available: boolean;
  /** クエスト選択画面に出すエリアらしいあいさつ文（省略時は汎用文） */
  welcome?: string;
}

/** クイズ問題 */
export interface Question {
  id: string;
  subject: Subject;
  unit: string;
  text: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  rewardCoins: number;
  rewardExp: number;
  /** ヒントキャンディで表示する短いヒント。無い問題は共通ヒントにフォールバックする（v0.9.0） */
  hint?: string;
}

/** クエスト */
export interface Quest {
  id: string;
  areaId: string;
  name: string;
  unit: string;
  /** クエスト開始画面に出す絵文字（省略時は 🗝️💎） */
  emoji?: string;
  description: string;
  /** 出題プール（この中からランダムな順で出題される） */
  questionIds: string[];
  /** 1回に出題する数。省略時はプール全問を出題 */
  questionCount?: number;
  /** 初回クリアで仲間になるモンスター。いないクエストは null */
  rewardMonsterId: string | null;
  /** true のとき教科ボスクエスト（クリアで教科バッジ）。v0.9.3 */
  isBoss?: boolean;
  /** ボス画像パス（ボスクエストのみ）。v0.9.3 */
  bossImage?: string;
}

/** モンスター */
export interface Monster {
  id: string;
  name: string;
  subject: Subject;
  emoji: string;
  image?: string;
  description: string;
}

/** プレイヤーの進行状況 */
export interface PlayerState {
  name: string;
  coins: number;
  exp: number;
  monsterIds: string[];
  clearedQuestIds: string[];
  purchasedItemIds: string[];
  /**
   * つかうアイテム（消費アイテム）の所持数。アイテムID→個数（v0.9.0で追加）。
   * 既存の飾りアイテム（purchasedItemIds）とは別管理。古い保存データでは空扱い。
   */
  itemCounts: Record<string, number>;
  /**
   * まなびの神殿をクリア（エンディングを見た）か。v1.0.0で追加。
   * 古い保存データでは false 扱い。神殿の解放条件は教科バッジ5個で、これはクリア済み表示用。
   */
  templeCleared: boolean;
}

/** ショップで買えるアイテム */
export interface ShopItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  emoji: string;
  /** アイコン画像パス（省略時は emoji 表示）。v0.9.0 */
  image?: string;
  /** true のとき、図鑑をコンプリートするまで購入できない */
  requiresDexComplete?: boolean;
}

/** クエスト1回分の結果 */
export interface QuestResult {
  questId: string;
  correctCount: number;
  totalCount: number;
  earnedCoins: number;
  earnedExp: number;
  /** 今回はじめて仲間になったモンスターのID（いなければ null） */
  newMonsterId: string | null;
  /** 初回クリアなら true、2回目以降の練習クリアなら false */
  isFirstClear: boolean;
  /** コインアップスターで増えたコイン数（つかっていなければ 0）。v0.9.0 */
  coinBonus?: number;
  /** 相棒モンスターの教科一致で増えたコイン数（なければ 0）。v0.9.2 */
  partnerBonus?: number;
  /** ボスクエストのクリアで手に入れた教科バッジの教科（ボス以外は undefined）。v0.9.3 */
  badgeSubject?: Subject;
}
