import type { Quest } from '../types/game';

export const QUESTS: Quest[] = [
  {
    id: 'quest_division_treasure',
    areaId: 'area_sansu',
    name: 'わり算の宝箱をあけよう',
    unit: 'わり算',
    description:
      'わり算の問題に答えて、宝箱をあけよう。\n全問に挑戦すると、算数モンスターが仲間になるかも！',
    questionIds: [
      'math_division_001',
      'math_division_002',
      'math_division_003',
      'math_division_004',
      'math_division_005',
    ],
    rewardMonsterId: 'mon_kazupyon',
  },
  {
    id: 'quest_multiplication_stones',
    areaId: 'area_sansu',
    name: 'かけ算のひみつ石を集めよう',
    unit: 'かけ算',
    description:
      'かけ算の問題に答えて、ひみつ石を集めよう。\n全問に挑戦すると、算数の力がさらにアップするよ！',
    questionIds: [
      'math_multiplication_001',
      'math_multiplication_002',
      'math_multiplication_003',
      'math_multiplication_004',
      'math_multiplication_005',
    ],
    rewardMonsterId: null,
  },
  {
    id: 'quest_kanji_leaves',
    areaId: 'area_kokugo',
    name: '漢字の葉っぱを集めよう',
    unit: '漢字の読み',
    emoji: '🍃🕊️',
    description:
      '漢字の読み方を選んで、ことばの森に葉っぱをふやそう。\n全問に挑戦すると、国語モンスターが仲間になるかも！\nコトバードが近くに来ているよ。',
    questionIds: [
      'japanese_kanji_reading_001',
      'japanese_kanji_reading_002',
      'japanese_kanji_reading_003',
      'japanese_kanji_reading_004',
      'japanese_kanji_reading_005',
    ],
    rewardMonsterId: 'mon_kotobird',
  },
  {
    id: 'quest_sentence_hero',
    areaId: 'area_kokugo',
    name: '文の主役を見つけよう',
    unit: '主語・述語',
    emoji: '🌿🔍',
    description:
      '文の中の「だれが・何が」にあたる言葉を見つけよう。\n主語を見つけると、文の意味がわかりやすくなるよ！\n文の主役を見つけると、森の道がひらけるよ。',
    questionIds: [
      'japanese_subject_predicate_001',
      'japanese_subject_predicate_002',
      'japanese_subject_predicate_003',
      'japanese_subject_predicate_004',
      'japanese_subject_predicate_005',
    ],
    rewardMonsterId: null,
  },
  {
    id: 'quest_insect_body',
    areaId: 'area_rika',
    name: 'こん虫のからだを調べよう',
    unit: 'こん虫のからだ',
    emoji: '🔍🐞',
    description:
      'こん虫のからだのつくりを観察して、研究ノートを完成させよう。\n全問に挑戦すると、理科モンスターが仲間になるかも！\n虫めがねでよく観察すると、自然のひみつが見えてくるよ。',
    questionIds: [
      'science_insect_body_001',
      'science_insect_body_002',
      'science_insect_body_003',
      'science_insect_body_004',
      'science_insect_body_005',
    ],
    rewardMonsterId: 'mon_jikkenko',
  },
  {
    id: 'quest_town_work',
    areaId: 'area_shakai',
    name: '町のしごとを調べよう',
    unit: '町のしごと',
    emoji: '🗺️🏘️',
    description:
      '町には、みんなのくらしを支えるいろいろなしごとがあります。\n正しい答えを選んで、町の地図を完成させよう！\nくらしを支えるしごとを見つけると、町のひみつが見えてくるよ。',
    questionIds: [
      'social_town_work_001',
      'social_town_work_002',
      'social_town_work_003',
      'social_town_work_004',
      'social_town_work_005',
    ],
    rewardMonsterId: 'mon_chizumon',
  },
  {
    id: 'quest_greeting_cards',
    areaId: 'area_eigo',
    name: 'あいさつカードを集めよう',
    unit: 'あいさつ・色・数',
    emoji: '👋🌈',
    description:
      '英語のあいさつや身近な言葉を選んで、あいさつカードを集めよう。\n全問に挑戦すると、英語モンスターが仲間になるかも！\n正しい英語を選ぶと、カードが光るよ。',
    questionIds: [
      'english_greeting_001',
      'english_greeting_002',
      'english_greeting_003',
      'english_greeting_004',
      'english_greeting_005',
    ],
    rewardMonsterId: 'mon_halolin',
  },

  // ===== v0.8.8 追加：各教科の2つ目クエスト（3問構成） =====
  {
    id: 'quest_connect_words_bridge',
    areaId: 'area_kokugo',
    name: 'つなぎ言葉の橋をわたろう',
    unit: 'つなぎ言葉',
    emoji: '🌉🔗',
    description:
      'つなぎ言葉を選んで、ことばの橋をわたろう。\n文と文のつながりを見つけると、ツナグモンが近くに来るよ。',
    questionIds: [
      'japanese_connect_words_001',
      'japanese_connect_words_002',
      'japanese_connect_words_003',
    ],
    rewardMonsterId: 'mon_tsunagumo',
  },
  {
    id: 'quest_remainder_river',
    areaId: 'area_sansu',
    name: 'あまりの川をこえよう',
    unit: 'あまりのあるわり算',
    emoji: '🌊➗',
    description:
      'あまりのあるわり算に挑戦して、川をこえよう。\nあまりも大切な答えだよ。',
    questionIds: [
      'math_remainder_division_001',
      'math_remainder_division_002',
      'math_remainder_division_003',
    ],
    rewardMonsterId: 'mon_amarisu',
  },
  {
    id: 'quest_sun_shadow_watch',
    areaId: 'area_rika',
    name: '太陽とかげを調べよう',
    unit: '太陽とかげ',
    emoji: '☀️🌓',
    description:
      '太陽とかげを調べて、晴れた日のひみつを見つけよう。\nかげの向きや長さに注目してみよう。',
    questionIds: [
      'science_sun_shadow_001',
      'science_sun_shadow_002',
      'science_sun_shadow_003',
    ],
    rewardMonsterId: 'mon_kagepika',
  },
  {
    id: 'quest_map_symbols_square',
    areaId: 'area_shakai',
    name: '地図のしるし広場',
    unit: '地図の見方',
    emoji: '🧭🗺️',
    description:
      '地図のしるしや方位を調べて、広場の道を見つけよう。\n方位記号を見れば、北や東西南北がわかるよ。',
    questionIds: [
      'social_map_symbols_001',
      'social_map_symbols_002',
      'social_map_symbols_003',
    ],
    rewardMonsterId: 'mon_markame',
  },
  {
    id: 'quest_color_words_beach',
    areaId: 'area_eigo',
    name: '色の英語ビーチ',
    unit: '色の英語',
    emoji: '🎨🏖️',
    description:
      '色の英語を選んで、ビーチのカードを集めよう。\n身近な色を英語で言えるようになろう。',
    questionIds: [
      'english_color_words_001',
      'english_color_words_002',
      'english_color_words_003',
    ],
    rewardMonsterId: 'mon_cololing',
  },

  // ===== v0.9.3 追加：教科ボスクエスト（各5問・クリアで教科バッジ・仲間モンスターなし） =====
  {
    id: 'quest_boss_kokugo_kotoba_dragon',
    areaId: 'area_kokugo',
    name: 'ことばドラゴンのしれん',
    unit: '国語ボス',
    emoji: '🐉📖',
    description:
      'ことばドラゴンが しれんを出してくるよ！\nつなぎ言葉や主語・述語など、5問にちょうせん。\nクリアすると「国語バッジ」がもらえるよ。',
    questionIds: ['boss_kokugo_001', 'boss_kokugo_002', 'boss_kokugo_003', 'boss_kokugo_004', 'boss_kokugo_005'],
    rewardMonsterId: null,
    isBoss: true,
    bossImage: 'assets/bosses/boss_kokugo_kotoba_dragon_512.png',
  },
  {
    id: 'quest_boss_sansu_warizan_golem',
    areaId: 'area_sansu',
    name: 'わり算ゴーレムのしれん',
    unit: '算数ボス',
    emoji: '🗿➗',
    description:
      'わり算ゴーレムが しれんを出してくるよ！\nわり算やかけ算など、5問にちょうせん。\nクリアすると「算数バッジ」がもらえるよ。',
    questionIds: ['boss_sansu_001', 'boss_sansu_002', 'boss_sansu_003', 'boss_sansu_004', 'boss_sansu_005'],
    rewardMonsterId: null,
    isBoss: true,
    bossImage: 'assets/bosses/boss_sansu_warizan_golem_512.png',
  },
  {
    id: 'quest_boss_rika_kage_maou',
    areaId: 'area_rika',
    name: 'かげのまおうのしれん',
    unit: '理科ボス',
    emoji: '🌓👑',
    description:
      'かげのまおうが しれんを出してくるよ！\n太陽とかげ、植物やこん虫など、5問にちょうせん。\nクリアすると「理科バッジ」がもらえるよ。',
    questionIds: ['boss_rika_001', 'boss_rika_002', 'boss_rika_003', 'boss_rika_004', 'boss_rika_005'],
    rewardMonsterId: null,
    isBoss: true,
    bossImage: 'assets/bosses/boss_rika_kage_maou_512.png',
  },
  {
    id: 'quest_boss_shakai_map_guardian',
    areaId: 'area_shakai',
    name: '地図の番人のしれん',
    unit: '社会ボス',
    emoji: '🧭🗺️',
    description:
      '地図の番人が しれんを出してくるよ！\n方位や地図記号、町のようすなど、5問にちょうせん。\nクリアすると「社会バッジ」がもらえるよ。',
    questionIds: ['boss_shakai_001', 'boss_shakai_002', 'boss_shakai_003', 'boss_shakai_004', 'boss_shakai_005'],
    rewardMonsterId: null,
    isBoss: true,
    bossImage: 'assets/bosses/boss_shakai_map_guardian_512.png',
  },
  {
    id: 'quest_boss_eigo_color_sphinx',
    areaId: 'area_eigo',
    name: 'カラフルスフィンクスのしれん',
    unit: '英語ボス',
    emoji: '🎨🦁',
    description:
      'カラフルスフィンクスが しれんを出してくるよ！\n色やあいさつ、数の英語など、5問にちょうせん。\nクリアすると「英語バッジ」がもらえるよ。',
    questionIds: ['boss_eigo_001', 'boss_eigo_002', 'boss_eigo_003', 'boss_eigo_004', 'boss_eigo_005'],
    rewardMonsterId: null,
    isBoss: true,
    bossImage: 'assets/bosses/boss_eigo_color_sphinx_512.png',
  },
];

export function findQuestsByArea(areaId: string): Quest[] {
  return QUESTS.filter((q) => q.areaId === areaId);
}

/** すべての教科ボスクエスト（v0.9.3） */
export function getBossQuests(): Quest[] {
  return QUESTS.filter((q) => q.isBoss);
}
