export interface LevelInfo {
  level: number;
  /** 次のレベルまでに必要な経験値。最大レベルなら null */
  expToNext: number | null;
  /** 現在レベル内での進み具合（0〜1）。プログレスバー表示用 */
  progress: number;
}

/** LEVEL_THRESHOLDS[i] = レベル i+1 になるために必要な累計経験値 */
const LEVEL_THRESHOLDS = [0, 20, 50, 100, 180, 300, 450, 650, 900, 1200];

export const MAX_LEVEL = LEVEL_THRESHOLDS.length;

export function getLevelInfo(exp: number): LevelInfo {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (exp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }

  if (level >= MAX_LEVEL) {
    return { level, expToNext: null, progress: 1 };
  }

  const current = LEVEL_THRESHOLDS[level - 1];
  const next = LEVEL_THRESHOLDS[level];
  return {
    level,
    expToNext: next - exp,
    progress: (exp - current) / (next - current),
  };
}
