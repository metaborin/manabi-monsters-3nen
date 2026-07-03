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
}

/** モンスター */
export interface Monster {
  id: string;
  name: string;
  subject: Subject;
  emoji: string;
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
}

/** ショップで買えるアイテム */
export interface ShopItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  emoji: string;
  /** true のとき、5体コンプリートするまで購入できない */
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
}
