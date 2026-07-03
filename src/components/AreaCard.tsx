import type { Area } from '../types/game';
import { SUBJECT_LABELS } from '../types/game';

interface Props {
  area: Area;
  onSelect: (area: Area) => void;
}

export function AreaCard({ area, onSelect }: Props) {
  return (
    <button
      className={`card area-card ${area.available ? 'area-open' : 'area-locked'}`}
      onClick={() => area.available && onSelect(area)}
      disabled={!area.available}
    >
      <span className="area-emoji">{area.emoji}</span>
      <span className="area-name">{area.name}</span>
      <span className="area-subject">{SUBJECT_LABELS[area.subject]}</span>
      <span className="area-description">{area.description}</span>
      {area.available ? (
        <span className="area-badge area-badge-open">あそべるよ！</span>
      ) : (
        <span className="area-badge area-badge-locked">じゅんびちゅう</span>
      )}
    </button>
  );
}
