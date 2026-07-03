import { useMemo, useState } from 'react';
import type { Quest, Question } from '../types/game';
import { findQuestion } from '../data/questions';
import { shuffledIndices } from '../utils/shuffle';
import { QuizCard } from './QuizCard';

interface Props {
  quest: Quest;
  onFinish: (correctCount: number, totalCount: number, earnedCoins: number, earnedExp: number) => void;
  onBack: () => void;
}

/** プールからランダムな順で count 問えらぶ（count 省略時は全問） */
function drawQuestions(pool: Question[], count?: number): Question[] {
  const order = shuffledIndices(pool.length);
  const drawCount = Math.min(count ?? pool.length, pool.length);
  return order.slice(0, drawCount).map((i) => pool[i]);
}

export function QuestScreen({ quest, onFinish, onBack }: Props) {
  const pool = useMemo<Question[]>(
    () =>
      quest.questionIds
        .map((id) => findQuestion(id))
        .filter((q): q is Question => q !== undefined),
    [quest],
  );

  const [phase, setPhase] = useState<'intro' | 'quiz'>('intro');
  // クエスト開始のたびにシャッフルして出題順を決める
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [earnedExp, setEarnedExp] = useState(0);

  const startQuiz = () => {
    setQuizQuestions(drawQuestions(pool, quest.questionCount));
    setCurrentIndex(0);
    setCorrectCount(0);
    setEarnedCoins(0);
    setEarnedExp(0);
    setPhase('quiz');
  };

  const handleNext = (wasCorrect: boolean) => {
    const question = quizQuestions[currentIndex];
    const nextCorrect = correctCount + (wasCorrect ? 1 : 0);
    const nextCoins = earnedCoins + (wasCorrect ? question.rewardCoins : 0);
    const nextExp = earnedExp + (wasCorrect ? question.rewardExp : 0);

    if (currentIndex + 1 >= quizQuestions.length) {
      onFinish(nextCorrect, quizQuestions.length, nextCoins, nextExp);
      return;
    }
    setCorrectCount(nextCorrect);
    setEarnedCoins(nextCoins);
    setEarnedExp(nextExp);
    setCurrentIndex(currentIndex + 1);
  };

  if (phase === 'intro') {
    const count = Math.min(quest.questionCount ?? pool.length, pool.length);
    return (
      <div className="screen quest-screen">
        <div className="card quest-intro-card">
          <div className="quest-emoji">{quest.emoji ?? '🗝️💎'}</div>
          <h2 className="quest-title">{quest.name}</h2>
          <p className="quest-description">
            {quest.description.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <p className="quest-count">もんだいすう：{count}問</p>
          <button className="btn btn-primary btn-big" onClick={startQuiz}>
            ⚔️ クエストスタート！
          </button>
          <button className="btn btn-plain btn-small" onClick={onBack}>
            ↩️ もどる
          </button>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentIndex];
  return (
    <div className="screen quest-screen">
      <QuizCard
        key={question.id}
        question={question}
        questionNumber={currentIndex + 1}
        totalCount={quizQuestions.length}
        isLast={currentIndex + 1 >= quizQuestions.length}
        onNext={handleNext}
      />
    </div>
  );
}
