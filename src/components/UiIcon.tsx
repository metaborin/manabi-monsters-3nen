import { useState, type ReactNode } from 'react';
import type { Subject } from '../types/game';
import { publicAssetUrl } from '../utils/assets';

const UI_ICON_DIR = 'assets/ui';
const BADGE_ICON_DIR = 'assets/badges';

export const UI_ICON_ASSETS = {
  exp: `${UI_ICON_DIR}/ui_exp_icon_512.png`,
  partnerBonus: `${UI_ICON_DIR}/ui_partner_bonus_icon_512.png`,
  subjectBadgeGeneric: `${BADGE_ICON_DIR}/ui_subject_badge_generic_512.png`,
  badgeKokugo: `${BADGE_ICON_DIR}/ui_badge_kokugo_512.png`,
  badgeSansu: `${BADGE_ICON_DIR}/ui_badge_sansu_512.png`,
  badgeRika: `${BADGE_ICON_DIR}/ui_badge_rika_512.png`,
  badgeShakai: `${BADGE_ICON_DIR}/ui_badge_shakai_512.png`,
  badgeEigo: `${BADGE_ICON_DIR}/ui_badge_eigo_512.png`,
  clear: `${UI_ICON_DIR}/ui_clear_icon_512.png`,
  lock: `${UI_ICON_DIR}/ui_lock_icon_512.png`,
  challenge: `${UI_ICON_DIR}/ui_challenge_icon_512.png`,
  retry: `${UI_ICON_DIR}/ui_retry_icon_512.png`,
  unknown: `${UI_ICON_DIR}/ui_unknown_placeholder_512.png`,
  coin: 'assets/quest-ui/icons/reward_coin_icon.png',
  coinStar: 'assets/items/item_coin_star_512.png',
  retryTicket: 'assets/items/item_retry_ticket_512.png',
  hintCandy: 'assets/items/item_hint_candy_512.png',
  heartCookie: 'assets/items/item_heart_cookie_512.png',
} as const;

export const SUBJECT_BADGE_ICON_ASSETS: Record<Subject, string> = {
  kokugo: UI_ICON_ASSETS.badgeKokugo,
  sansu: UI_ICON_ASSETS.badgeSansu,
  rika: UI_ICON_ASSETS.badgeRika,
  shakai: UI_ICON_ASSETS.badgeShakai,
  eigo: UI_ICON_ASSETS.badgeEigo,
};

interface UiIconProps {
  src?: string;
  alt: string;
  className?: string;
  fallback?: ReactNode;
  decorative?: boolean;
}

export function UiIcon({
  src,
  alt,
  className = '',
  fallback = null,
  decorative = false,
}: UiIconProps) {
  const [failed, setFailed] = useState(false);
  const url = publicAssetUrl(src);

  if (url && !failed) {
    return (
      <img
        className={`ui-icon ${className}`.trim()}
        src={url}
        alt={decorative ? '' : alt}
        aria-hidden={decorative ? 'true' : undefined}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }

  if (fallback === null) return null;

  return (
    <span className={`ui-icon-fallback ${className}`.trim()} aria-hidden={decorative ? 'true' : undefined}>
      {fallback}
    </span>
  );
}

interface IconLabelProps {
  src?: string;
  alt: string;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
  fallback?: ReactNode;
  decorativeIcon?: boolean;
}

export function IconLabel({
  src,
  alt,
  children,
  className = '',
  iconClassName = '',
  fallback = null,
  decorativeIcon = false,
}: IconLabelProps) {
  return (
    <span className={`ui-icon-label ${className}`.trim()}>
      <UiIcon
        src={src}
        alt={alt}
        className={iconClassName}
        fallback={fallback}
        decorative={decorativeIcon}
      />
      <span className="ui-icon-label-text">{children}</span>
    </span>
  );
}

export function SubjectBadgeIcon({
  subject,
  className = '',
  decorative = false,
}: {
  subject: Subject;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <UiIcon
      src={SUBJECT_BADGE_ICON_ASSETS[subject]}
      alt="教科バッジ"
      className={className}
      fallback="🏅"
      decorative={decorative}
    />
  );
}
