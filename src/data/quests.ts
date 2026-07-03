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
];

export function findQuestsByArea(areaId: string): Quest[] {
  return QUESTS.filter((q) => q.areaId === areaId);
}
