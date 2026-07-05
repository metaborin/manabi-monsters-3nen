import { useState } from 'react';
import type { Area, Quest, QuestResult, Subject } from './types/game';
import { findQuestsByArea } from './data/quests';
import { findMonster, MONSTERS } from './data/monsters';
import { getLevelInfo } from './utils/level';
import { useGameState } from './hooks/useGameState';
import { TitleScreen } from './components/TitleScreen';
import { HomeScreen } from './components/HomeScreen';
import { QuestSelectScreen } from './components/QuestSelectScreen';
import { QuestScreen } from './components/QuestScreen';
import { ResultScreen } from './components/ResultScreen';
import { MonsterDex } from './components/MonsterDex';
import { ShopScreen } from './components/ShopScreen';
import { IslandScreen } from './components/IslandScreen';
import { EntranceOverlay } from './components/EntranceOverlay';

type Screen =
  | 'title'
  | 'home'
  | 'questSelect'
  | 'quest'
  | 'result'
  | 'dex'
  | 'shop'
  | 'island';

/** 入場演出の情報。target を本来の遷移先として使う。 */
interface Transition {
  emoji: string;
  title: string;
  subtitle: string;
  target: { screen: Screen; area?: Area };
}

/** 教科ごとの入場サブメッセージ（小学3年生向けに短く） */
const ENTRANCE_SUBTITLE: Record<Subject, string> = {
  kokugo: 'ことばモンスターをさがそう！',
  sansu: '数字のひみつを見つけよう！',
  rika: '観察して、こたえを見つけよう！',
  shakai: '町のひみつを調べよう！',
  eigo: '英語カードを集めよう！',
};

export default function App() {
  const { player, startNewGame, applyQuestResult, buyItem, buyConsumable, consumeItem, resetGame } =
    useGameState();
  const [screen, setScreen] = useState<Screen>('title');
  const [currentArea, setCurrentArea] = useState<Area | null>(null);
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [lastResult, setLastResult] = useState<QuestResult | null>(null);
  const [levelBeforeQuest, setLevelBeforeQuest] = useState(1);
  const [transition, setTransition] = useState<Transition | null>(null);

  const handleStartNew = (name: string) => {
    startNewGame(name);
    setScreen('home');
  };

  // 入場演出が終わったら本来の画面へ進む
  const finishTransition = () => {
    if (!transition) return;
    const { target } = transition;
    if (target.area) setCurrentArea(target.area);
    setScreen(target.screen);
    setTransition(null);
  };

  const handleSelectArea = (area: Area) => {
    if (findQuestsByArea(area.id).length === 0) return;
    setTransition({
      emoji: area.emoji,
      title: `${area.name}にとうちゃく！`,
      subtitle: ENTRANCE_SUBTITLE[area.subject],
      target: { screen: 'questSelect', area },
    });
  };

  const handleOpenShop = () => {
    setTransition({
      emoji: '🛍️',
      title: 'まなびショップにとうちゃく！',
      subtitle: 'コインでアイテムを見てみよう！',
      target: { screen: 'shop' },
    });
  };

  const handleOpenDex = () => {
    setTransition({
      emoji: '📖',
      title: 'モンスターずかんをひらいた！',
      subtitle: '集めた仲間を見てみよう！',
      target: { screen: 'dex' },
    });
  };

  const handleOpenIsland = () => {
    setTransition({
      emoji: '🎪',
      title: 'コレクション広場にとうちゃく！',
      subtitle: '仲間たちに会いに行こう！',
      target: { screen: 'island' },
    });
  };

  const handleSelectQuest = (quest: Quest) => {
    setCurrentQuest(quest);
    setScreen('quest');
  };

  const handleQuestFinish = (
    correctCount: number,
    totalCount: number,
    earnedCoins: number,
    earnedExp: number,
    coinBonus = 0,
  ) => {
    if (!currentQuest || !player) return;
    const alreadyOwned =
      currentQuest.rewardMonsterId !== null &&
      player.monsterIds.includes(currentQuest.rewardMonsterId);
    const isFirstClear = !player.clearedQuestIds.includes(currentQuest.id);
    // 2回目以降は練習クリア扱いでコイン半分（経験値はそのまま）。
    // コインアップスターのボーナスは、そのあとに足す（+5 は半分にしない）。
    const baseCoins = isFirstClear ? earnedCoins : Math.floor(earnedCoins / 2);
    const result: QuestResult = {
      questId: currentQuest.id,
      correctCount,
      totalCount,
      earnedCoins: baseCoins + coinBonus,
      earnedExp,
      newMonsterId:
        currentQuest.rewardMonsterId !== null && !alreadyOwned
          ? currentQuest.rewardMonsterId
          : null,
      isFirstClear,
      coinBonus,
    };
    setLevelBeforeQuest(getLevelInfo(player.exp).level);
    applyQuestResult(result);
    setLastResult(result);
    setScreen('result');
  };

  const handleReset = () => {
    resetGame();
    setCurrentArea(null);
    setCurrentQuest(null);
    setLastResult(null);
    setTransition(null);
    setScreen('title');
  };

  // セーブデータがない状態では必ずタイトル画面を表示する
  if (!player || screen === 'title') {
    return (
      <TitleScreen
        hasSave={player !== null}
        saveName={player ? player.name : null}
        onStartNew={handleStartNew}
        onContinue={() => setScreen('home')}
        onReset={handleReset}
      />
    );
  }

  if (screen === 'questSelect' && currentArea) {
    return (
      <QuestSelectScreen
        area={currentArea}
        quests={findQuestsByArea(currentArea.id)}
        clearedQuestIds={player.clearedQuestIds}
        onSelectQuest={handleSelectQuest}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'quest' && currentQuest && currentArea) {
    return (
      <QuestScreen
        area={currentArea}
        key={currentQuest.id}
        quest={currentQuest}
        itemCounts={player.itemCounts}
        onConsumeItem={consumeItem}
        onFinish={handleQuestFinish}
        onBack={() => setScreen('questSelect')}
      />
    );
  }

  if (screen === 'result' && lastResult && currentQuest) {
    return (
      <ResultScreen
        result={lastResult}
        rewardMonster={
          currentQuest.rewardMonsterId !== null
            ? findMonster(currentQuest.rewardMonsterId) ?? null
            : null
        }
        playerExp={player.exp}
        levelBefore={levelBeforeQuest}
        dexJustCompleted={
          lastResult.newMonsterId !== null &&
          MONSTERS.every((m) => player.monsterIds.includes(m.id))
        }
        onBackHome={() => setScreen('home')}
      />
    );
  }

  if (screen === 'dex') {
    return <MonsterDex ownedMonsterIds={player.monsterIds} onBack={() => setScreen('home')} />;
  }

  if (screen === 'shop') {
    return (
      <ShopScreen
        player={player}
        onBuy={buyItem}
        onBuyConsumable={buyConsumable}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'island') {
    return (
      <IslandScreen
        player={player}
        onBack={() => setScreen('home')}
        onOpenShop={() => setScreen('shop')}
      />
    );
  }

  return (
    <>
      <HomeScreen
        player={player}
        onSelectArea={handleSelectArea}
        onOpenDex={handleOpenDex}
        onOpenShop={handleOpenShop}
        onOpenIsland={handleOpenIsland}
        onBackToTitle={() => setScreen('title')}
      />
      {transition && (
        <EntranceOverlay
          emoji={transition.emoji}
          title={transition.title}
          subtitle={transition.subtitle}
          onDone={finishTransition}
        />
      )}
    </>
  );
}
