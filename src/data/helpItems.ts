import type { ShopItem } from '../types/game';

/**
 * v0.9.0「つかうアイテム（たすけアイテム）」。
 * 飾りアイテム（SHOP_ITEMS）とは別リストにして、所持数（PlayerState.itemCounts）で管理する。
 * これにより、まなび島の飾り表示やアイテム数カウント（既存）に影響を出さない。
 */

/** ヒントキャンディ：クエスト中に、いまの問題のヒントを見られる */
export const HINT_CANDY_ID = 'item_hint_candy';
/** やりなおしチケット：まちがえても1回だけやりなおせる */
export const RETRY_TICKET_ID = 'item_retry_ticket';
/** コインアップスター：クリアのごほうびコインが少し増える */
export const COIN_STAR_ID = 'item_coin_star';
/** ハートクッキー：クエスト中にハートを1つ回復する（v0.9.1） */
export const HEART_COOKIE_ID = 'item_heart_cookie';

/** コインアップスターで増えるコイン数 */
export const COIN_STAR_BONUS = 5;

/** 1クエストの最大ハート数（v0.9.1） */
export const MAX_HEARTS = 3;

/** 相棒モンスターの教科と、クエストの教科が同じときのクリアボーナスコイン（v0.9.2） */
export const PARTNER_SUBJECT_BONUS = 3;

/** 問題にヒントが無いときの共通ヒント（小学3年生向け） */
export const DEFAULT_HINT = 'よく考えてみよう！';

export const HELP_ITEMS: ShopItem[] = [
  {
    id: HINT_CANDY_ID,
    name: 'ヒントキャンディ',
    price: 15,
    description: 'クエスト中に、いまの問題のヒントをみられるよ。',
    category: 'たすけ',
    emoji: '🍬',
    image: 'assets/items/item_hint_candy_512.png',
  },
  {
    id: RETRY_TICKET_ID,
    name: 'やりなおしチケット',
    price: 15,
    description: 'まちがえても、1回だけやりなおせるよ。',
    category: 'たすけ',
    emoji: '🎫',
    image: 'assets/items/item_retry_ticket_512.png',
  },
  {
    id: COIN_STAR_ID,
    name: 'コインアップスター',
    price: 10,
    description: `つかうと、クリアのごほうびコインが +${COIN_STAR_BONUS} されるよ。`,
    category: 'たすけ',
    emoji: '⭐',
    image: 'assets/items/item_coin_star_512.png',
  },
  {
    id: HEART_COOKIE_ID,
    name: 'ハートクッキー',
    price: 20,
    description: 'クエスト中に、ハートを1つ かいふくできるよ。',
    category: 'たすけ',
    emoji: '🍪',
    image: 'assets/items/item_heart_cookie_512.png',
  },
];

export function findHelpItem(id: string): ShopItem | undefined {
  return HELP_ITEMS.find((item) => item.id === id);
}
