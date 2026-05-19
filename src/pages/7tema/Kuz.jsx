import React from 'react';
import "./Kuz.css";
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

function Kuz() {
  const wordsForRightMenu = [
    { kg: "Жалбырак", ru: "Лист", audio: "jalbyrak.mp3" },
    { kg: "түшөт", ru: "падает", audio: "tushot.mp3" },
    { kg: "айлар", ru: "месяцы", audio: "aylar.mp3" },
    { kg: "жаан", ru: "дождь", audio: "jaan.mp3" },
    { kg: "күн", ru: "день", audio: "kun.mp3" },
    { kg: "салкын", ru: "прохладно", audio: "salkyn.mp3" },
    { kg: "булут", ru: "облако", audio: "bulut.mp3" },
  ];

  return (
    <div className="kuz-page">
      <Navbar />
      <div className="layout-wrapper">
        <Sidebar />
        
        <main className="center-content kuz-content">
          <h1 className="page-title">Күз</h1>

          {/* Основное описание */}
          <div className="main-illustration">
             <img src="/src/assets/31tema/main_kuz.png" alt="Осень" className="kuz-img-main" />
             <div className="intro-text-bubble">
                <p>Азыр күз мезгили. Күзүндө күн салкын болот. Жаан жайт. Күз айлары — сентябрь, октябрь, ноябрь 
                   <button onClick={() => playAudio('intro_kuz.mp3')} className="inline-audio">🔊</button>
                </p>
                <span className="ru-translation-block">Сейчас время осени. Осенью дни прохладные. Идет дождь. Осенние месяцы — сентябрь, октябрь, ноябрь.</span>
             </div>
          </div>

          <div className="kuz-grid-container">
            {/* ПЕРВЫЙ РЯД: Листья и Месяцы */}
            <div className="kuz-row">
              {/* Блок: Жалбырак */}
              <section className="kuz-card">
                <div className="section-flex">
                  <img src="/src/assets/31tema/leaf_green.png" alt="Лист" className="icon-img" />
                  <div className="text-group">
                    <p className="kg-text">Жалбырак <button onClick={() => playAudio('leaf.mp3')}>🔊</button></p>
                    <p className="ru-text">Лист</p>
                  </div>
                </div>
                <div className="section-flex">
                   <div className="multi-leaves">
                      <img src="/src/assets/31tema/leaf_red.png" alt="Red leaf" />
                      <img src="/src/assets/31tema/leaf_yellow.png" alt="Yellow leaf" />
                   </div>
                   <div className="text-group">
                    <p className="kg-text">жалбырактар <button onClick={() => playAudio('colored_leaves.mp3')}>🔊</button></p>
                    <p className="ru-text">листья</p>
                  </div>
                </div>
              </section>

              {/* Блок: Айлар */}
              <section className="kuz-card">
                <div className="section-flex">
                  <img src="/src/assets/31tema/months_circle.png" alt="Месяцы" className="months-img" />
                  <div className="text-group">
                    <p className="kg-text">айлар <button onClick={() => playAudio('months.mp3')}>🔊</button></p>
                    <p className="ru-text">месяцы</p>
                    <p className="kg-text">күз айлары <button onClick={() => playAudio('kuz_months.mp3')}>🔊</button></p>
                    <p className="ru-text">осенние месяцы</p>
                  </div>
                </div>
              </section>
            </div>

            {/* ВТОРОЙ РЯД: Дождь и Погода */}
            <div className="kuz-row">
              {/* Блок: Жаан */}
              <section className="kuz-card">
                <div className="section-flex">
                  <img src="/src/assets/31tema/rain_scene.png" alt="Дождь" className="rain-img" />
                  <div className="text-group">
                    <p className="kg-text">Жаан <button onClick={() => playAudio('rain.mp3')}>🔊</button></p>
                    <p className="ru-text">Дождь</p>
                    <p className="kg-text">жаан жаады <button onClick={() => playAudio('rained.mp3')}>🔊</button></p>
                    <p className="ru-text">шел дождь</p>
                  </div>
                </div>
              </section>

              {/* Блок: Погода */}
              <section className="kuz-card">
                <div className="section-flex">
                   <img src="/src/assets/31tema/weather_compare.png" alt="Погода" className="weather-img" />
                   <div className="text-group">
                    <p className="kg-text">Күн салкын <button onClick={() => playAudio('cool_day.mp3')}>🔊</button></p>
                    <p className="ru-text">День прохладный</p>
                    <p className="kg-text">Бүгүн күн салкын <button onClick={() => playAudio('today_cool.mp3')}>🔊</button></p>
                    <p className="ru-text">Сегодня день прохладный</p>
                  </div>
                </div>
              </section>
            </div>
          </div>

        </main>

        <RightSidebar 
          words={wordsForRightMenu} 
          exerciseLink="/kuz-exercise" 
          onWordClick={(audio) => playAudio(audio)}
        />
      </div>
    </div>
  );
}

export default Kuz;