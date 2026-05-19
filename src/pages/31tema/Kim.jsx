import React from 'react';
import "./Kim.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";

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

function Kim() {

  const kimSections = [
    {
      title: "Бул ким?",
      ru: "Кто это?",
      audio: "Bulkim.mp3",
      color: "yellow",
      items: [
        { kg: "Бул кыз. Аты Анара", ru: "Девочка. Анара", img: "girl.png", audio: "Bulkyz.mp3" },
        { kg: "Бул бала. Аты Азат", ru: "Мальчик. Азат", img: "boy.png", audio: "Bulbala.mp3" },
        { kg: "Мугалим", ru: "Учитель", img: "teacher.png", audio: "Mugalim.mp3" },
      ]
    },
    {
      title: "Булар кимдер?",
      ru: "Кто они?",
      audio: "Bularkimder.mp3",
      color: "yellow",
      items: [
        { kg: "Балдар", ru: "Мальчики", img: "boys_group.png", audio: "Baldar.mp3" },
        { kg: "Окуучулар", ru: "Ученики", img: "students_group.png", audio: "Okuuchular.mp3" },
        { kg: "Кыздар", ru: "Девочки", img: "girls_group.png", audio: "Kyzdar.mp3" },
      ]
    },
    {
      title: "Бул эмне?",
      ru: "Что это?",
      audio: "Bulemne.mp3",
      color: "green",
      items: [
        { kg: "Китеп", ru: "Книга", img: "book.png", audio: "Kitep.mp3" },
        { kg: "Мектеп", ru: "Школа", img: "school_main.png", audio: "Mektep.mp3" },
        { kg: "Такта", ru: "Доска", img: "board_desk.png", audio: "Takta.mp3" },
      ]
    },
    {
      title: "Булар эмнелер?",
      ru: "Что это? (мн.ч.)",
      audio: "Bularemneler.mp3",
      color: "green",
      items: [
        { kg: "Китептер", ru: "Книги", img: "books.png", audio: "Kitepter1.mp3" },
        { kg: "Калемдер", ru: "Карандаши", img: "pencils.png", audio: "Kalemder.mp3" },
        { kg: "Такталар", ru: "Доски", img: "boards.png", audio: "Taktalar.mp3" },
      ]
    }
  ];

  const wordsForRightMenu = [
    { kg: "Ким?", ru: "Кто?", audio: "Kim.mp3" },
    { kg: "Эмне?", ru: "Что?", audio: "Emne.mp3" },
    { kg: "Бул", ru: "Это", audio: "Bul.mp3" },
    { kg: "Мектеп", ru: "Школа", audio: "Mektep.mp3" },
    { kg: "Окуучу кыз", ru: "Ученица", audio: "Okuuchukyz.mp3" },
    { kg: "Окуучу бала", ru: "Ученик", audio: "Okuuchubala.mp3" },
    { kg: "Мугалим", ru: "Учительница", audio: "Mugalim.mp3" },
    { kg: "Китеп", ru: "Книга", audio: "Kitep.mp3" },
    { kg: "Такта", ru: "Доска", audio: "Takta.mp3" },
  ];

  return (
    <div className="kim-page">
      <Navbar />
      <div className="layout-wrapper">
        <Sidebar />

        <main className="kim-content">
          <h1 className="main-title">Ким? Эмне?</h1>

          {kimSections.map((section, index) => (
            <section key={index} className="kim-section">

               {index === 2 && <hr className="section-divider" />}

              {/* Заголовок */}
              <div className={`question-header ${section.color}`}>
                {section.title}
                <button 
                  className="audio-btn"
                  onClick={() => playAudio(section.audio)}
                >
                  🔊
                </button>
                <div className="trans-ru">{section.ru}</div>
              </div>

              {/* Карточки */}
              <div className="items-grid">
                {section.items.map((item, i) => (
                  <div key={i} className="kim-card">
                    <img src={`/src/assets/31tema/${item.img}`} alt="" />
                    
                    <div className={`caption ${section.color}-cap`}>
                    
                      
                    <div className="kg-row">
    <span>{item.kg}</span>
    <button 
      className="audio-btn"
      onClick={() => playAudio(item.audio)}
    >
                        🔊
                      </button>
                       </div>
                      <div className="trans-ru">{item.ru}</div>
                    </div>

                  </div>
                ))}
              </div>

            </section>
          ))}

        </main>

        <RightSidebar 
          words={wordsForRightMenu} 
          exerciseLink="/kim-exercise" 
          onWordClick={(audioName) => playAudio(audioName)}
        />

      </div>
    </div>
  );
}

export default Kim;