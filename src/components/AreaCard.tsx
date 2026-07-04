import { useState } from 'react';
import type { Area } from '../types/game';
import { SUBJECT_LABELS } from '../types/game';
import { publicAssetUrl } from '../utils/assets';
import type { AreaProgress } from '../utils/progress';

interface Props {
  area: Area;
  onSelect: (area: Area) => void;
  /** 進行状況（省略時はバッジなし） */
  progress?: AreaProgress;
  /** 「次のおすすめ」エリアなら true */
  recommended?: boolean;
}

export function AreaCard({ area, onSelect, progress, recommended }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const cardImageUrl = publicAssetUrl(area.cardImage);
  const showImage = cardImageUrl && !imageFailed;

  return (
    <button
      className={`card area-card ${area.available ? 'area-open' : 'area-locked'} ${
        recommended ? 'area-recommended' : ''
      }`}
      onClick={() => area.available && onSelect(area)}
      disabled={!area.available}
    >
      {/* 右上のコーナーバッジ（おすすめ・NEW） */}
      {area.available && recommended ? (
        <span className="area-corner-badge area-corner-next">👉 つぎ</span>
      ) : area.available && progress?.isNew ? (
        <span className="area-corner-badge area-corner-new">NEW</span>
      ) : null}

      <span className="area-card-media">
        {showImage ? (
          <img
            src={cardImageUrl}
            alt={area.name}
            className="area-card-image"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="area-emoji">{area.emoji}</span>
        )}
      </span>
      <span className="area-name">{area.name}</span>
      <span className="area-subject">{SUBJECT_LABELS[area.subject]}</span>
      <span className="area-description">{area.description}</span>

      {!area.available ? (
        <span className="area-badge area-badge-locked">じゅんびちゅう</span>
      ) : progress ? (
        progress.allCleared ? (
          <span className="area-badge area-badge-cleared">✅ ぜんぶクリア</span>
        ) : progress.isNew ? (
          <span className="area-badge area-badge-open">✨ はじめよう</span>
        ) : (
          <span className="area-badge area-badge-progress">
            🔸 つづき {progress.cleared}/{progress.total}
          </span>
        )
      ) : (
        <span className="area-badge area-badge-open">あそべるよ！</span>
      )}
    </button>
  );
}
