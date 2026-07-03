import { useCallback, useEffect, useState } from 'react';
import type { PlayerState, QuestResult } from '../types/game';
import { clearSave, loadPlayer, savePlayer } from '../utils/storage';

export function useGameState() {
  const [player, setPlayer] = useState<PlayerState | null>(() => loadPlayer());

  // プレイヤー状態が変わるたびに自動保存する
  useEffect(() => {
    if (player) savePlayer(player);
  }, [player]);

  const startNewGame = useCallback((name: string) => {
    setPlayer({
      name,
      coins: 0,
      exp: 0,
      monsterIds: [],
      clearedQuestIds: [],
      purchasedItemIds: [],
    });
  }, []);

  const applyQuestResult = useCallback((result: QuestResult) => {
    setPlayer((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        coins: prev.coins + result.earnedCoins,
        exp: prev.exp + result.earnedExp,
        monsterIds:
          result.newMonsterId && !prev.monsterIds.includes(result.newMonsterId)
            ? [...prev.monsterIds, result.newMonsterId]
            : prev.monsterIds,
        clearedQuestIds: prev.clearedQuestIds.includes(result.questId)
          ? prev.clearedQuestIds
          : [...prev.clearedQuestIds, result.questId],
      };
    });
  }, []);

  /**
   * アイテム購入。コイン不足・購入済みのときは何もしない（防御的ガード）。
   * 購入可否の表示判定は呼び出し側が player の値を見て行う。
   */
  const buyItem = useCallback((itemId: string, price: number) => {
    setPlayer((prev) => {
      if (!prev) return prev;
      if (prev.purchasedItemIds.includes(itemId)) return prev;
      if (prev.coins < price) return prev;
      return {
        ...prev,
        coins: prev.coins - price,
        purchasedItemIds: [...prev.purchasedItemIds, itemId],
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    clearSave();
    setPlayer(null);
  }, []);

  return { player, startNewGame, applyQuestResult, buyItem, resetGame };
}
