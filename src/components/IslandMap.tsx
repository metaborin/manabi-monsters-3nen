import { useMemo, useState } from 'react';
import type { Area } from '../types/game';
import { AREAS } from '../data/areas';
import { publicAssetUrl } from '../utils/assets';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface Props {
  onSelectArea: (area: Area) => void;
  onOpenShop: () => void;
  onOpenDex: () => void;
  onOpenIsland: () => void;
}

/** 画面の中心座標（%）。left / top に入れて translate(-50%,-50%) で中央合わせ */
interface Point {
  x: number;
  y: number;
  /** ラベルをアイコンの上に逃がす場合 true */
  labelTop?: boolean;
}

interface FacilitySpot {
  id: string;
  /** マップ上に出す短いラベル（小3向け） */
  label: string;
  /** 施設アイコン画像のパス（public 配下） */
  icon: string;
  /** 画像が読めないときの絵文字フォールバック */
  emoji: string;
  /** 中央拠点（まなび島）だけ大きく表示する */
  isHome?: boolean;
  /** ボタン読み上げ用の説明 */
  ariaLabel: string;
  desktop: Point;
  mobile: Point;
  onSelect: () => void;
}

const MAP_BASE_URL = publicAssetUrl('assets/island-map/manabi_island_map_base.png');
const MAP_MOBILE_URL = publicAssetUrl('assets/island-map/manabi_island_map_mobile.png');

/** 教科エリアを subject で引く（見つからなければ undefined） */
function findArea(subject: Area['subject']): Area | undefined {
  return AREAS.find((area) => area.subject === subject);
}

/**
 * ホーム画面の「まなび島マップ」ビジュアル。
 * 島全体マップの上に9施設のアイコンを配置し、押すと既存の各画面へ遷移する。
 * スマホ幅では専用マップ画像と専用座標に切り替える。
 */
