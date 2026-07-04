import { useState } from 'react';
import type { Monster } from '../types/game';
import { publicAssetUrl } from '../utils/assets';

interface Props {
  monster: Monster;
  className: string;
  fallbackClassName: string;
}

export function MonsterImage({ monster, className, fallbackClassName }: Props) {
  const [failed, setFailed] = useState(false);
  const imageUrl = publicAssetUrl(monster.image);

  if (!imageUrl || failed) {
    return <span className={fallbackClassName}>{monster.emoji}</span>;
  }

  return (
    <img
      src={imageUrl}
      alt={monster.name}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
