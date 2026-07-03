import type { Area } from '../types/game';

export const AREAS: Area[] = [
  {
    id: 'area_kokugo',
    name: 'ことばの森',
    subject: 'kokugo',
    emoji: '🌳',
    description: '漢字や言葉の力を使って、森のなぞを解こう。',
    available: true,
    welcome: 'ことばの森へようこそ！漢字の葉っぱが風にゆれているよ。コトバードといっしょに言葉の力を集めよう。',
  },
  {
    id: 'area_sansu',
    name: '計算のどうくつ',
    subject: 'sansu',
    emoji: '⛰️',
    description: '計算パワーでたからばこをあけよう',
    available: true,
    welcome: 'ようこそ計算のどうくつへ！計算パワーでたからものを見つけよう。',
  },
  {
    id: 'area_rika',
    name: 'ふしぎ研究所',
    subject: 'rika',
    emoji: '🔬',
    description: '生き物や自然のふしぎを観察して、研究ノートを完成させよう。',
    available: true,
    welcome: 'ふしぎ研究所へようこそ！虫や植物、光や音のひみつを、ジッケンコといっしょに調べよう。',
  },
  {
    id: 'area_shakai',
    name: 'わくわくタウン',
    subject: 'shakai',
    emoji: '🏙️',
    description: '町の地図やしごとを調べて、くらしのひみつを見つけよう。',
    available: true,
    welcome: 'わくわくタウンへようこそ！チズモンが町を案内してくれるよ。町のひみつを集めると、地図がどんどん広がるよ。',
  },
  {
    id: 'area_eigo',
    name: 'えいご広場',
    subject: 'eigo',
    emoji: '🎈',
    description: '英語のあいさつや言葉を選んで、世界の友だちと話してみよう。',
    available: true,
    welcome: 'えいご広場へようこそ！Hello! あいさつや色、数の英語を使って、ハロリンといっしょに友だちを作ろう。',
  },
];