export function IslandMap({ onSelectArea, onOpenShop, onOpenDex, onOpenIsland }: Props) {
  // 600px以下はスマホ用マップ（縦長）＋専用座標を使う
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [mapFailed, setMapFailed] = useState(false);
  const [iconFailed, setIconFailed] = useState<Record<string, boolean>>({});

  const spots = useMemo<FacilitySpot[]>(() => {
    const kokugo = findArea('kokugo');
    const sansu = findArea('sansu');
    const rika = findArea('rika');
    const shakai = findArea('shakai');
    const eigo = findArea('eigo');

    return [
      {
        id: 'kokugo',
        label: '国語',
        icon: 'assets/facilities/facility_kokugo_forest.png',
        emoji: kokugo?.emoji ?? '🌳',
        ariaLabel: 'ことばの森（国語）へ行く',
        desktop: { x: 30, y: 30 },
        mobile: { x: 35, y: 26 },
        onSelect: () => kokugo && onSelectArea(kokugo),
      },
      {
        id: 'sansu',
        label: '算数',
        icon: 'assets/facilities/facility_sansu_cave.png',
        emoji: sansu?.emoji ?? '⛰️',
        ariaLabel: '計算のどうくつ（算数）へ行く',
        desktop: { x: 50, y: 19 },
        mobile: { x: 56, y: 26 },
        onSelect: () => sansu && onSelectArea(sansu),
      },
      {
        id: 'rika',
        label: '理科',
        icon: 'assets/facilities/facility_rika_lab.png',
        emoji: rika?.emoji ?? '🔬',
        ariaLabel: 'ふしぎ研究所（理科）へ行く',
        desktop: { x: 71, y: 28 },
        mobile: { x: 68, y: 36 },
        onSelect: () => rika && onSelectArea(rika),
      },
      {
        id: 'shakai',
        label: '社会',
        icon: 'assets/facilities/facility_shakai_town.png',
        emoji: shakai?.emoji ?? '🏙️',
        ariaLabel: 'わくわくタウン（社会）へ行く',
        desktop: { x: 25, y: 51 },
        mobile: { x: 72, y: 52 },
        onSelect: () => shakai && onSelectArea(shakai),
      },
      {
        id: 'eigo',
        label: '英語',
        icon: 'assets/facilities/facility_eigo_beach.png',
        emoji: eigo?.emoji ?? '🎈',
        ariaLabel: 'えいご広場（英語）へ行く',
        desktop: { x: 30, y: 76 },
        mobile: { x: 54, y: 80 },
        onSelect: () => eigo && onSelectArea(eigo),
      },
      {
        id: 'shop',
        label: 'ショップ',
        icon: 'assets/facilities/facility_shop.png',
        emoji: '🛍️',
        ariaLabel: 'まなびショップへ行く',
        desktop: { x: 72, y: 51 },
        // スマホは真下に図鑑が近いので、ラベルは上へ逃がす（上の国語までは十分離れている）
        mobile: { x: 25, y: 56, labelTop: true },
        onSelect: onOpenShop,
      },
      {
        id: 'zukan',
        label: '図鑑',
        icon: 'assets/facilities/facility_zukan.png',
        emoji: '📖',
        ariaLabel: 'モンスターずかんを見る',
        desktop: { x: 69, y: 75 },
        mobile: { x: 27, y: 71 },
        onSelect: onOpenDex,
      },
      {
        id: 'manabi',
        label: 'まなび島',
        icon: 'assets/facilities/facility_manabi_island.png',
        emoji: '🏝️',
        isHome: true,
        ariaLabel: 'まなび島の中心（いまいるところ）',
        desktop: { x: 50, y: 43 },
        mobile: { x: 50, y: 49 },
        // 中心拠点は「いまここ」。押したらマップの一番上へ戻す（安全な動き）
        onSelect: () =>
          typeof window !== 'undefined' &&
          window.scrollTo({ top: 0, behavior: 'smooth' }),
      },
      {
        id: 'plaza',
        label: '広場',
        icon: 'assets/facilities/facility_collection_plaza.png',
        emoji: '🎪',
        ariaLabel: 'コレクション広場へ行く',
        desktop: { x: 50, y: 72 },
        mobile: { x: 50, y: 64 },
        onSelect: onOpenIsland,
      },
    ];
  }, [onSelectArea, onOpenShop, onOpenDex, onOpenIsland]);

  const mapUrl = isMobile ? MAP_MOBILE_URL : MAP_BASE_URL;

  // マップ画像が使えないときは、地図は出さず案内文だけ出す。
  // （下のカード型メニューで各画面へ移動できるので機能は壊れない）
  if (!mapUrl || mapFailed) {
    return (
      <div className="island-map island-map-fallback">
        <p className="island-map-fallback-text">
          🗺️ 地図をよみこめませんでした。下のメニューからえらんでね。
        </p>
      </div>
    );
  }

  return (
    <div className={`island-map ${isMobile ? 'island-map-mobile' : 'island-map-desktop'}`}>
      <div className="island-map-stage">
        <img
          className="island-map-image"
          src={mapUrl}
          alt="まなび島のぜんたいマップ"
          decoding="async"
          draggable={false}
          onError={() => setMapFailed(true)}
        />

        {spots.map((spot) => {
          const point = isMobile ? spot.mobile : spot.desktop;
          const iconUrl = publicAssetUrl(spot.icon);
          const showIcon = iconUrl && !iconFailed[spot.id];
          return (
            <div
              key={spot.id}
              className={`facility-marker ${point.labelTop ? 'label-top' : ''}`}
              style={
                {
                  '--x': `${point.x}%`,
                  '--y': `${point.y}%`,
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                className={`facility-button ${spot.isHome ? 'is-home' : ''}`}
                onClick={spot.onSelect}
                aria-label={spot.ariaLabel}
              >
                {showIcon ? (
                  <img
                    className="facility-icon"
                    src={iconUrl}
                    alt=""
                    decoding="async"
                    draggable={false}
                    onError={() =>
                      setIconFailed((prev) => ({ ...prev, [spot.id]: true }))
                    }
                  />
                ) : (
                  <span className="facility-icon facility-icon-fallback" aria-hidden="true">
                    {spot.emoji}
                  </span>
                )}
                <span className="facility-label">{spot.label}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
