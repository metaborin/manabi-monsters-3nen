import type { PlayerState } from '../types/game';

const SAVE_KEY = 'manabi-monsters-save';

/** localStorage からセーブデータを読み込む。なければ null */
export function loadPlayer(): PlayerState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<PlayerState>;
    if (typeof data.name !== 'string' || data.name === '') return null;
    return {
      name: data.name,
      coins: typeof data.coins === 'number' ? data.coins : 0,
      exp: typeof data.exp === 'number' ? data.exp : 0,
      monsterIds: Array.isArray(data.monsterIds)
        ? data.monsterIds.filter((v): v is string => typeof v === 'string')
        : [],
      clearedQuestIds: Array.isArray(data.clearedQuestIds)
        ? data.clearedQuestIds.filter((v): v is string => typeof v === 'string')
        : [],
      // 古い保存データには purchasedItemIds がないので空配列として扱う
      purchasedItemIds: Array.isArray(data.purchasedItemIds)
        ? data.purchasedItemIds.filter((v): v is string => typeof v === 'string')
        : [],
    };
  } catch {
    return null;
  }
}

export function savePlayer(state: PlayerState): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // 保存できない環境（プライベートモードなど）でもゲームは続行できるようにする
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // 何もしない
  }
}
