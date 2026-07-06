import { useState } from 'react';
import type { Area, PlayerState } from '../types/game';
import { AREAS } from '../data/areas';
import { MONSTERS } from '../data/monsters';
import { SHOP_ITEMS } from '../data/shopItems';
import { getLevelInfo } from '../utils/level';
import { getAreaProgress, getNextGuide } from '../utils/progress';
import { publicAssetUrl } from '../utils/assets';
import { AreaCard } from './AreaCard';
import { MapSpotCard } from './MapSpotCard';
import { IslandMap } from './IslandMap';
import { IconLabel, UiIcon, UI_ICON_ASSETS } from './UiIcon';

interface Props {
  player: PlayerState;
  onSelectArea: (area: Area) => void;
  onOpenDex: () => void;
  onOpenShop: () => void;
  onOpenIsland: () => void;
  onBackToTitle: () => void;
}

const TITLE_LOGO_URL = publicAssetUrl('assets/title/title_logo.png');

export function HomeScreen({
  player,
  onSelectArea,
  onOpenDex,
  onOpenShop,
  onOpenIsland,
  onBackToTitle,
}: Props) {
  const levelInfo = getLevelInfo(player.exp);
  const nextGuide = getNextGuide(player);
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = TITLE_LOGO_URL && !logoFailed;

  const ownedMonsters = player.monsterIds.length;
  const remainingMonsters = MONSTERS.length - ownedMonsters;
  const ownedItems = player.purchasedItemIds.length;

  // ショップの状態：買えるアイテムがあるか
  const affordableItem = SHOP_ITEMS.some(
    (item) =>
      !player.purchasedItemIds.includes(item.id) &&
      !(item.requiresDexComplete && remainingMonsters > 0) &&
      player.coins >= item.price,
  );
  const allItemsOwned = ownedItems === SHOP_ITEMS.length;
  const shopStatus = allItemsOwned
    ? 'ぜんぶそろった！'
    : affordableItem
    ? '🪙 買えるよ！'
    : 'コインをためよう';

  return (
    <div className="screen home-screen">
      <div className="title-hero">
        {showLogo ? (
          <img
            src={TITLE_LOGO_URL}
            alt="まなびモンスターズ 3年生のひみつ島"
            className="title-hero-image"
            decoding="async"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <div className="title-hero-fallback">
            <span className="title-hero-main">まなびモンスターズ</span>
            <span className="title-hero-sub">3年生のひみつ島</span>
          </div>
        )}
        <p className="title-hero-tagline">🗺️ しまを ぼうけんして モンスターを あつめよう！</p>
      </div>

      <header className="home-header island-map-header">
        <h2 className="home-title">🗺️ まなび島マップ</h2>
        <p className="island-here">🧭 いまいるところ：まなび島のちゅうおう</p>
        <p className="home-player-name">ぼうけんしゃ：{player.name} さん</p>
      </header>

      {/* 島全体マップ。施設アイコンを押すと各画面へ移動できる */}
      <IslandMap
        onSelectArea={onSelectArea}
        onOpenShop={onOpenShop}
        onOpenDex={onOpenDex}
        onOpenIsland={onOpenIsland}
      />
      <p className="island-map-hint">
        🏝️ アイコンをおして あそびに行こう！したのメニューからもえらべるよ。
      </p>

      <div className="card level-card">
        <div className="level-card-top">
          <span className="level-badge">レベル {levelInfo.level}</span>
          <IconLabel
            src={UI_ICON_ASSETS.exp}
            alt="経験値"
            className="level-exp"
            iconClassName="ui-icon-sm"
            fallback="⭐"
          >
            {player.exp} EXP
          </IconLabel>
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
          <UiIcon
            src={UI_ICON_ASSETS.coin}
            alt="コイン"
            className="status-icon"
            fallback="🪙"
          />
          <span className="status-label">コイン</span>
          <span className="status-value">{player.coins}</span>
        </div>
        <div className="card status-card">
          <UiIcon
            src={UI_ICON_ASSETS.exp}
            alt="経験値"
            className="status-icon"
            fallback="⭐"
          />
          <span className="status-label">けいけんち</span>
          <span className="status-value">{player.exp}</span>
        </div>
        <div className="card status-card">
          <span className="status-emoji">🧸</span>
          <span className="status-label">なかま</span>
          <span className="status-value">
            {ownedMonsters} / {MONSTERS.length}
          </span>
        </div>
        <div className="card status-card">
          <span className="status-emoji">🛍️</span>
          <span className="status-label">アイテム</span>
          <span className="status-value">
            {ownedItems} / {SHOP_ITEMS.length}
          </span>
        </div>
      </div>

      {/* 次のおすすめ */}
      <div className="card next-guide-card">
        <span className="next-guide-emoji">🧭</span>
        <div className="next-guide-text">
          <span className="next-guide-label">つぎのおすすめ</span>
          <span className="next-guide-message">{nextGuide.message}</span>
        </div>
      </div>

      <h3 className="section-title">📚 きょうかの島</h3>
      <div className="area-grid">
        {AREAS.map((area) => (
          <AreaCard
            key={area.id}
            area={area}
            onSelect={onSelectArea}
            progress={area.available ? getAreaProgress(area.id, player.clearedQuestIds) : undefined}
            recommended={nextGuide.areaId === area.id}
          />
        ))}
      </div>

      <h3 className="section-title">🏘️ 島のしせつ</h3>
      <div className="area-grid">
        <MapSpotCard
          emoji="🛍️"
          name="まなびショップ"
          description="コインでアイテムを集めよう"
          accent="shop"
          status={shopStatus}
          statusHighlight={affordableItem && !allItemsOwned}
          onSelect={onOpenShop}
        />
        <MapSpotCard
          emoji="📖"
          name="モンスターずかん"
          description="仲間のモンスターを見よう"
          accent="dex"
          status={
            remainingMonsters > 0
              ? `${ownedMonsters}/${MONSTERS.length} あつめた`
              : 'ぜんぶあつめた！'
          }
          onSelect={onOpenDex}
        />
        <MapSpotCard
          emoji="🎪"
          name="コレクション広場"
          description="島に飾ったものを見よう"
          accent="island"
          status={`なかま ${ownedMonsters}体`}
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
