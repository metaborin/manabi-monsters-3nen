import { useState } from 'react';
import { APP_VERSION } from '../version';
import { publicAssetUrl } from '../utils/assets';

interface Props {
  hasSave: boolean;
  saveName: string | null;
  onStartNew: (name: string) => void;
  onContinue: () => void;
  onReset: () => void;
}

const TITLE_LOGO_URL = publicAssetUrl('assets/title/title_logo.png');

export function TitleScreen({ hasSave, saveName, onStartNew, onContinue, onReset }: Props) {
  const [name, setName] = useState('');
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = TITLE_LOGO_URL && !logoFailed;

  const handleStart = () => {
    const trimmed = name.trim();
    if (trimmed === '') return;
    onStartNew(trimmed);
  };

  const handleReset = () => {
    if (window.confirm('ほんとうにデータをけしますか？\nコインやモンスターがぜんぶきえてしまうよ。')) {
      onReset();
      setName('');
      window.alert('データをリセットしたよ。またさいしょからあそべるよ！');
    }
  };

  return (
    <div className="screen title-screen">
      <div className="title-logo">
        {showLogo ? (
          <img
            src={TITLE_LOGO_URL}
            alt="まなびモンスターズ 3年生のひみつ島"
            className="title-logo-image"
            decoding="async"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <>
            <div className="title-emoji">🏝️✨</div>
            <h1 className="title-main">まなびモンスターズ</h1>
            <p className="title-sub">〜 3年生のひみつ島 〜</p>
          </>
        )}
      </div>

      <p className="title-description">
        小学3年生の学びを集めて、まなび島を冒険しよう！
        <br />
        問題に正解すると、コインや経験値がもらえて、
        <br />
        まなびモンスターが仲間になるよ。
      </p>

      <div className="card title-card">
        {hasSave ? (
          <>
            <p className="title-welcome">
              おかえり、<strong>{saveName}</strong> さん！
            </p>
            <button className="btn btn-primary btn-big" onClick={onContinue}>
              ▶️ つづきから
            </button>
          </>
        ) : (
          <>
            <label className="name-label" htmlFor="hero-name">
              なまえを入れてね
            </label>
            <input
              id="hero-name"
              className="name-input"
              type="text"
              value={name}
              maxLength={10}
              placeholder="れい：はなこ"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleStart();
              }}
            />
            <button
              className="btn btn-primary btn-big"
              onClick={handleStart}
              disabled={name.trim() === ''}
            >
              🚀 はじめる
            </button>
          </>
        )}
      </div>

      {hasSave && (
        <button className="btn btn-danger btn-small" onClick={handleReset}>
          🗑️ データリセット
        </button>
      )}

      <p className="app-version">{APP_VERSION}</p>
    </div>
  );
}
