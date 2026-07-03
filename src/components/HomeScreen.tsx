import type { Area, PlayerState } from '../types/game';
import { AREAS } from '../data/areas';
import { MONSTERS } from '../data/monsters';
import { SHOP_ITEMS } from '../data/shopItems';
import { getLevelInfo } from '../utils/level';
import { AreaCard } from './AreaCard';

interface Props {
  player: PlayerState;
  onSelectArea: (area: Area) => void;
  onOpenDex: () => void;
  onOpenShop: () => void;
  onOpenIsland: () => void;
  onBackToTitle: () => void;
}

export function HomeScreen({
  player,
  onSelectArea,
  onOpenDex,
  onOpenShop,
  onOpenIsland,
  onBackToTitle,
}: Props) {
  const levelInfo = getLevelInfo(player.exp);

  return (
    <div className="screen home-screen">
      <header className="home-header">
        <h2 className="home-title">🏝️ まなび島</h2>
        <p className="home-player-name">ぼうけんしゃ：{player.name} さん</p>
      </header>

      <div className="card level-card">
        <div className="level-card-top">
          <span className="level-badge">レベル {levelInfo.level}</span>
          <span className="level-exp">⭐ {player.exp} EXP</span>
        </div>
        <div className="level-bar">
          <div
            className="level-bar-fill"
            style={{ width: `${Math.round(levelInfo.progress * 100)}%` }}
          />
        </div>
        <p className="level-next">
          {levelInfo.expToNext !== null
            ? `つぎのレベルまで あと ${levelInfo.expToNext} EXP`
            : 'さいこうレベル！すごい！'}
        </p>
      </div>

      <div className="status-row">
        <div className="card status-card">
          <span className="status-emoji">🪙</span>
          <span className="status-label">コイン</span>
          <span className="status-value">{player.coins}</span>
        </div>
        <div className="card status-card">
          <span className="status-emoji">⭐</span>
          <span className="status-label">けいけんち</span>
          <span className="status-value">{player.exp}</span>
        </div>
        <div className="card status-card">
          <span className="status-emoji">🧸</span>
          <span className="status-label">なかま</span>
          <span className="status-value">
            {player.monsterIds.length} / {MONSTERS.length}
          </span>
        </div>
        <div className="card status-card">
          <span className="status-emoji">🛍️</span>
          <span className="status-label">アイテム</span>
          <span className="status-value">
            {player.purchasedItemIds.length} / {SHOP_ITEMS.length}
          </span>
        </div>
      </div>

      <h3 className="section-title">どこにいく？</h3>
      <div className="area-grid">
        {AREAS.map((area) => (
          <AreaCard key={area.id} area={area} onSelect={onSelectArea} />
        ))}
      </div>

      <div className="home-buttons">
        <button className="btn btn-secondary btn-big" onClick={onOpenDex}>
          📖 モンスター図鑑
        </button>
        <button className="btn btn-shop btn-big" onClick={onOpenShop}>
          🛍️ まなびショップ
        </button>
        <button className="btn btn-island btn-big" onClick={onOpenIsland}>
          🏝️ まなび島を見る
        </button>
        <p className="home-island-hint">集めたモンスターやアイテムで、まなび島をにぎやかにしよう！</p>
        <button className="btn btn-plain btn-small" onClick={onBackToTitle}>
          🏠 タイトルへもどる
        </button>
      </div>
    </div>
  );
}
