import { useState } from 'react';
import type { PlayerState, ShopItem } from '../types/game';
import { SHOP_ITEMS } from '../data/shopItems';
import { MONSTERS } from '../data/monsters';

interface Props {
  player: PlayerState;
  onBuy: (itemId: string, price: number) => void;
  onBack: () => void;
}

type Feedback = { itemId: string; kind: 'bought' | 'poor' | 'locked' };

export function ShopScreen({ player, onBuy, onBack }: Props) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const dexComplete = MONSTERS.every((m) => player.monsterIds.includes(m.id));

  const handleBuy = (item: ShopItem) => {
    if (player.purchasedItemIds.includes(item.id)) return;
    if (item.requiresDexComplete && !dexComplete) {
      setFeedback({ itemId: item.id, kind: 'locked' });
      return;
    }
    if (player.coins < item.price) {
      setFeedback({ itemId: item.id, kind: 'poor' });
      return;
    }
    onBuy(item.id, item.price);
    setFeedback({ itemId: item.id, kind: 'bought' });
  };

  return (
    <div className="screen shop-screen">
      <header className="home-header">
        <h2 className="home-title">🛍️ まなびショップ</h2>
        <p className="home-player-name">コインを使って、まなび島のアイテムを集めよう！</p>
        <p className="shop-island-note">🏝️ 買ったアイテムは、まなび島に飾られるよ！</p>
      </header>

      <div className="card shop-coin-card">
        <span className="status-emoji">🪙</span>
        <span className="shop-coin-label">もっているコイン</span>
        <span className="shop-coin-value">{player.coins}</span>
      </div>

      {dexComplete && (
        <div className="card shop-dex-message">
          🎉 5教科のモンスターがそろったね！記念アイテムが買えるようになったよ！
        </div>
      )}

      <div className="shop-grid">
        {SHOP_ITEMS.map((item) => {
          const purchased = player.purchasedItemIds.includes(item.id);
          const locked = item.requiresDexComplete === true && !dexComplete;
          const canAfford = player.coins >= item.price;
          const fb = feedback && feedback.itemId === item.id ? feedback.kind : null;

          return (
            <div
              key={item.id}
              className={`card shop-item-card ${purchased ? 'shop-item-purchased' : ''}`}
            >
              <span className="shop-item-emoji">{item.emoji}</span>
              <span className="shop-item-name">{item.name}</span>
              <span className="shop-item-category">{item.category}</span>
              <p className="shop-item-description">{item.description}</p>
              <span className="shop-item-price">🪙 {item.price}コイン</span>

              {purchased ? (
                <div className="shop-item-owned">✅ 購入済み</div>
              ) : locked ? (
                <button className="btn btn-plain btn-small shop-buy-btn" onClick={() => handleBuy(item)}>
                  🔒 {MONSTERS.length}体そろえてね
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-small shop-buy-btn"
                  onClick={() => handleBuy(item)}
                  disabled={!canAfford}
                >
                  {canAfford ? '🛒 こうにゅう' : 'コインが足りないよ'}
                </button>
              )}

              {fb === 'bought' && <div className="shop-feedback shop-feedback-ok">🎉 購入しました！</div>}
              {fb === 'poor' && (
                <div className="shop-feedback shop-feedback-ng">コインが足りません</div>
              )}
              {fb === 'locked' && (
                <div className="shop-feedback shop-feedback-ng">
                  {MONSTERS.length}体そろうと買えるよ
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="btn btn-primary btn-big" onClick={onBack}>
        🗺️ 島マップへもどる
      </button>
    </div>
  );
}
