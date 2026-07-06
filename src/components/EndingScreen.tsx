import { useState } from 'react';
import { publicAssetUrl } from '../utils/assets';
import { IconLabel, UI_ICON_ASSETS } from './UiIcon';

interface Props {
  playerName: string;
  onBack: () => void;
}

const BANNER_URL = publicAssetUrl('assets/goal/clear_congratulations_banner_512.png');
const TEMPLE_OPEN_URL = publicAssetUrl('assets/goal/goal_manabi_temple_open_512.png');
const BADGE_COMPLETE_URL = publicAssetUrl('assets/goal/badge_complete_5subjects_512.png');
const KEY_URL = publicAssetUrl('assets/goal/goal_key_of_learning_512.png');
const LIGHT_URL = publicAssetUrl('assets/goal/goal_light_effect_512.png');

/** 画像（読めなければ絵文字にフォールバック） */
function GoalImage({
  src,
  alt,
  className,
  fallback,
}: {
  src?: string;
  alt: string;
  className: string;
  fallback: string;
}) {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <img
        className={className}
        src={src}
        alt={alt}
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span className={`${className} goal-emoji-fallback`} aria-hidden="true">
      {fallback}
    </span>
  );
}

/** 最終クリア（エンディング）画面。5教科バッジをすべて集めて神殿を開いたお祝い。 */
export function EndingScreen({ playerName, onBack }: Props) {
  return (
    <div className="screen ending-screen">
      {/* 神殿と光 */}
      <div className="ending-hero">
        {LIGHT_URL && <img className="ending-light" src={LIGHT_URL} alt="" aria-hidden="true" />}
        <GoalImage
          src={TEMPLE_OPEN_URL}
          alt="ひらいたまなびの神殿"
          className="ending-temple"
          fallback="⛩️"
        />
      </div>

      {/* お祝いバナー */}
      <div className="ending-banner">
        {BANNER_URL && (
          <img className="ending-banner-bg" src={BANNER_URL} alt="" aria-hidden="true" />
        )}
        <span className="ending-banner-text">🎉 おめでとう！ 🎉</span>
      </div>

      {/* 5教科コンプリートバッジ と 学びのカギ */}
      <div className="ending-badges">
        <GoalImage
          src={BADGE_COMPLETE_URL}
          alt="5教科コンプリートバッジ"
          className="ending-badge"
          fallback="🏅"
        />
        <GoalImage
          src={KEY_URL}
          alt="学びのカギ"
          className="ending-key"
          fallback="🔑"
        />
      </div>

      <div className="card ending-message-card">
        <p className="ending-message">
          {playerName} さん、さいごまで がんばったね！
          <br />
          5つの きょうかを ぜんぶ クリアして、
          <br />
          まなびのしんでんが ひらいたよ！
        </p>
        <p className="ending-message-strong">🌟 きみは まなびマスター！ 🌟</p>
      </div>

      <div className="home-buttons">
        <button
          className="btn btn-plain btn-small"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <IconLabel
            src={UI_ICON_ASSETS.retry}
            alt="リトライ"
            iconClassName="button-inline-icon"
            fallback="🔁"
          >
            もういちど見る
          </IconLabel>
        </button>
        <button className="btn btn-primary btn-big" onClick={onBack}>
          🏝️ まなび島にもどる
        </button>
      </div>
    </div>
  );
}
