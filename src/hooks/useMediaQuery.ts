import { useEffect, useState } from 'react';

/**
 * メディアクエリの一致状態を返す。
 * 例: const isMobile = useMediaQuery('(max-width: 600px)');
 * 初回レンダー時から正しい値を返すので、表示のちらつきが起きない。
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = () =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia(query);
    const handleChange = () => setMatches(mql.matches);
    // マウント時にも最新の値へ合わせる（SSR・初期化ずれ対策）
    handleChange();
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
