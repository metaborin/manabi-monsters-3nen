import type { Monster, QuestResult } from '../types/game';
import { getLevelInfo } from '../utils/level';
import { MonsterImage } from './MonsterImage';

interface Props {
  result: QuestResult;
  rewardMonster: Monster | null;
  /** 報酬反映後のプレイヤー経験値（現在レベルの表示用） */
  playerExp: number;
  /** クエスト開始前のレベル（レベルアップ判定用） */
  levelBefore: number;
  /** 今回のクリアで図鑑が完成したら true */
  dexJustCompleted: boolean;
  onBackHome: () => void;
}

function resultMessage(correctCount: number, totalCount: number): string {
  if (correctCount === totalCount) return 'パーフェクト！すごい！';
  if (correctCount >= 3) return 'よくできました！';
  if (correctCount >= 1) return 'もう一度チャレンジしてみよう！';
  return '解説を読んで、もう一回やってみよう！';
}

export function ResultScreen({
  result,
  rewardMonster,
  playerExp,
  levelBefore,
  dexJustCompleted,
  onBackHome,
}: Props) {
  const isNewMonster = result.newMonsterId !== null;
  const allCorrect = result.correctCount === result.totalCount;
  const accuracy = Math.round((result.correctCount / result.totalCount) * 100);
  const levelInfo = getLevelInfo(playerExp);
  const leveledUp = levelInfo.level > levelBefore;

  return (
    <div className="screen result-screen">
      <div className="card result-card">
        <h2 className="result-title">
          {allCorrect ? '🏆 パーフェクト！' : '🎊 クエストおわり！'}
        </h2>

        {result.isFirstClear ? (
          <div className="clear-badge clear-badge-first">✨ 初回クリアボーナス！ ✨</div>
        ) : (
          <div className="clear-badge clear-badge-practice">
            🔁 れんしゅうクリア（コインは半分だよ）
          </div>
        )}

        <p className="result-message">{resultMessage(result.correctCount, result.totalCount)}</p>

        {leveledUp && (
          <div className="levelup-banner">
            ⬆️ レベルアップ！ レベル{levelInfo.level}になった！ 🎉
          </div>
        )}

        <div className="result-rows">
          <div className="result-row">
            <span className="result-label">せいかいすう</span>
            <span className="result-value">
              {result.correctCount} / {result.totalCount} 問
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">せいとうりつ</span>
            <span className="result-value">{accuracy}%</span>
          </div>
          <div className="result-row">
            <span className="result-label">🪙 かくとくコイン</span>
            <span className="result-value">+{result.earnedCoins - (result.coinBonus ?? 0)}</span>
          </div>
          {(result.coinBonus ?? 0) > 0 && (
            <div className="result-row result-row-bonus">
              <span className="result-label">⭐ コインアップ</span>
              <span className="result-value">+{result.coinBonus}</span>
            </div>
          )}
          <div className="result-row">
            <span className="result-label">⭐ かくとくけいけんち</span>
            <span className="result-value">+{result.earnedExp}</span>
          </div>
          <div className="result-row">
            <span className="result-label">いまのレベル</span>
            <span className="result-value">レベル {levelInfo.level}</span>
          </div>
        </div>

        {rewardMonster && (
          <div className={`monster-get ${isNewMonster ? 'monster-get-new' : ''}`}>
            <MonsterImage
              monster={rewardMonster}
              className="monster-image result-monster-image"
              fallbackClassName="monster-get-emoji"
            />
            {isNewMonster ? (
              <p className="monster-get-text">
                <strong>{rewardMonster.name}</strong>が仲間になった！
              </p>
            ) : (
              <p className="monster-get-text">
                {rewardMonster.name}はもう仲間だよ。
                <br />
                たくさん練習してレベルアップを目指そう！
              </p>
            )}
          </div>
        )}

        {dexJustCompleted && (
          <div className="dex-complete-banner">
            🎉 図鑑コンプリート！ 🎉
            <br />5教科のまなびモンスターが全員そろったよ！
          </div>
        )}

        <button className="btn btn-primary btn-big" onClick={onBackHome}>
          🏠 ホームへもどる
        </button>
      </div>
    </div>
  );
}
