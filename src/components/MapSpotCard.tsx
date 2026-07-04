interface Props {
  emoji: string;
  name: string;
  description: string;
  /** 見た目のアクセント色 */
  accent: 'shop' | 'dex' | 'island';
  onSelect: () => void;
}

/** まなび島の「しせつ」（ショップ・図鑑・コレクション）へ行くカード。
 *  エリアカードと同じ見た目にそろえて、島の行き先として自然に見せる。 */
export function MapSpotCard({ emoji, name, description, accent, onSelect }: Props) {
  return (
    <button className={`card area-card area-open map-spot map-spot-${accent}`} onClick={onSelect}>
      <span className="area-card-media">
        <span className="area-emoji">{emoji}</span>
      </span>
      <span className="area-name">{name}</span>
      <span className="area-description">{description}</span>
      <span className="area-badge map-spot-badge">GO! →</span>
    </button>
  );
}
