import { useState } from 'react';
import type { Area, Quest, QuestResult } from './types/game';
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

type Screen =
  | 'title'
  | 'home'
  | 'questSelect'
  | 'quest'
  | 'result'
  | 'dex'
  | 'shop'
  | 'island';

export default function App() {
  const { player, startNewGame, applyQuestResult, buyItem, resetGame } = useGameState();
  const [screen, setScreen] = useState<Screen>('title');
  const [currentArea, setCurrentArea] = useState<Area | null>(null);
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [lastResult, setLastResult] = useState<QuestResult | null>(null);
  const [levelBeforeQuest, setLevelBeforeQuest] = useState(1);

  const handleStartNew = (name: string) => {
    startNewGame(name);
    setScreen('home');
  };

  const handleSelectArea = (area: Area) => {
    if (findQuestsByArea(area.id).length === 0) return;
    setCurrentArea(area);
    setScreen('questSelect');
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
  ) => {
    if (!currentQuest || !player) return;
    const alreadyOwned =
      currentQuest.rewardMonsterId !== null &&
      player.monsterIds.includes(currentQuest.rewardMonsterId);
    const isFirstClear = !player.clearedQuestIds.includes(currentQuest.id);
    const result: QuestResult = {
      questId: currentQuest.id,
      correctCount,
      totalCount,
      // 2回目以降は練習クリア扱いでコイン半分（経験値はそのまま）
      earnedCoins: isFirstClear ? earnedCoins : Math.floor(earnedCoins / 2),
      earnedExp,
      newMonsterId:
        currentQuest.rewardMonsterId !== null && !alreadyOwned
          ? currentQuest.rewardMonsterId
          : null,
      isFirstClear,
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

  if (screen === 'quest' && currentQuest) {
    return (
      <QuestScreen
        key={currentQuest.id}
        quest={currentQuest}
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
    return <ShopScreen player={player} onBuy={buyItem} onBack={() => setScreen('home')} />;
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
    <HomeScreen
      player={player}
      onSelectArea={handleSelectArea}
      onOpenDex={() => setScreen('dex')}
      onOpenShop={() => setScreen('shop')}
      onOpenIsland={() => setScreen('island')}
      onBackToTitle={() => setScreen('title')}
    />
  );
}
