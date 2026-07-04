import type { Area, PlayerState } from '../types/game';
import { AREAS } from '../data/areas';
import { findQuestsByArea } from '../data/quests';

/** ひとつの教科エリアのクエスト進行状況 */
export interface AreaProgress {
  total: number;
  cleared: number;
  allCleared: boolean;
  /** ひとつもクリアしていない（NEW） */
  isNew: boolean;
}

export function getAreaProgress(areaId: string, clearedQuestIds: string[]): AreaProgress {
  const quests = findQuestsByArea(areaId);
  const total = quests.length;
  const cleared = quests.filter((q) => clearedQuestIds.includes(q.id)).length;
  return {
    total,
    cleared,
    allCleared: total > 0 && cleared === total,
    isNew: total > 0 && cleared === 0,
  };
}

/** 次に行くとよい場所の案内 */
export interface NextGuide {
  /** おすすめのエリアID（施設をすすめるときは null） */
  areaId: string | null;
  message: string;
}

/** プレイ状況から「次のおすすめ」を決める。
 *  まだクリアしていないエリアがあれば、AREAS の並び順で最初のものをすすめる。
 *  ぜんぶクリア済みなら、ショップやコレクションをすすめる。 */
export function getNextGuide(player: PlayerState): NextGuide {
  const availableAreas = AREAS.filter((a) => a.available);
  const anyCleared = availableAreas.some(
    (a) => getAreaProgress(a.id, player.clearedQuestIds).cleared > 0,
  );

  const nextArea: Area | undefined = availableAreas.find(
    (a) => !getAreaProgress(a.id, player.clearedQuestIds).allCleared,
  );

  if (nextArea) {
    if (!anyCleared) {
      return { areaId: nextArea.id, message: `まずは「${nextArea.name}」に行ってみよう！` };
    }
    return { areaId: nextArea.id, message: `つぎは「${nextArea.name}」がおすすめ！` };
  }

  // すべてのエリアをクリア済み
  return {
    areaId: null,
    message: '5教科ぜんぶクリア！ショップやコレクション広場ものぞいてみよう！',
  };
}
