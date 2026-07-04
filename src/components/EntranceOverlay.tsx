import { useEffect, useRef } from 'react';

interface Props {
  emoji: string;
  title: string;
  subtitle: string;
  /** 演出が終わったとき（自動 or タップ）に呼ばれる */
  onDone: () => void;
}

/** エリアや施設に入るときの短い入場演出。
 *  0.8秒で自動的に次へ進み、タップ／クリックでもすぐ進める。 */
export function EntranceOverlay({ emoji, title, subtitle, onDone }: Props) {
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    const timer = setTimeout(finish, 800);
    return () => clearTimeout(timer);
    // マウント時に1回だけタイマーをセットする
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="entrance-overlay" onClick={finish} role="button" aria-label={title}>
      <div className="entrance-card">
        <div className="entrance-emoji">{emoji}</div>
        <p className="entrance-title">{title}</p>
        <p className="entrance-subtitle">{subtitle}</p>
        <p className="entrance-skip">タップですすむ →</p>
      </div>
    </div>
  );
}
