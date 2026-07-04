import { MONSTERS } from '../data/monsters';
import { SUBJECT_LABELS } from '../types/game';
import { MonsterImage } from './MonsterImage';

interface Props {
  ownedMonsterIds: string[];
  onBack: () => void;
}

export function MonsterDex({ ownedMonsterIds, onBack }: Props) {
  const isComplete = MONSTERS.every((m) => ownedMonsterIds.includes(m.id));

  return (
    <div className="screen dex-screen">
      <h2 className="dex-title">📖 モンスター図鑑</h2>
      <p className="dex-count">
        なかま：{ownedMonsterIds.length} / {MONSTERS.length} 体
      </p>

      {isComplete && (
        <div className="card dex-complete-banner">
          🎉 図鑑コンプリート！ 🎉
          <br />5教科のまなびモンスターが全員そろったよ！
        </div>
      )}

      <div className="dex-grid">
        {MONSTERS.map((monster) => {
          const owned = ownedMonsterIds.includes(monster.id);
          return (
            <div key={monster.id} className={`card dex-card ${owned ? '' : 'dex-locked'}`}>
              <div className="dex-monster-media">
                {owned ? (
                  <MonsterImage
                    monster={monster}
                    className="monster-image monster-card-image"
                    fallbackClassName="dex-emoji"
                  />
                ) : (
                  <span className="dex-emoji">❓</span>
                )}
              </div>
              <div className="dex-name">{owned ? monster.name : '？？？'}</div>
              <div className="dex-subject">{SUBJECT_LABELS[monster.subject]}</div>
              <p className="dex-description">
                {owned ? monster.description : 'まだ出会っていないモンスターだよ。'}
              </p>
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
