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
      itemCounts: {},
      templeCleared: false,
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

  /**
   * つかうアイテム（消費アイテム）の購入。コインを払って所持数を1増やす。
   * 複数持てるので購入済みチェックはしない。コイン不足時は何もしない。
   */
  const buyConsumable = useCallback((itemId: string, price: number) => {
    setPlayer((prev) => {
      if (!prev) return prev;
      if (prev.coins < price) return prev;
      const itemCounts = { ...prev.itemCounts, [itemId]: (prev.itemCounts[itemId] ?? 0) + 1 };
      return { ...prev, coins: prev.coins - price, itemCounts };
    });
  }, []);

  /** つかうアイテムを1つ消費する。所持数0以下なら何もしない（防御的ガード）。 */
  const consumeItem = useCallback((itemId: string) => {
    setPlayer((prev) => {
      if (!prev) return prev;
      const current = prev.itemCounts[itemId] ?? 0;
      if (current <= 0) return prev;
      const itemCounts = { ...prev.itemCounts, [itemId]: current - 1 };
      return { ...prev, itemCounts };
    });
  }, []);

  /** まなびの神殿をクリア済みにする（エンディングを見たとき）。v1.0.0 */
  const markTempleCleared = useCallback(() => {
    setPlayer((prev) => {
      if (!prev || prev.templeCleared) return prev;
      return { ...prev, templeCleared: true };
    });
  }, []);

  const resetGame = useCallback(() => {
    clearSave();
    setPlayer(null);
  }, []);

  return {
    player,
    startNewGame,
    applyQuestResult,
    buyItem,
    buyConsumable,
    consumeItem,
    markTempleCleared,
    resetGame,
  };
}
