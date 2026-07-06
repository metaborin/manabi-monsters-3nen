import type { PlayerState } from '../types/game';

const SAVE_KEY = 'manabi-monsters-save';

/** itemCounts を安全な { [id]: 0以上の整数 } に整える（不正値は捨てる） */
function sanitizeItemCounts(value: unknown): Record<string, number> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const result: Record<string, number> = {};
  for (const [id, count] of Object.entries(value as Record<string, unknown>)) {
    if (typeof count === 'number' && Number.isFinite(count) && count > 0) {
      result[id] = Math.floor(count);
    }
  }
  return result;
}

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
      // 古い保存データには itemCounts がないので空オブジェクトとして扱う（v0.9.0）
      itemCounts: sanitizeItemCounts(data.itemCounts),
      // 古い保存データには templeCleared がないので false 扱い（v1.0.0）
      templeCleared: data.templeCleared === true,
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
