import type { Monster } from '../types/game';

export const MONSTERS: Monster[] = [
  {
    id: 'mon_kazupyon',
    name: 'カズピョン',
    subject: 'sansu',
    emoji: '🐰',
    description: '数字が大好きなうさぎ型モンスター。わり算の宝箱を見つけるのが得意。',
  },
  {
    id: 'mon_kotobird',
    name: 'コトバード',
    subject: 'kokugo',
    emoji: '🐦',
    description: '言葉を運ぶ鳥型モンスター。漢字や文章を読むのが得意。',
  },
  {
    id: 'mon_jikkenko',
    name: 'ジッケンコ',
    subject: 'rika',
    emoji: '🐤',
    description: '実験が大好きなひよこ型モンスター。ふしぎな発見を教えてくれる。',
  },
  {
    id: 'mon_chizumon',
    name: 'チズモン',
    subject: 'shakai',
    emoji: '🐢',
    description: '地図を背負ったカメ型モンスター。町の案内が得意。',
  },
  {
    id: 'mon_halolin',
    name: 'ハロリン',
    subject: 'eigo',
    emoji: '🧚',
    description: 'あいさつが得意な小さな妖精モンスター。英語で友だちを作るのが好き。',
  },
];

export function findMonster(id: string): Monster | undefined {
  return MONSTERS.find((m) => m.id === id);
}
