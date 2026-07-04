import type { Area, PlayerState } from '../types/game';
import { AREAS } from '../data/areas';
import { MONSTERS } from '../data/monsters';
import { SHOP_ITEMS } from '../data/shopItems';
import { getLevelInfo } from '../utils/level';
import { AreaCard } from './AreaCard';
import { MapSpotCard } from './MapSpotCard';

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
      <header className="home-header island-map-header">
        <h2 className="home-title">🗺️ まなび島マップ</h2>
        <p className="island-here">🧭 いまいるところ：ちゅうおう広場</p>
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

      <p className="island-guide">タップして、行きたいばしょへ出発！ 🚶</p>

      <h3 className="section-title">📚 きょうかの島</h3>
      <div className="area-grid">
        {AREAS.map((area) => (
          <AreaCard key={area.id} area={area} onSelect={onSelectArea} />
        ))}
      </div>

      <h3 className="section-title">🏘️ 島のしせつ</h3>
      <div className="area-grid">
        <MapSpotCard
          emoji="🛍️"
          name="まなびショップ"
          description="コインでアイテムを集めよう"
          accent="shop"
          onSelect={onOpenShop}
        />
        <MapSpotCard
          emoji="📖"
          name="モンスターずかん"
          description="仲間のモンスターを見よう"
          accent="dex"
          onSelect={onOpenDex}
        />
        <MapSpotCard
          emoji="🎪"
          name="コレクション広場"
          description="島に飾ったものを見よう"
          accent="island"
          onSelect={onOpenIsland}
        />
      </div>

      <div className="home-buttons">
        <button className="btn btn-plain btn-small" onClick={onBackToTitle}>
          🏠 タイトルへもどる
        </button>
      </div>
    </div>
  );
}
