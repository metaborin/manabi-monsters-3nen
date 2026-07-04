import type { Quest } from '../types/game';
import { findQuestion } from '../data/questions';

/** クエストの初回クリア報酬コイン（全問正解したときの合計）。
 *  既存の問題データ（rewardCoins）から計算するだけで、データ構造は変えない。 */
export function getQuestRewardCoins(quest: Quest): number {
  return quest.questionIds.reduce(
    (sum, id) => sum + (findQuestion(id)?.rewardCoins ?? 0),
    0,
  );
}
