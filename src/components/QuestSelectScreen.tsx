import type { CSSProperties } from 'react';
import type { Area, Quest } from '../types/game';
import { SUBJECT_LABELS } from '../types/game';
import { publicAssetUrl } from '../utils/assets';
import { getQuestRewardCoins } from '../utils/questReward';
import { findMonster } from '../data/monsters';
import { MonsterImage } from './MonsterImage';

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

  // このエリアで「次に遊ぶとよい」クエスト = 最初の未クリアクエスト
  const recommendedQuestId = quests.find((q) => !clearedQuestIds.includes(q.id))?.id;

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
        {quests.map((quest, index) => {
          const cleared = clearedQuestIds.includes(quest.id);
          const recommended = quest.id === recommendedQuestId;
          const count = quest.questionCount ?? quest.questionIds.length;
          const rewardCoins = getQuestRewardCoins(quest);
          const rewardMonster = quest.rewardMonsterId
            ? findMonster(quest.rewardMonsterId)
            : undefined;

          const cardClass = cleared
            ? 'quest-stage-cleared'
            : recommended
            ? 'quest-stage-recommended'
            : 'quest-stage-new';

          return (
            <div key={quest.id} className={`card quest-select-card quest-stage-card ${cardClass}`}>
              {/* 状態バッジ */}
              <span className={`quest-stage-badge quest-stage-badge-${cardClass}`}>
                {cleared ? '✅ クリア済み' : recommended ? '⭐ おすすめ' : '✨ NEW'}
              </span>

              <div className="quest-select-info">
                <span className="quest-stage-number">ステージ {index + 1}</span>
                <h3 className="quest-select-name">{quest.name}</h3>
                <div className="quest-select-tags">
                  <span className="quest-tag quest-tag-unit">📚 {quest.unit}</span>
                  <span className="quest-tag quest-tag-count">{count}問</span>
                </div>
              </div>

              {/* 報酬 */}
              <div className="quest-reward-row">
                <div className="quest-reward-item">
                  <span className="quest-reward-label">ほうしゅう</span>
                  <span className="quest-reward-value">
                    🪙 {cleared ? '受け取りずみ' : `${rewardCoins}コイン`}
                  </span>
                </div>
                {rewardMonster ? (
                  <div className="quest-reward-item quest-reward-monster">
                    <MonsterImage
                      monster={rewardMonster}
                      className="quest-reward-monster-image"
                      fallbackClassName="quest-reward-monster-emoji"
                    />
                    <div className="quest-reward-monster-text">
                      <span className="quest-reward-label">なかま</span>
                      <span className="quest-reward-value">
                        {cleared ? `✅ ${rewardMonster.name}` : rewardMonster.name}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="quest-reward-item">
                    <span className="quest-reward-label">なかま</span>
                    <span className="quest-reward-value">れんしゅうクエスト</span>
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

      <button className="btn btn-plain btn-small" onClick={onBack}>
        🗺️ 島マップへもどる
      </button>
    </div>
  );
}
