import type { Monster } from '../types/game';

export const MONSTERS: Monster[] = [
  {
    id: 'mon_kazupyon',
    name: 'カズピョン',
    subject: 'sansu',
    emoji: '🐰',
    image: 'assets/monsters/mon_kazupyon_512.png',
    description: '数字が大好きなうさぎ型モンスター。わり算の宝箱を見つけるのが得意。',
  },
  {
    id: 'mon_kotobird',
    name: 'コトバード',
    subject: 'kokugo',
    emoji: '🐦',
    image: 'assets/monsters/mon_kotobird_512.png',
    description: '言葉を運ぶ鳥型モンスター。漢字や文章を読むのが得意。',
  },
  {
    id: 'mon_jikkenko',
    name: 'ジッケンコ',
    subject: 'rika',
    emoji: '🐤',
    image: 'assets/monsters/mon_jikkenko_512.png',
    description: '実験が大好きなひよこ型モンスター。ふしぎな発見を教えてくれる。',
  },
  {
    id: 'mon_chizumon',
    name: 'チズモン',
    subject: 'shakai',
    emoji: '🐢',
    image: 'assets/monsters/mon_chizumon_512.png',
    description: '地図を背負ったカメ型モンスター。町の案内が得意。',
  },
  {
    id: 'mon_halolin',
    name: 'ハロリン',
    subject: 'eigo',
    emoji: '🧚',
    image: 'assets/monsters/mon_halolin_512.png',
    description: 'あいさつが得意な小さな妖精モンスター。英語で友だちを作るのが好き。',
  },

  // ===== v0.8.8 追加：各教科2つ目クエストの仲間モンスター =====
  // v0.8.9 で画像を追加（emoji は画像読み込み失敗時の fallback として維持）。
  {
    id: 'mon_tsunagumo',
    name: 'ツナグモン',
    subject: 'kokugo',
    emoji: '☁️',
    image: 'assets/monsters/mon_tsunagumo_512.png',
    description: '文のつながりを見つけるのが得意。ことばの橋をふわっとかけてくれる。',
  },
  {
    id: 'mon_amarisu',
    name: 'アマリス',
    subject: 'sansu',
    emoji: '🌰',
    image: 'assets/monsters/mon_amarisu_512.png',
    description: 'わり切れない数を見つけるのが得意。あまりも大切な答えだと教えてくれる。',
  },
  {
    id: 'mon_kagepika',
    name: 'カゲピカ',
    subject: 'rika',
    emoji: '💧',
    image: 'assets/monsters/mon_kagepika_512.png',
    description: '太陽の向きとかげの形を調べるのが好き。晴れた日の発見を教えてくれる。',
  },
  {
    id: 'mon_markame',
    name: 'マーカメ',
    subject: 'shakai',
    emoji: '🧭',
    image: 'assets/monsters/mon_markame_512.png',
    description: '方位や地図記号を見つけるのが得意。しるしをたよりに町の場所を案内してくれる。',
  },
  {
    id: 'mon_cololing',
    name: 'コロリン',
    subject: 'eigo',
    emoji: '🎨',
    image: 'assets/monsters/mon_cololing_512.png',
    description: '色の英語を覚えるのが大好き。カラフルな言葉で友だちを増やしてくれる。',
  },
];

export function findMonster(id: string): Monster | undefined {
  return MONSTERS.find((m) => m.id === id);
}
