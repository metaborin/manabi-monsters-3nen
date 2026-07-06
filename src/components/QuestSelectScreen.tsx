import type { CSSProperties } from 'react';
import type { Area, Quest } from '../types/game';
import { SUBJECT_LABELS } from '../types/game';
import { publicAssetUrl } from '../utils/assets';
import { getQuestRewardCoins } from '../utils/questReward';
import { findMonster } from '../data/monsters';
import {
  QuestStateBadge,
  QuestStagePlate,
  QuestCoinReward,
  QuestFriendReward,
  BossQuestCard,
  type QuestState,
} from './QuestCardParts';

/** 教科ボスを解放するのに必要な、同じ教科の通常クエストのクリア数 */
const BOSS_UNLOCK_NEEDED = 2;

interface Props {
  area: Area;
  quests: Quest[];
  clearedQuestIds: string[];
  onSelectQuest: (quest: Quest) => void;
  onBack: () => void;
}

export function QuestSelectScreen({ area, quests, clearedQuestIds, onSelectQuest, onBack }: Props) {
  const backgroundImageUrl = publicAssetUrl(area.backgroundImage);
  const backgroundStyle = backgroundImageUrl
    ? ({ '--area-bg-image': `url("${backgroundImageUrl}")` } as CSSProperties)
    : undefined;

  // 通常クエストとボスクエストを分ける（ステージ番号にボスは含めない）
  const normalQuests = quests.filter((q) => !q.isBoss);
  const bossQuests = quests.filter((q) => q.isBoss);
  // 同じ教科の通常クエストを何個クリアしたか（ボス解放の判定）
  const normalClearedCount = normalQuests.filter((q) => clearedQuestIds.includes(q.id)).length;
  const bossUnlocked = normalClearedCount >= BOSS_UNLOCK_NEEDED;
  const bossRemaining = Math.max(0, BOSS_UNLOCK_NEEDED - normalClearedCount);

  // このエリアで「次に遊ぶとよい」通常クエスト = 最初の未クリア通常クエスト
  const recommendedQuestId = normalQuests.find((q) => !clearedQuestIds.includes(q.id))?.id;

  return (
    <div className="screen quest-select-screen area-background-screen" style={backgroundStyle}>
      <header className="home-header">
        <h2 className="home-title">
          {area.emoji} {area.name}
        </h2>
        <p className="home-player-name">
          {area.welcome ?? `${SUBJECT_LABELS[area.subject]}のクエストをえらぼう`}
        </p>
      </header>

      <div className="quest-list">
        {normalQuests.map((quest, index) => {
          const cleared = clearedQuestIds.includes(quest.id);
          const recommended = quest.id === recommendedQuestId;
          const count = quest.questionCount ?? quest.questionIds.length;
          const rewardCoins = getQuestRewardCoins(quest);
          const rewardMonster = quest.rewardMonsterId
            ? findMonster(quest.rewardMonsterId)
            : undefined;

          const state: QuestState = cleared ? 'cleared' : recommended ? 'recommended' : 'new';
          const cardClass = `quest-stage-${state}`;

          return (
            <div key={quest.id} className={`card quest-select-card quest-stage-card ${cardClass}`}>
              {/* 上段：ステージ番号プレート＋状態バッジ */}
              <div className="quest-card-top">
                <QuestStagePlate index={index + 1} />
                <QuestStateBadge state={state} />
              </div>

              <div className="quest-select-info">
                <h3 className="quest-select-name">{quest.name}</h3>
                <div className="quest-select-tags">
                  <span className="quest-tag quest-tag-unit">📚 {quest.unit}</span>
                  <span className="quest-tag quest-tag-count">{count}問</span>
                </div>
              </div>

              {/* 報酬 */}
              <div className="quest-reward-row">
                <QuestCoinReward coins={rewardCoins} cleared={cleared} />
                {rewardMonster ? (
                  <QuestFriendReward monster={rewardMonster} cleared={cleared} />
                ) : (
                  <div className="quest-reward-practice">
                    <span className="quest-reward-caption">なかま</span>
                    <span className="quest-reward-practice-value">れんしゅうクエスト</span>
                  </div>
                )}
              </div>

              <button className="btn btn-primary btn-big" onClick={() => onSelectQuest(quest)}>
                {cleared ? '🔁 練習する' : '⚔️ ちょうせんする'}
              </button>
            </div>
          );
        })}
      </div>

      {/* 教科ボスしれん */}
      {bossQuests.length > 0 && (
        <>
          <h3 className="section-title quest-boss-heading">👑 ボスしれん</h3>
          <div className="quest-list">
            {bossQuests.map((boss) => (
              <BossQuestCard
                key={boss.id}
                quest={boss}
                subjectLabel={SUBJECT_LABELS[area.subject]}
                cleared={clearedQuestIds.includes(boss.id)}
                unlocked={bossUnlocked}
                remaining={bossRemaining}
                onSelect={() => onSelectQuest(boss)}
              />
            ))}
          </div>
        </>
      )}

      <button className="btn btn-plain btn-small" onClick={onBack}>
        🗺️ 島マップへもどる
      </button>
    </div>
  );
}
