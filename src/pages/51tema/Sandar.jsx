import React, { useState } from 'react';
import "./Sandar.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";

let currentAudio = null;
let currentFile = null;

const playAudio = (fileName) => {
  if (!fileName) return;
  if (currentAudio && currentFile === fileName) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
    currentFile = null;
    return;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  const audio = new Audio(`/audio/${fileName}`);
  currentAudio = audio;
  currentFile = fileName;
  audio.play().catch(err => console.log("Ошибка:", err));
  audio.onended = () => {
    currentAudio = null;
    currentFile = null;
  };
};

// ... (начало кода без изменений: импорты и функция playAudio)

function Sandar() {
  const [count, setCount] = useState(1);

  const numbers = [
    { num: 1, kg: "Бир", ru: "один" }, { num: 2, kg: "Эки", ru: "два" },
    { num: 3, kg: "Үч", ru: "три" }, { num: 4, kg: "Төрт", ru: "четыре" },
    { num: 5, kg: "Беш", ru: "пять" }, { num: 6, kg: "Алты", ru: "шесть" },
    { num: 7, kg: "Жети", ru: "семь" }, { num: 8, kg: "Сегиз", ru: "восемь" },
    { num: 9, kg: "Тогуз", ru: "девять" }, { num: 10, kg: "Он", ru: "десять" }
  ];

  const examples = [
    { kg: "Бир шар", ru: "один шар", img: "one_balloon.png", audio: "1shar.mp3" },
    { kg: "Эки шар", ru: "два шара", img: "two_balloons.png", audio: "2shar.mp3" },
    { kg: "Үч алма", ru: "три яблока", img: "three_apples.png", audio: "3alma.mp3" },
    { kg: "Төрт гүл", ru: "четыре цветка", img: "4flower.png", audio: "4gul.mp3" },
    { kg: "Беш топ", ru: "пять мячей", img: "5balls.png", audio: "5top.mp3" },
  ];

  const wordsForRightMenu = numbers.map(n => ({
    kg: n.kg, ru: n.ru, audio: `${n.num}.mp3`
  }));

  return (
    <div className="sn-container">
      <Navbar />
      <div className="sn-layout">
        <Sidebar />
        <main className="sn-main-content">
          <h1 className="sn-title">Сандар</h1>

          <section className="sn-counter-section">
            <div className="sn-big-num">{count}</div>
            <div className="sn-controls">
              <button className="sn-minus" onClick={() => setCount(Math.max(1, count - 1))}>-</button>
              <div className="sn-count-text">
                <span className="sn-kg-main">{numbers[count - 1]?.kg}</span>
                <span className="sn-ru-sub">{numbers[count - 1]?.ru}</span>
              </div>
              <button className="sn-plus" onClick={() => setCount(Math.min(10, count + 1))}>+</button>
            </div>
          </section>

          <div className="sn-numbers-grid">
            {numbers.map((n) => (
              <div key={n.num} className={`sn-num-bubble ${count === n.num ? 'active' : ''}`} onClick={() => setCount(n.num)}>
                {n.num}
              </div>
            ))}
          </div>

          <hr className="sn-divider" />

          {/* Сетка примеров в два ряда */}
          <section className="sn-examples-grid">
            {examples.map((ex, i) => (
              <div key={i} className="sn-ex-card">
                <img src={`/src/assets/31tema/${ex.img}`} alt={ex.kg} className="sn-ex-img" />
                <div className="sn-ex-label">
                  <div className="sn-text-group">
                    <span className="sn-kg-text">{ex.kg}</span>
                    <span className="sn-ru-text">{ex.ru}</span>
                  </div>
                  <button className="sn-audio-btn" onClick={() => playAudio(ex.audio)}>🔊</button>
                </div>
              </div>
            ))}
          </section>
        </main>
        <RightSidebar 
          words={wordsForRightMenu} 
          exerciseLink="/san_exercise" 
          onWordClick={(audio) => playAudio(audio)} 
        />
      </div>
    </div>
  );
}

export default Sandar;