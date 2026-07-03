import { useState } from 'react';
import type { Question } from '../types/game';
import { shuffledIndices } from '../utils/shuffle';

interface Props {
  question: Question;
  questionNumber: number;
  totalCount: number;
  isLast: boolean;
  onNext: (wasCorrect: boolean) => void;
}

export function QuizCard({ question, questionNumber, totalCount, isLast, onNext }: Props) {
  // 表示順をシャッフル（マウントごとに変わるので、やり直すたびに順番が変わる）
  const [choiceOrder] = useState<number[]>(() => shuffledIndices(question.choices.length));
  // 選ばれた選択肢は「元データでの番号」で持つので、正解判定はシャッフルの影響を受けない
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const answered = selectedIndex !== null;
  const wasCorrect = selectedIndex === question.answerIndex;

  const choiceClass = (originalIndex: number): string => {
    if (!answered) return 'choice-btn';
    if (originalIndex === question.answerIndex) return 'choice-btn choice-correct';
    if (originalIndex === selectedIndex) return 'choice-btn choice-wrong';
    return 'choice-btn choice-faded';
  };

  return (
    <div className="card quiz-card">
      <p className="quiz-progress">
        もんだい {questionNumber} / {totalCount}
      </p>
      <p className="quiz-unit">📚 {question.unit}</p>
      <p className="quiz-text">{question.text}</p>

      <div className="choice-grid">
        {choiceOrder.map((originalIndex) => (
          <button
            key={originalIndex}
            className={choiceClass(originalIndex)}
            onClick={() => !answered && setSelectedIndex(originalIndex)}
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
          <button className="btn btn-primary btn-big" onClick={() => onNext(wasCorrect)}>
            {isLast ? '🏆 けっかを見る' : '➡️ つぎへ'}
          </button>
        </div>
      )}
    </div>
  );
}
