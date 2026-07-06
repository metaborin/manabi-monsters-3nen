import { useState } from 'react';
import type { Monster, Quest } from '../types/game';
import { publicAssetUrl } from '../utils/assets';

/**
 * クエスト選択カードの見た目パーツ（v0.8.7）。
 * すべて「画像 ＋ 画像が読めない場合の CSS/絵文字フォールバック」で作り、
 * 素材が無くても表示が壊れないようにしている。文字は必ず HTML/CSS 側で出す。
 */

export type QuestState = 'new' | 'recommended' | 'cleared';

const BADGE_BG: Record<QuestState, string> = {
  new: 'assets/quest-ui/badges/badge_new_bg.png',
  recommended: 'assets/quest-ui/badges/badge_recommended_bg.png',
  cleared: 'assets/quest-ui/badges/badge_clear_bg.png',
};

const STATE_ICON: Record<QuestState, string> = {
  new: 'assets/quest-ui/icons/icon_new_state.png',
  recommended: 'assets/quest-ui/icons/icon_recommended_state.png',
  cleared: 'assets/quest-ui/icons/icon_clear_state.png',
};

const STATE_LABEL: Record<QuestState, string> = {
  new: 'NEW',
  recommended: 'おすすめ',
  cleared: 'クリア済み',
};

const STAGE_PLATE = 'assets/quest-ui/ui/stage_number_plate.png';
const COIN_PLATE = 'assets/quest-ui/ui/coin_reward_plate.png';
const COIN_ICON = 'assets/quest-ui/icons/reward_coin_icon.png';
const FRIEND_FRAME = 'assets/quest-ui/ui/friend_reward_frame.png';
const FRIEND_ICON = 'assets/quest-ui/icons/reward_friend_monster_icon.png';

/** 状態バッジ（NEW / おすすめ / クリア済み）。バッジ背景画像＋小型状態アイコン＋文字。 */
export function QuestStateBadge({ state }: { state: QuestState }) {
  const [bgFailed, setBgFailed] = useState(false);
  const [iconFailed, setIconFailed] = useState(false);
  const bg = publicAssetUrl(BADGE_BG[state]);
  const icon = publicAssetUrl(STATE_ICON[state]);

  return (
    <span
      className={`quest-state-badge quest-state-${state} ${
        bgFailed || !bg ? 'quest-state-badge-plain' : ''
      }`}
    >
      {bg && !bgFailed && (
        <img
          className="quest-state-badge-bg"
          src={bg}
          alt=""
          aria-hidden="true"
          decoding="async"
          onError={() => setBgFailed(true)}
        />
      )}
      <span className="quest-state-badge-inner">
        {icon && !iconFailed && (
          <img
            className="quest-state-badge-icon"
            src={icon}
            alt=""
            aria-hidden="true"
            decoding="async"
            onError={() => setIconFailed(true)}
          />
        )}
        <span className="quest-state-badge-text">{STATE_LABEL[state]}</span>
      </span>
    </span>
  );
}

