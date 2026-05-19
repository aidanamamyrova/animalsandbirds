import React from 'react';
import "./Klass.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";
import classroomMain from "../../assets/5tema/classroom.png"; 

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

const playSound = (audio) => {
  const sound = new Audio(audio);
  sound.play();
};

function Klass() {
  const classIntro = [
    { id: "c1", kg: "Бул биздин класс", ru: "Это наш класс", audio: "Bizdinklass.mp3" },
    { id: "c2", kg: "Биздин класс таза жана жарык", ru: "Наш класс чистый и светлый", audio: "Tazajaryk.mp3"},
    { id: "c3", kg: "Биздин класс чоң", ru: "Наш класс большой", audio: "Klasschon.mp3" },
  ];

  const classItems = [
    { id: 1, kg: "Класста такта жана парталар бар", ru: "В классе есть доска и парты", img: "board_desk.png", audio: "Taktaparta.mp3" },
    { id: 2, kg: "Класста кичинекей отургучтар бар", ru: "В классе есть маленькие стулья", img: "chairs.png", audio: "Oturguchtarbar.mp3"},
    { id: 3, kg: "Класста чоң терезелер бар", ru: "В классе есть большие окна", img: "windows.png", audio: "Chontereze.mp3" },
    { id: 4, kg: "Класста шкаф жана эшик бар", ru: "В классе есть шкаф и дверь", img: "cupboard_door.png", audio: "Shkafeshik.mp3" },
    { id: 5, kg: "Класста кимдер бар? Класста окуучулар бар", ru: "Кто есть в классе? В классе есть ученики", img: "students_in_class.png", audio: "Klasstakimder.mp3" },
    { id: 6, kg: "Класста ким бар? Класста мугалим бар", ru: "Кто есть в классе? В классе есть учитель", img: "answering.png", audio: "Klasstakim.mp3" },
  ];

  const wordsForRightMenu = [
    { kg: "класс", ru: "класс", audio: "Klass.mp3" },
    { kg: "таза", ru: "чистый", audio: "Taza.mp3" },
    { kg: "чоң", ru: "большой", audio: "Chon.mp3" },
    { kg: "такта", ru: "доска", audio: "Takta.mp3" },
    { kg: "парта", ru: "парта", audio: "Parta.mp3" },
    { kg: "отургуч", ru: "стул", audio: "Oturguch.mp3" },
    { kg: "терезе", ru: "окно", audio: "Tereze.mp3" },
    { kg: "шкаф", ru: "шкаф", audio: "Shkaf.mp3" },
    { kg: "эшик", ru: "дверь", audio: "Eshik.mp3" },
  ];

  return (
    <div className="kl-container">
      <Navbar />
      <div className="kl-layout">
        <Sidebar />
        
        <main className="kl-main-content">
          <h1 className="kl-title">Бул менин классым</h1>

          {/* Верхний блок с иллюстрацией класса */}
          <section className="kl-header-section">
            <div className="kl-image-main-wrap">
              <img src={classroomMain} alt="Класс" className="kl-main-img" />
            </div>
            <div className="kl-intro-bubbles">
              {classIntro.map(item => (
                <div key={item.id} className="kl-bubble-row">
                  <div className="kl-text-content">
                    <p className="kl-kg">{item.kg}</p>
                    <p className="kl-ru">{item.ru}</p>
                  </div>
<button 
  className="kl-audio-btn"
  onClick={() => playAudio(item.audio)}
>
  🔊
</button>           
 </div>
              ))}
            </div>
          </section>

          {/* Сетка предметов и людей в классе */}
          <section className="kl-items-grid">
            {classItems.map((item) => (
              <div key={item.id} className="kl-item-card">
                {/* Условная отрисовка: фото слева или справа как в макете */}
                {item.id <= 4 ? (
                  <>
                    <div className="kl-item-text-box">
                      <div className="kl-text-content">
                        <p className="kl-kg">{item.kg}</p>
                        <p className="kl-ru">{item.ru}</p>
                      </div>
<button 
  className="kl-audio-btn"
  onClick={() => playAudio(item.audio)}
>
  🔊
</button>                    </div>
                    <div className="kl-item-media">
                      <img src={`/src/assets/5tema/${item.img}`} alt="предмет" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="kl-item-media">
                      <img src={`/src/assets/5tema/${item.img}`} alt="люди" />
                    </div>
                    <div className="kl-item-text-box">
                      <div className="kl-text-content">
                        <p className="kl-kg">{item.kg}</p>
                        <p className="kl-ru">{item.ru}</p>
                      </div>
<button 
  className="kl-audio-btn"
  onClick={() => playAudio(item.audio)}
>
  🔊
</button>                    </div>
                  </>
                )}
              </div>
            ))}
          </section>
        </main>

<RightSidebar 
  words={wordsForRightMenu} 
  exerciseLink="/klass-exercise" 
    onWordClick={(audioName) => playAudio(audioName)}

/>      </div>
    </div>
  );
}

export default Klass;