import React from 'react';
import "./Mektep.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";

import schoolMain from "../../assets/4tema/school_main.png"; 
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

  //  если другой звук — остановить старый
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  //  новый звук
  const audio = new Audio(`/audio/${fileName}`);
  currentAudio = audio;
  currentFile = fileName;

  audio.play().catch(err => console.log("Ошибка:", err));

  audio.onended = () => {
    currentAudio = null;
    currentFile = null;
  };
};

function Mektep() {
  const schoolIntro = [
    { id: "s1", kg: "Бул биздин мектеп", ru: "Это наша школа", audio: "Bulbizdin.mp3" },
    { id: "s2", kg: "Биздин мектеп кооз", ru: "Наша школа красивая", audio: "Bizdinmektep.mp3" },
    { id: "s3", kg: "Биздин мектеп жарык", ru: "Наша школа светлая", audio: "Bizdinjaryk.mp3" },
  ];

  const cards = [
    { id: 1, text: "Бул биздин мугалим эже. Анын аты Айгүл Муратовна", translation: "Это наша учительница. Ее зовут Айгуль Муратовна", img: "teacher_eje.png", audio: "Bizdinmugalim.mp3" },
    { id: 2, text: "Бул биздин мугалим агай. Анын аты Марат Айтиев", translation: "Это наш учитель. Его зовут Марат Айтиев", img: "teacher_agai.png", audio: "Bizdinagai.mp3"  },
    { id: 3, text: "Бул окуучу бала. Анын аты Азат. Азат мектепке барат", translation: "Это ученик. Его зовут Азат. Азат идет в школу", img: "boy_azat.png", audio: "Atyazat.mp3"  },
    { id: 4, text: "Бул окуучу кыз. Анын аты Айдай. Айдай мектепке барат", translation: "Это ученица. Ее зовут Айдай. Айдай идет в школу", img: "girl_aiday.png", audio: "Atyaidai.mp3"  },
    { id: 5, text: "Бул Назик, Ал сабак жазат", translation: "Назик пишет урок", img: "nazik_writing.png", audio: "Bulnazik.mp3"  },
    { id: 6, text: "Булар окуучулар. Алар мектепке барышат", translation: "Это ученики. Ученики идут в школу", img: "students_group.png", audio: "Bularokuuchular.mp3"  },
    { id: 7, text: "Окуучулар китеп окушат", translation: "Ученики читают книгу", img: "students_reading.png", audio: "Okuuchilarkitep.mp3"  },
    { id: 8, text: "Мугалим окутат", translation: "Учитель обучает", img: "teacher_teaching.png", audio: "Mugalimokutat.mp3" },
  ];

  const wordsForRightMenu = [
    { kg: "менин", ru: "мой, моя, мое", audio: "Menin.mp3" },
    { kg: "мектеп", ru: "школа", audio: "Mektep.mp3" },
    { kg: "агай", ru: "учитель", audio: "Agai.mp3" },
    { kg: "окуучу кыз", ru: "ученица", audio: "Okuuchukyz.mp3" },
    { kg: "окуучу бала", ru: "ученик", audio: "Okuuchubala.mp3" },
    { kg: "кооз", ru: "красивый", audio: "Kooz.mp3" },
    { kg: "жарык", ru: "светло", audio: "Jaryk.mp3" },
    { kg: "жазат", ru: "пишет", audio: "Jazat.mp3" },
    { kg: "окуйт", ru: "читает", audio: "Okuit.mp3" },
    { kg: "барат", ru: "идет", audio: "Barat.mp3" },
  ];

  return (
    <div className="mt-container">
      <Navbar />
      <div className="mt-layout">
        <Sidebar />
        
        <main className="mt-main-content">
          <h1 className="mt-title">Мен мектепке барам</h1>

          {/* Верхний блок с изображением школы */}
          <section className="mt-school-header">
            <div className="mt-image-container">
              <img src={schoolMain} alt="Мектеп" className="mt-school-img" />
            </div>
            <div className="mt-intro-list">
              {schoolIntro.map(item => (
                <div key={item.id} className="mt-intro-bubble">
                  <div className="mt-bubble-text">
                    <p className="mt-kg">{item.kg}</p>
                    <p className="mt-ru">{item.ru}</p>
                  </div>
                  <button className="mt-audio-btn"  onClick={() => playAudio(item.audio)}>  🔊</button>
                </div>
              ))}
            </div>
          </section>

          {/* Сетка основных карточек */}
          <section className="mt-grid">
            {cards.map((card) => (
              <div key={card.id} className="mt-card">
                <div className="mt-card-media">
                  <img src={`/src/assets/4tema/${card.img}`} alt="урок" />
                </div>
                <div className="mt-card-body">
                  <div className="mt-card-text">
                    <p className="mt-card-kg">{card.text}</p>
                    <p className="mt-card-ru">{card.translation}</p>
                  </div>
                  <button className="mt-audio-btn" onClick={() => playAudio(card.audio)}> 🔊</button>
                </div>
              </div>
            ))}
          </section>
        </main>

<RightSidebar 
  words={wordsForRightMenu} 
  exerciseLink="/mektep-exercise" 
            onWordClick={(audioName) => playAudio(audioName)}

/>      </div>
    </div>
  );
}

export default Mektep;