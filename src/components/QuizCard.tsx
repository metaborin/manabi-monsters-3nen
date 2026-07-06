import { useState } from 'react';
import type { Question } from '../types/game';
import { shuffledIndices } from '../utils/shuffle';
import { publicAssetUrl } from '../utils/assets';

const SKILL_HINT_URL = publicAssetUrl('assets/skills/skill_hint_icon_512.png');

interface Props {
  question: Question;
  questionNumber: number;
  totalCount: number;
  isLast: boolean;
  onNext: (wasCorrect: boolean) => void;
  /** 表示するヒント文（親で共通フォールバック済み） */
  hint: string;
  /** ヒントキャンディの所持数 */
  hintCount: number;
  /** ヒントキャンディを1つつかう（親で所持数を減らす） */
  onUseHint: () => void;
  /** やりなおしチケットの所持数 */
  retryCount: number;
  /** やりなおしチケットを1つつかう（親で所持数を減らす＆ハートをもどす） */
  onUseRetry: () => void;
  /** まちがえた選択肢を選んだとき（親でハートを1つ減らす）。v0.9.1 */
  onWrongAnswer: () => void;
  /** 相棒スキル（ヒント）がまだつかえるか（v0.9.2） */
  skillAvailable: boolean;
  /** 相棒スキルをつかう（親で「つかった」状態にする） */
  onUsePartnerSkill: () => void;
}

export function QuizCard({
  question,
  questionNumber,
  totalCount,
  isLast,
  onNext,
  hint,
  hintCount,
  onUseHint,
  retryCount,
  onUseRetry,
  onWrongAnswer,
  skillAvailable,
  onUsePartnerSkill,
}: Props) {
  // 表示順をシャッフル（マウントごとに変わるので、やり直すたびに順番が変わる）
  const [choiceOrder] = useState<number[]>(() => shuffledIndices(question.choices.length));
  // 選ばれた選択肢は「元データでの番号」で持つので、正解判定はシャッフルの影響を受けない
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // ヒントキャンディまたは相棒スキルでヒントを表示したか
  const [hintShown, setHintShown] = useState(false);
  // 相棒スキルのアイコン画像が読めなかったか
  const [skillIconFailed, setSkillIconFailed] = useState(false);
  const answered = selectedIndex !== null;
  const wasCorrect = selectedIndex === question.answerIndex;

  const choiceClass = (originalIndex: number): string => {
    if (!answered) return 'choice-btn';
    if (originalIndex === question.answerIndex) return 'choice-btn choice-correct';
    if (originalIndex === selectedIndex) return 'choice-btn choice-wrong';
    return 'choice-btn choice-faded';
  };

  // 選択肢を選ぶ。まちがいならハートを1つ減らす（親に通知）
  const handleSelect = (originalIndex: number) => {
    if (answered) return;
    setSelectedIndex(originalIndex);
    if (originalIndex !== question.answerIndex) onWrongAnswer();
  };

  const handleUseHint = () => {
    onUseHint();
    setHintShown(true);
  };

  // 相棒スキル：ヒントキャンディを消費せずにヒントを見せる（1クエストに1回）
  const handleUsePartnerSkill = () => {
    onUsePartnerSkill();
    setHintShown(true);
  };

  // やりなおしチケット：同じ問題をもう一度こたえられるようにする
  const handleUseRetry = () => {
    onUseRetry();
    setSelectedIndex(null);
  };

  return (
    <div className="card quiz-card">
      <p className="quiz-progress">
        もんだい {questionNumber} / {totalCount}
      </p>
      <p className="quiz-unit">📚 {question.unit}</p>
      <p className="quiz-text">{question.text}</p>

      {/* 相棒スキル：ヒント（ヒントキャンディとは別枠で、1クエストに1回） */}
      {!answered && !hintShown && skillAvailable && (
        <button className="btn quiz-skill-btn" onClick={handleUsePartnerSkill}>
          {SKILL_HINT_URL && !skillIconFailed && (
            <img
              className="quiz-skill-icon"
              src={SKILL_HINT_URL}
              alt=""
              aria-hidden="true"
              decoding="async"
              onError={() => setSkillIconFailed(true)}
            />
          )}
          相棒スキル：ヒント
        </button>
      )}

      {/* ヒントキャンディ */}
      {!answered && !hintShown && hintCount > 0 && (
        <button className="btn quiz-hint-btn" onClick={handleUseHint}>
          🍬 ヒントをみる（のこり {hintCount}）
        </button>
      )}
      {hintShown && (
        <div className="quiz-hint">
          <span className="quiz-hint-label">💡 ヒント</span>
          <span className="quiz-hint-text">{hint}</span>
        </div>
      )}

      <div className="choice-grid">
        {choiceOrder.map((originalIndex) => (
          <button
            key={originalIndex}
            className={choiceClass(originalIndex)}
            onClick={() => handleSelect(originalIndex)}
            disabled={answered}
          >
            {question.choices[originalIndex]}
          </button>
        ))}
      </div>

      {answered && (
        <div className={`feedback ${wasCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
          <p className="feedback-title">
            {wasCorrect ? '🎉 ピンポン！せいかい！' : '😊 ざんねん！つぎはできるよ！'}
          </p>
          <p className="feedback-explanation">{question.explanation}</p>

          {/* まちがえたとき：ハートが1つへったことをやさしく伝える */}
          {!wasCorrect && (
            <p className="feedback-heart-loss">
              💔 ハートが1つへったよ。
              {retryCount > 0 ? 'やりなおしチケットをつかうと ハートがもどるよ。' : 'つぎもがんばろう！'}
            </p>
          )}

          {/* まちがえたとき、やりなおしチケットがあれば1回やりなおせる */}
          {!wasCorrect && retryCount > 0 && (
            <button className="btn quiz-retry-btn" onClick={handleUseRetry}>
              🎫 やりなおしチケットをつかう（のこり {retryCount}）
            </button>
          )}

          <button className="btn btn-primary btn-big" onClick={() => onNext(wasCorrect)}>
            {isLast ? '🏆 けっかを見る' : '➡️ つぎへ'}
          </button>
        </div>
      )}
    </div>
  );
}
