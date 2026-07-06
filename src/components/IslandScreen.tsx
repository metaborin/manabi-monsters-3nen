import type { PlayerState } from '../types/game';
import { SUBJECT_LABELS } from '../types/game';
import { MONSTERS } from '../data/monsters';
import { SHOP_ITEMS } from '../data/shopItems';
import { getBossQuests } from '../data/quests';
import { MonsterImage } from './MonsterImage';

interface Props {
  player: PlayerState;
  onBack: () => void;
  onOpenShop: () => void;
}

const FLAG_ITEM_ID = 'item_manabi_flag';

/** にぎやか度ポイントから島のようすを表す言葉を返す */
function livelinessLabel(points: number): string {
  if (points >= 9) return 'まなびでいっぱいの島';
  if (points >= 6) return 'にぎやかな島';
  if (points >= 3) return '少しにぎやかな島';
  return 'しずかな島';
}

export function IslandScreen({ player, onBack, onOpenShop }: Props) {
  const ownedMonsters = player.monsterIds.length;
  const ownedItems = player.purchasedItemIds.length;
  const liveliness = livelinessLabel(ownedMonsters + ownedItems);

  const dexComplete = MONSTERS.every((m) => player.monsterIds.includes(m.id));
  const hasFlag = player.purchasedItemIds.includes(FLAG_ITEM_ID);

  // 教科バッジ（ボスクエストをクリアした数）
  const bossQuests = getBossQuests();
  const earnedBadges = bossQuests.filter((q) => player.clearedQuestIds.includes(q.id)).length;

  return (
    <div className="screen island-screen">
      <header className="home-header">
        <h2 className="home-title">🏝️ まなび島</h2>
        <p className="home-player-name">{player.name} さんの島</p>
      </header>

      {/* 旗の特別表示 */}
      {hasFlag ? (
        <div className="card island-flag-banner">
          🚩 まなび島の旗が立った！5教科の力がこの島に集まったよ！
        </div>
      ) : dexComplete ? (
        <div className="card island-flag-hint island-flag-hint-ready">
          🎉 {MONSTERS.length}体のモンスターがそろったよ！ショップで記念の旗を手に入れよう！
        </div>
      ) : (
        <div className="card island-flag-hint">
          🚩 5教科のモンスターを集めると、特別な旗が手に入るよ！
        </div>
      )}

      {/* 島のようす */}
      <div className="island-stats">
        <div className="card island-stat">
          <span className="island-stat-emoji">🧸</span>
          <span className="island-stat-label">なかま</span>
          <span className="island-stat-value">
            {ownedMonsters} / {MONSTERS.length}
          </span>
        </div>
        <div className="card island-stat">
          <span className="island-stat-emoji">🛍️</span>
          <span className="island-stat-label">アイテム</span>
          <span className="island-stat-value">
            {ownedItems} / {SHOP_ITEMS.length}
          </span>
        </div>
        <div className="card island-stat">
          <span className="island-stat-emoji">🏅</span>
          <span className="island-stat-label">教科バッジ</span>
          <span className="island-stat-value">
            {earnedBadges} / {bossQuests.length}
          </span>
        </div>
        <div className="card island-stat island-stat-wide">
          <span className="island-stat-emoji">✨</span>
          <span className="island-stat-label">にぎやか度</span>
          <span className="island-stat-value island-liveliness">{liveliness}</span>
        </div>
      </div>

      {/* モンスター広場 */}
      <h3 className="section-title">🌳 モンスター広場</h3>
      <div className="island-grid">
        {MONSTERS.map((monster) => {
          const owned = player.monsterIds.includes(monster.id);
          return (
            <div
              key={monster.id}
              className={`card island-monster ${owned ? '' : 'island-locked'}`}
            >
              <div className="island-monster-media">
                {owned ? (
                  <MonsterImage
                    monster={monster}
                    className="monster-image island-monster-image"
                    fallbackClassName="island-monster-emoji"
                  />
                ) : (
                  <span className="island-monster-emoji">❓</span>
                )}
              </div>
              <span className="island-monster-name">{owned ? monster.name : '？？？'}</span>
              {owned ? (
                <>
                  <span className="island-monster-subject">{SUBJECT_LABELS[monster.subject]}</span>
                  <p className="island-monster-desc">{monster.description}</p>
                </>
              ) : (
                <p className="island-monster-desc">まだ出会っていないモンスター</p>
              )}
            </div>
          );
        })}
      </div>

      {/* アイテム広場 */}
      <h3 className="section-title">🎪 かざりつけ広場</h3>
      <div className="island-grid">
        {SHOP_ITEMS.map((item) => {
          const owned = player.purchasedItemIds.includes(item.id);
          return (
            <div key={item.id} className={`card island-item ${owned ? '' : 'island-locked'}`}>
              <span className="island-item-emoji">{owned ? item.emoji : '❓'}</span>
              <span className="island-item-name">{owned ? item.name : '？？？'}</span>
              {owned ? (
                <>
                  <span className="island-item-category">{item.category}</span>
                  <p className="island-item-desc">{item.description}</p>
                </>
              ) : (
                <p className="island-item-desc">
                  まだ持っていません
                  <br />
                  まなびショップで手に入れよう
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="home-buttons">
        <button className="btn btn-shop btn-big" onClick={onOpenShop}>
          🛍️ まなびショップへ行く
        </button>
        <button className="btn btn-primary btn-big" onClick={onBack}>
          🗺️ 島マップへもどる
        </button>
      </div>
    </div>
  );
}
