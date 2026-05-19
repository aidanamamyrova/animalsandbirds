import React from 'react';
import "./Tus.css";
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

function Tus() {
  const mainPencils = [
    { id: 1, kg: "Кызыл", ru: "красный", img: "red_pencil.png", audio: "kyzyl.mp3" },
    { id: 2, kg: "Көк", ru: "синий", img: "blue_pencil.png", audio: "kok.mp3" },
    { id: 3, kg: "Жашыл", ru: "зеленый", img: "zhashyl.png", audio: "zhashyl.mp3" },
    { id: 4, kg: "Сары", ru: "желтый", img: "sary.png", audio: "sary.mp3" },
    { id: 5, kg: "Күрөң", ru: "коричневый", img: "brown_pencil.png", audio: "kuren.mp3" },
    { id: 6, kg: "Ак", ru: "белый", img: "white_pencil.png", audio: "ak.mp3" },
    { id: 7, kg: "Кара", ru: "черный", img: "black_pencil.png", audio: "kara.mp3" },
  ];

  const colorExamples = [
    { id: "e1", kg: "Көк китеп", ru: "Синяя книга", img: "book.png", audio: "kok_kitep.mp3" },
    { id: "e2", kg: "Сары сызгыч", ru: "Желтая линейка", img: "ruler.png", audio: "sary_syzgych.mp3" },
    { id: "e3", kg: "Ак калем", ru: "Белый карандаш", img: "white_pencil.png", audio: "ak_kalem.mp3" },
    { id: "e4", kg: "Кызыл гүл", ru: "Красный цветок", img: "red_flower.png", audio: "kyzyl_gul.mp3" },
    { id: "e5", kg: "Жашыл жалбырак", ru: "Зеленый лист", img: "green_leaf.png", audio: "zhashyl_zhalbyrak.mp3" },
    { id: "e6", kg: "Кара чач", ru: "Черные волосы", img: "black_hair.png", audio: "kara_chach.mp3" },
  ];

  // Массив специально для RightSidebar
  const wordsForRightMenu = [
    { kg: "Кызыл", ru: "красный", audio: "kyzyl.mp3" },
    { kg: "Көк", ru: "синий", audio: "kok.mp3" },
    { kg: "Жашыл", ru: "зеленый", audio: "zhashyl.mp3" },
    { kg: "Сары", ru: "желтый", audio: "sary.mp3" },
    { kg: "Күрөң", ru: "коричневый", audio: "kuren.mp3" },
    { kg: "Ак", ru: "белый", audio: "ak.mp3" },
    { kg: "Кара", ru: "черный", audio: "kara.mp3" },
    { kg: "Фиолетовый", ru: "фиолетовый", audio: "violet.mp3" },
    { kg: "Розовый", ru: "розовый", audio: "pink.mp3" },
    { kg: "Голубой", ru: "голубой", audio: "lightblue.mp3" },
    { kg: "Темносиний", ru: "темно-синий", audio: "darkblue.mp3" },
  ];

  return (
    <div className="tus-container">
      <Navbar />
      <div className="tus-layout">
        <Sidebar />
        
        <main className="tus-main-content">
          <h1 className="tus-title">Түстөр</h1>

          {/* Сетка карандашей (3 в ряд сверху, 4 снизу как на картинке) */}
          <section className="tus-pencils-grid">
            {mainPencils.map((p) => (
              <div key={p.id} className="tus-pencil-card">
                <div className="tus-img-wrap">
                  <img src={`/src/assets/31tema/${p.img}`} alt={p.kg} />
                </div>
                <div className="tus-label-bubble">
                  <div className="tus-text-group">
                    <p className="tus-kg">{p.kg}</p>
                    <p className="tus-ru">{p.ru}</p>
                  </div>
                  <button className="tus-audio-btn" onClick={() => playAudio(p.audio)}>🔊</button>
                </div>
              </div>
            ))}
          </section>

          {/* Сетка примеров (словосочетания) */}
          <section className="tus-examples-list">
            {colorExamples.map((ex) => (
              <div key={ex.id} className="tus-ex-card">
                <div className="tus-ex-bubble">
                  <div className="tus-text-group">
                    <p className="tus-kg-large">{ex.kg}</p>
                    <p className="tus-ru-small">{ex.ru}</p>
                  </div>
                </div>
                <div className="tus-ex-image">
                  <img src={`/src/assets/31tema/${ex.img}`}  alt={ex.kg}
        style={ex.id === "e3" ? { width: "100px", height: "100px", objectFit: "contain" } : {}} />
                </div>
              </div>
            ))}
          </section>
        </main>

        <RightSidebar 
          words={wordsForRightMenu} 
          exerciseLink="/tus-exercise" 
          onWordClick={(audioName) => playAudio(audioName)}
        />
      </div>
    </div>
  );
}

export default Tus;