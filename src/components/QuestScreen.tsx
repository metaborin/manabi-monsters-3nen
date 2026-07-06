import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Area, Monster, Quest, Question } from '../types/game';
import { findQuestion } from '../data/questions';
import { findMonster } from '../data/monsters';
import {
  HINT_CANDY_ID,
  RETRY_TICKET_ID,
  COIN_STAR_ID,
  HEART_COOKIE_ID,
  COIN_STAR_BONUS,
  MAX_HEARTS,
  PARTNER_SUBJECT_BONUS,
  DEFAULT_HINT,
} from '../data/helpItems';
import { shuffledIndices } from '../utils/shuffle';
import { publicAssetUrl } from '../utils/assets';
import { QuizCard } from './QuizCard';
import { MonsterImage } from './MonsterImage';

interface Props {
  area: Area;
  quest: Quest;
  /** つかうアイテムの所持数（アイテムID→個数） */
  itemCounts: Record<string, number>;
  /** すでに仲間になっているモンスターのID（相棒えらび用）。v0.9.2 */
  ownedMonsterIds: string[];
  /** つかうアイテムを1つ消費する */
  onConsumeItem: (itemId: string) => void;
  onFinish: (
    correctCount: number,
    totalCount: number,
    earnedCoins: number,
    earnedExp: number,
    coinBonus: number,
    partnerBonus: number,
  ) => void;
  onBack: () => void;
}

const HEART_FULL_URL = publicAssetUrl('assets/ui/ui_heart_full_512.png');
const HEART_EMPTY_URL = publicAssetUrl('assets/ui/ui_heart_empty_512.png');
const FAIL_ICON_URL = publicAssetUrl('assets/ui/ui_failure_icon_512.png');

