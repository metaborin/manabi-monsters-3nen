import type { ShopItem } from '../types/game';

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'item_kazu_ribbon',
    name: 'カズピョンのリボン',
    price: 50,
    description: 'カズピョンがよろこぶ、数字もようのかわいいリボン。',
    category: 'かざり',
    emoji: '🎀',
  },
  {
    id: 'item_word_bookmark',
    name: 'ことばのしおり',
    price: 50,
    description: '読書が楽しくなる、ことばの森のしおり。',
    category: 'かざり',
    emoji: '🔖',
  },
  {
    id: 'item_science_notebook',
    name: '研究ノート',
    price: 60,
    description: 'ふしぎ研究所で使う、発見を書きこむノート。',
    category: 'どうぐ',
    emoji: '📒',
  },
  {
    id: 'item_town_map',
    name: '町の小さな地図',
    price: 60,
    description: 'わくわくタウンを歩くときに役立つ小さな地図。',
    category: 'どうぐ',
    emoji: '🗺️',
  },
  {
    id: 'item_hello_balloon',
    name: 'ハローふうせん',
    price: 70,
    description: 'えいご広場で人気の、Hello! と書かれたふうせん。',
    category: 'かざり',
    emoji: '🎈',
  },
  {
    id: 'item_manabi_flag',
    name: 'まなび島の旗',
    price: 100,
    description: '5教科のまなびモンスターが集まった記念の旗。',
    category: '記念品',
    emoji: '🚩',
    requiresDexComplete: true,
  },
];
