import type { CSSProperties } from 'react';
import type { Area, Quest } from '../types/game';
import { SUBJECT_LABELS } from '../types/game';
import { publicAssetUrl } from '../utils/assets';

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
        {quests.map((quest) => {
          const cleared = clearedQuestIds.includes(quest.id);
          const count = quest.questionCount ?? quest.questionIds.length;
          return (
            <div key={quest.id} className="card quest-select-card">
              <div className="quest-select-info">
                <h3 className="quest-select-name">{quest.name}</h3>
                <div className="quest-select-tags">
                  <span className="quest-tag quest-tag-unit">📚 {quest.unit}</span>
                  <span className="quest-tag quest-tag-count">{count}問</span>
                  {cleared ? (
                    <span className="quest-tag quest-tag-cleared">✅ クリア済み・練習できます</span>
                  ) : (
                    <span className="quest-tag quest-tag-new">✨ 初回クリア報酬あり！</span>
                  )}
                </div>
              </div>
              <button className="btn btn-primary btn-big" onClick={() => onSelectQuest(quest)}>
                {cleared ? '🔁 練習する' : '⚔️ ちょうせんする'}
              </button>
            </div>
          );
        })}
      </div>

      <button className="btn btn-plain btn-small" onClick={onBack}>
        ↩️ ホームへもどる
      </button>
    </div>
  );
}