/** ハート1つ（画像→絵文字フォールバック） */
function HeartIcon({ full }: { full: boolean }) {
  const [failed, setFailed] = useState(false);
  const url = full ? HEART_FULL_URL : HEART_EMPTY_URL;
  if (url && !failed) {
    return (
      <img
        className="quest-heart"
        src={url}
        alt=""
        aria-hidden="true"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span className="quest-heart quest-heart-emoji" aria-hidden="true">
      {full ? '❤️' : '🤍'}
    </span>
  );
}

/** 失敗画面のアイコン（画像→絵文字フォールバック） */
function FailIcon() {
  const [failed, setFailed] = useState(false);
  if (FAIL_ICON_URL && !failed) {
    return (
      <img
        className="quest-fail-icon"
        src={FAIL_ICON_URL}
        alt=""
        aria-hidden="true"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span className="quest-fail-icon quest-fail-icon-emoji" aria-hidden="true">
      🌱
    </span>
  );
}

/** プールからランダムな順で count 問えらぶ（count 省略時は全問） */
function drawQuestions(pool: Question[], count?: number): Question[] {
  const order = shuffledIndices(pool.length);
  const drawCount = Math.min(count ?? pool.length, pool.length);
  return order.slice(0, drawCount).map((i) => pool[i]);
}

export function QuestScreen({
  area,
  quest,
  itemCounts,
  ownedMonsterIds,
  onConsumeItem,
  onFinish,
  onBack,
}: Props) {
  const pool = useMemo<Question[]>(
    () =>
      quest.questionIds
        .map((id) => findQuestion(id))
        .filter((q): q is Question => q !== undefined),
    [quest],
  );

  // 仲間になっているモンスター（相棒の候補）
  const ownedMonsters = useMemo<Monster[]>(
    () =>
      ownedMonsterIds
        .map((id) => findMonster(id))
        .filter((m): m is Monster => m !== undefined),
    [ownedMonsterIds],
  );

  const [phase, setPhase] = useState<'intro' | 'quiz' | 'failed'>('intro');
  // クエスト開始のたびにシャッフルして出題順を決める
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [earnedExp, setEarnedExp] = useState(0);
  // コインアップスターをこのクエストでつかっているか
  const [coinBoost, setCoinBoost] = useState(false);
  // 残りハート（このクエストだけの一時状態。保存はしない）
  const [hearts, setHearts] = useState(MAX_HEARTS);
  // 相棒モンスター（このクエストだけの一時状態。保存はしない）
  const [partnerId, setPartnerId] = useState<string | null>(null);
  // 相棒スキル（ヒント）をこのクエストでつかったか
  const [skillUsed, setSkillUsed] = useState(false);
  const backgroundImageUrl = publicAssetUrl(area.backgroundImage);
  const backgroundStyle = backgroundImageUrl
    ? ({ '--area-bg-image': `url("${backgroundImageUrl}")` } as CSSProperties)
    : undefined;

  const hintCount = itemCounts[HINT_CANDY_ID] ?? 0;
  const retryCount = itemCounts[RETRY_TICKET_ID] ?? 0;
  const coinStarCount = itemCounts[COIN_STAR_ID] ?? 0;
  const heartCookieCount = itemCounts[HEART_COOKIE_ID] ?? 0;
  const hasAnyHelp =
    hintCount > 0 || retryCount > 0 || coinStarCount > 0 || heartCookieCount > 0 || coinBoost;

  const partner = partnerId ? findMonster(partnerId) ?? null : null;
  // 相棒の教科と、このクエストの教科（エリアの教科）が同じか
  const subjectMatch = partner ? partner.subject === area.subject : false;
  const partnerBonus = subjectMatch ? PARTNER_SUBJECT_BONUS : 0;

  const startQuiz = () => {
    setQuizQuestions(drawQuestions(pool, quest.questionCount));
    setCurrentIndex(0);
    setCorrectCount(0);
    setEarnedCoins(0);
    setEarnedExp(0);
    setHearts(MAX_HEARTS);
    setSkillUsed(false);
    setPhase('quiz');
  };

  // 失敗後に、同じクエストをもう一度あそぶ
  const restartQuest = () => {
    setCoinBoost(false);
    setHearts(MAX_HEARTS);
    setPhase('intro');
  };

  const useCoinStar = () => {
    if (coinStarCount <= 0 || coinBoost) return;
    onConsumeItem(COIN_STAR_ID);
    setCoinBoost(true);
  };

  // ハートクッキー：ハートを1つ回復（最大を超えない）
  const useHeartCookie = () => {
    if (heartCookieCount <= 0 || hearts >= MAX_HEARTS) return;
    onConsumeItem(HEART_COOKIE_ID);
    setHearts((h) => Math.min(MAX_HEARTS, h + 1));
  };

  // まちがえたとき：ハートを1つ減らす
  const loseHeart = () => setHearts((h) => Math.max(0, h - 1));
  // やりなおしチケットをつかったとき：そのまちがい分のハートをもどす
  const useRetryTicket = () => {
    onConsumeItem(RETRY_TICKET_ID);
    setHearts((h) => Math.min(MAX_HEARTS, h + 1));
  };

  const handleNext = (wasCorrect: boolean) => {
    // ハートが0なら、このクエストは失敗（クリア扱いにしない）
    if (hearts <= 0) {
      setPhase('failed');
      return;
    }

    const question = quizQuestions[currentIndex];
    const nextCorrect = correctCount + (wasCorrect ? 1 : 0);
    const nextCoins = earnedCoins + (wasCorrect ? question.rewardCoins : 0);
    const nextExp = earnedExp + (wasCorrect ? question.rewardExp : 0);

    if (currentIndex + 1 >= quizQuestions.length) {
      // クリア時だけ、コインアップと相棒ボーナスを渡す（失敗時はここに来ない）
      onFinish(
        nextCorrect,
        quizQuestions.length,
        nextCoins,
        nextExp,
        coinBoost ? COIN_STAR_BONUS : 0,
        partnerBonus,
      );
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
      <div className="screen quest-screen area-background-screen" style={backgroundStyle}>
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
          <p className="quest-heart-intro">
            ❤️ ハートは {MAX_HEARTS}つ。まちがえると1つへるよ。0になるまでがんばろう！
          </p>

          {/* 相棒をえらぶ */}
          <div className="quest-partner-panel">
            <p className="quest-partner-title">🤝 いっしょに行くモンスターをえらぼう</p>
            {ownedMonsters.length > 0 ? (
              <>
                <div className="quest-partner-choices">
                  <button
                    type="button"
                    className={`quest-partner-choice ${partnerId === null ? 'is-selected' : ''}`}
                    onClick={() => setPartnerId(null)}
                  >
                    <span className="quest-partner-none" aria-hidden="true">
                      🚶
                    </span>
                    <span className="quest-partner-choice-name">相棒なし</span>
                  </button>
                  {ownedMonsters.map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      className={`quest-partner-choice ${partnerId === m.id ? 'is-selected' : ''}`}
                      onClick={() => setPartnerId(m.id)}
                    >
                      {m.subject === area.subject && (
                        <span className="quest-partner-match-badge">きょうか◎</span>
                      )}
                      <MonsterImage
                        monster={m}
                        className="quest-partner-choice-img"
                        fallbackClassName="quest-partner-choice-emoji"
                      />
                      <span className="quest-partner-choice-name">{m.name}</span>
                    </button>
                  ))}
                </div>
                {partner && (
                  <p className="quest-partner-selected">
                    ✨ {partner.name}と いっしょに行く！
                    {subjectMatch && (
                      <span className="quest-partner-bonus-note">
                        きょうかが同じ！クリアで +{PARTNER_SUBJECT_BONUS}コイン
                      </span>
                    )}
                  </p>
                )}
              </>
            ) : (
              <p className="quest-partner-empty">
                まだ仲間がいないよ。クエストをクリアすると仲間がふえるよ！
              </p>
            )}
          </div>

          {/* つかうアイテム（たすけアイテム） */}
          <div className="quest-help-panel">
            <p className="quest-help-title">🎒 つかうアイテム</p>
            {hasAnyHelp ? (
              <div className="quest-help-list">
                {coinBoost ? (
                  <div className="quest-help-active">
                    ⭐ コインアップちゅう！クリアで +{COIN_STAR_BONUS}コイン
                  </div>
                ) : (
                  coinStarCount > 0 && (
                    <button className="btn quest-help-use-btn" onClick={useCoinStar}>
                      ⭐ コインアップスターをつかう（のこり {coinStarCount}）
                    </button>
                  )
                )}
                {hintCount > 0 && (
                  <div className="quest-help-chip">
                    🍬 ヒントキャンディ ×{hintCount}
                    <span className="quest-help-note">問題でつかえるよ</span>
                  </div>
                )}
                {retryCount > 0 && (
                  <div className="quest-help-chip">
                    🎫 やりなおしチケット ×{retryCount}
                    <span className="quest-help-note">まちがえたときつかえるよ</span>
                  </div>
                )}
                {heartCookieCount > 0 && (
                  <div className="quest-help-chip">
                    🍪 ハートクッキー ×{heartCookieCount}
                    <span className="quest-help-note">ハートをかいふくできるよ</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="quest-help-empty">ショップで「たすけアイテム」を買うとつかえるよ。</p>
            )}
          </div>

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

  if (phase === 'failed') {
    return (
      <div className="screen quest-screen area-background-screen" style={backgroundStyle}>
        <div className="card quest-fail-card">
          <FailIcon />
          <h2 className="quest-fail-title">ハートがなくなっちゃった</h2>
          <p className="quest-fail-message">
            だいじょうぶ！もういちど ちょうせんしよう！
            <br />
            まちがえた問題は、かいせつを読むとつぎにいかせるよ。
          </p>
          <button className="btn btn-primary btn-big" onClick={restartQuest}>
            🔁 もういちど
          </button>
          <button className="btn btn-plain btn-small" onClick={onBack}>
            🗺️ エリアにもどる
          </button>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentIndex];
  return (
    <div className="screen quest-screen area-background-screen" style={backgroundStyle}>
      {/* ハートバー */}
      <div className="quest-heart-bar">
        <span className="quest-heart-label">ハート</span>
        <div className="quest-heart-icons">
          {Array.from({ length: MAX_HEARTS }).map((_, i) => (
            <HeartIcon key={i} full={i < hearts} />
          ))}
        </div>
        {hearts < MAX_HEARTS && heartCookieCount > 0 && (
          <button className="btn quest-heart-heal-btn" onClick={useHeartCookie}>
            🍪 ハートかいふく（のこり {heartCookieCount}）
          </button>
        )}
      </div>

      {/* 相棒モンスター */}
      {partner && (
        <div className="quest-partner-strip">
          <MonsterImage
            monster={partner}
            className="quest-partner-strip-img"
            fallbackClassName="quest-partner-strip-emoji"
          />
          <div className="quest-partner-strip-text">
            <span className="quest-partner-strip-name">あいぼう：{partner.name}</span>
            <span className="quest-partner-strip-skill">
              {skillUsed ? '✅ スキルをつかったよ' : '✨ 相棒スキル：ヒントがつかえるよ'}
            </span>
          </div>
        </div>
      )}

      <QuizCard
        key={question.id}
        question={question}
        questionNumber={currentIndex + 1}
        totalCount={quizQuestions.length}
        isLast={currentIndex + 1 >= quizQuestions.length}
        onNext={handleNext}
        hint={question.hint ?? DEFAULT_HINT}
        hintCount={hintCount}
        onUseHint={() => onConsumeItem(HINT_CANDY_ID)}
        retryCount={retryCount}
        onUseRetry={useRetryTicket}
        onWrongAnswer={loseHeart}
        skillAvailable={partner !== null && !skillUsed}
        onUsePartnerSkill={() => setSkillUsed(true)}
      />
      {coinBoost && (
        <div className="quest-boost-banner">⭐ コインアップちゅう！クリアで +{COIN_STAR_BONUS}コイン</div>
      )}
    </div>
  );
}