/** ステージ番号プレート。 */
export function QuestStagePlate({ index }: { index: number }) {
  const [failed, setFailed] = useState(false);
  const plate = publicAssetUrl(STAGE_PLATE);

  return (
    <div className={`quest-stage-plate ${failed || !plate ? 'quest-stage-plate-plain' : ''}`}>
      {plate && !failed && (
        <img
          className="quest-stage-plate-bg"
          src={plate}
          alt=""
          aria-hidden="true"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      <span className="quest-stage-plate-text">
        ステージ <strong>{index}</strong>
      </span>
    </div>
  );
}

/** 報酬コインプレート。コイン計算結果（coins）を受け取って表示するだけ。 */
export function QuestCoinReward({ coins, cleared }: { coins: number; cleared: boolean }) {
  const [plateFailed, setPlateFailed] = useState(false);
  const [iconFailed, setIconFailed] = useState(false);
  const plate = publicAssetUrl(COIN_PLATE);
  const coin = publicAssetUrl(COIN_ICON);

  return (
    <div className={`quest-coin-reward ${plateFailed || !plate ? 'quest-coin-reward-plain' : ''}`}>
      {plate && !plateFailed && (
        <img
          className="quest-coin-reward-bg"
          src={plate}
          alt=""
          aria-hidden="true"
          decoding="async"
          onError={() => setPlateFailed(true)}
        />
      )}
      <div className="quest-coin-reward-inner">
        {coin && !iconFailed ? (
          <img
            className="quest-coin-reward-icon"
            src={coin}
            alt=""
            aria-hidden="true"
            decoding="async"
            onError={() => setIconFailed(true)}
          />
        ) : (
          <span className="quest-coin-reward-emoji" aria-hidden="true">
            🪙
          </span>
        )}
        <span className="quest-coin-reward-text">
          <span className="quest-reward-caption">ほうしゅう</span>
          {cleared ? (
            <span className="quest-coin-reward-value is-cleared">受取ずみ</span>
          ) : (
            <span className="quest-coin-reward-value">
              {coins}
              <span className="quest-coin-unit">コイン</span>
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

/** 仲間になるモンスター報酬。円形フレーム＋モンスター画像（無ければフレンドアイコン→絵文字）。 */
export function QuestFriendReward({ monster, cleared }: { monster: Monster; cleared: boolean }) {
  const [monFailed, setMonFailed] = useState(false);
  const [friendIconFailed, setFriendIconFailed] = useState(false);
  const [frameFailed, setFrameFailed] = useState(false);
  const monUrl = publicAssetUrl(monster.image);
  const friendIcon = publicAssetUrl(FRIEND_ICON);
  const frame = publicAssetUrl(FRIEND_FRAME);

  // モンスター画像 → フレンドアイコン → 絵文字 の順にフォールバック
  let inner;
  if (monUrl && !monFailed) {
    inner = (
      <img
        className="quest-friend-monster-image"
        src={monUrl}
        alt={monster.name}
        loading="lazy"
        decoding="async"
        onError={() => setMonFailed(true)}
      />
    );
  } else if (friendIcon && !friendIconFailed) {
    inner = (
      <img
        className="quest-friend-monster-image"
        src={friendIcon}
        alt={monster.name}
        loading="lazy"
        decoding="async"
        onError={() => setFriendIconFailed(true)}
      />
    );
  } else {
    inner = (
      <span className="quest-friend-monster-emoji" aria-hidden="true">
        {monster.emoji}
      </span>
    );
  }

  return (
    <div className="quest-friend-reward">
      <div className={`quest-friend-frame ${frameFailed || !frame ? 'quest-friend-frame-plain' : ''}`}>
        {inner}
        {frame && !frameFailed && (
          <img
            className="quest-friend-frame-img"
            src={frame}
            alt=""
            aria-hidden="true"
            decoding="async"
            onError={() => setFrameFailed(true)}
          />
        )}
      </div>
      <div className="quest-friend-text">
        <span className="quest-reward-caption">なかま</span>
        <span className="quest-friend-name">{monster.name}</span>
        <span className={`quest-friend-state ${cleared ? 'is-cleared' : ''}`}>
          {cleared ? '✅ なかま' : 'クリアで なかま'}
        </span>
      </div>
    </div>
  );
}

/** 教科ボスクエストのカード（v0.9.3）。ロック／解放／クリア済みで表示を変える。 */
export function BossQuestCard({
  quest,
  subjectLabel,
  cleared,
  unlocked,
  remaining,
  onSelect,
}: {
  quest: Quest;
  /** 教科名（例：国語） */
  subjectLabel: string;
  cleared: boolean;
  unlocked: boolean;
  /** あと何個 通常クエストをクリアすると解放されるか */
  remaining: number;
  onSelect: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const bossUrl = publicAssetUrl(quest.bossImage);
  const count = quest.questionCount ?? quest.questionIds.length;
  const cardState = cleared ? 'boss-card-cleared' : unlocked ? 'boss-card-open' : 'boss-card-locked';

  return (
    <div className={`card boss-card ${cardState}`}>
      <span className="boss-card-tag">👑 ボスしれん</span>
      <div className="boss-card-media">
        {bossUrl && !imgFailed ? (
          <img
            className={`boss-card-img ${unlocked ? '' : 'boss-card-img-locked'}`}
            src={bossUrl}
            alt={quest.name}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="boss-card-emoji" aria-hidden="true">
            👑
          </span>
        )}
        {!unlocked && (
          <span className="boss-card-lock" aria-hidden="true">
            🔒
          </span>
        )}
      </div>
      <h3 className="boss-card-name">{quest.name}</h3>
      <div className="boss-card-info">
        <span className="boss-card-chip">📚 {count}問</span>
        <span className="boss-card-chip">❤️ ハート3つ</span>
        <span className="boss-card-chip">🏅 {subjectLabel}バッジ</span>
      </div>

      {cleared ? (
        <>
          <div className="boss-card-status boss-card-status-cleared">
            ✅ {subjectLabel}バッジ かくとくずみ！
          </div>
          <button className="btn btn-primary btn-big" onClick={onSelect}>
            🔁 もういちど
          </button>
        </>
      ) : unlocked ? (
        <button className="btn btn-primary btn-big" onClick={onSelect}>
          ⚔️ ボスにちょうせんする
        </button>
      ) : (
        <div className="boss-card-status boss-card-status-locked">
          🔒 あと {remaining}こクリアで ボスにちょうせん！
        </div>
      )}
    </div>
  );
}
