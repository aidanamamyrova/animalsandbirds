import React from 'react';
import { Link } from "react-router-dom";
import "./Koshtoshuu.css";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar"; // Используем компонент для новых слов

import img1 from "../../assets/2tema/bay1.png";
import img2 from "../../assets/2tema/bay2.png";
import img3 from "../../assets/2tema/bay3.png";
import img4 from "../../assets/2tema/bay4.png";

let currentAudio = null;
let currentFile = null;

const playAudio = (fileName) => {
  if (!fileName) return;

  // если нажали ту же кнопку — СТОП
  if (currentAudio && currentFile === fileName) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
    currentFile = null;
    return;
  }

  // если другой звук — остановить старый
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // новый звук
  const audio = new Audio(`/audio/${fileName}`);
  currentAudio = audio;
  currentFile = fileName;

  audio.play().catch(err => console.log("Ошибка:", err));

  audio.onended = () => {
    currentAudio = null;
    currentFile = null;
  };
};

  const AudioIcon = ({ file }) => (
    <span className="audio-icon" onClick={() => playAudio(file)}>
      🔊
    </span>
  );

const Koshtoshuu = () => {
  const wordsForRightMenu = [
    { kg: "Жакшы баргыла", ru: "Счастливого пути (мн.ч)", audio: "Jakshybargyla.mp3" },
    { kg: "Жакшы калыңыз", ru: "Всего хорошего", audio: "Kalynyz.mp3" },
    { kg: "Саламатта барыңыз", ru: "До свидания (вежл. идите)", audio: "Salamat.mp3" },
    { kg: "Эже", ru: " Сестра", audio: "Eje.mp3" },
    { kg: "Ата", ru: " Папа", audio: "Ata.mp3" },
    { kg: "Чон ата", ru: " Дедушка", audio: "Chonata.mp3" },
  ];

  return (
    <div className="ks-page-wrapper">
      <Navbar />
      <div className="ks-content-layout">
        <Sidebar />

        <main className="ks-main-area">
          <h1 className="ks-main-title">
            Коштошуу
          </h1>

          <div className="ks-dialogue-grid">
            {/* Ряд 1: Эже и Айдай / Ата и балам */}
            <div className="ks-row ks-flex-around">
              <div className="ks-char-item">
                <div className="ks-bubble ks-blue">
                  Эже, жакшы калыңыз <br />
                  Жакшы бар, Айдай 🔊
                  <span className="ks-gray-text">До свидания, сестра. Счастливо, Айдай</span>
                </div>
                <img src={img1} alt="Goodbye 1" className="ks-img-md" />
              </div>

              <div className="ks-char-item">
                <div className="ks-bubble ks-blue">
                  Ата, жакшы барыңыз <br />
                  Жакшы кал, балам 🔊
                  <span className="ks-gray-text">Счастливо, папа. Оставайся хорошо, сынок</span>
                </div>
                <img src={img2} alt="Goodbye 2" className="ks-img-md" />
              </div>
            </div>

            {/* Ряд 2: Дети и Дедушка */}
            <div className="ks-row ks-flex-around ks-mt-lg">
              <div className="ks-char-item">
                <div className="ks-bubble ks-teal">
                  Саламатта баргыла, балдар <br />
                  Саламатта калыңыз 🔊
                  <span className="ks-gray-text">До свидания, дети. До свидания</span>
                </div>
                <img src={img3} alt="Goodbye 3" className="ks-img-md" />
              </div>

              <div className="ks-char-item">
                <div className="ks-bubble ks-teal">
                  Саламатта калыңыз, чоң ата <br />
                  Саламатта бар 🔊
                  <span className="ks-gray-text">До свидания, дедушка. До свидания</span>
                </div>
                <img src={img4} alt="Goodbye 4" className="ks-img-md" />
              </div>
            </div>
          </div>
          
          
        </main>

         <RightSidebar 
  words={wordsForRightMenu} 
  exerciseLink="/kosh" 
    onWordClick={(audioName) => playAudio(audioName)}
/>
      </div>
    </div>
  );
};

export default Koshtoshuu;