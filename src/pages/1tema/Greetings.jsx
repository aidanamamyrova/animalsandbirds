import React from 'react';
import "./Greetings.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";

let currentAudio = null;
let currentFile = null;



function Greetings() {


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

  const wordsForRightMenu = [
    { kg: "Салам", ru: "Привет", audio: "Salam.mp3" },
    { kg: "Саламатсызбы", ru: "Здравствуйте", audio: "Salamatsyzby.mp3" },
    { kg: "Саламатчылык", ru: "Ответ", audio: "Salamatchylyk.mp3" },
    { kg: "Кандайсың", ru: "Как ты", audio: "Kandaisyn.mp3" },
    { kg: "Балдар", ru: "Дети", audio: "Baldar.mp3" },
    { kg: "Мугалим", ru: "Учитель", audio: "Mugalim.mp3" },
    { kg: "Жакшы", ru: "Хорошо", audio: "Jakshy.mp3" },
  ];

  return (
    <div className="greetings-page">
      <Navbar />
      <div className="layout-wrapper">
        <Sidebar />

        <main className="center-content">
          <h1 className="page-title">Саламдашуу</h1>

          {/* Ряд 1 */}
          <div className="dialogue-group">
            <div className="person-box">
              <div className="bubble pos-top">
                <div className="bubble-content">
                  <span className="kg-word">
                    Салам Айбек <AudioIcon file="Salam_aibek.mp3" />
                  </span>
                  <span className="ru-word">Привет Айбек</span>
                </div>
              </div>
              <img src="/src/assets/1tema/askar_walk.png" alt="" />
            </div>

            <div className="person-box">
              <div className="bubble pos-top1">
                <div className="bubble-content">
                  <span className="kg-word">
                    Салам Асан <AudioIcon file="Salam_asan.mp3" />
                  </span>
                  <span className="ru-word">Привет Асан</span>
                </div>
              </div>
              <img src="/src/assets/1tema/joldosh_walk.png" alt="" />
            </div>
          </div>

          {/* Ряд 2 */}
          <div className="dialogue-group">
            <div className="person-box">
              <div className="bubble top-left">
                <div className="bubble-content">
                  <span className="kg-word">
                    Саламатчылык <AudioIcon file="Salamatchylyk.mp3" />
                  </span>
                  <span className="ru-word">Ответ</span>
                </div>
              </div>

              <div className="bubble bottom-right">
                <div className="bubble-content">
                  <span className="kg-word">
                    Саламатсызбы <AudioIcon file="Salamatsyzby.mp3" />
                  </span>
                  <span className="ru-word">Здравствуйте</span>
                </div>
              </div>

              <img src="/src/assets/1tema/handshake.png" alt="" />
            </div>

            <div className="person-box-small-group">
              <div className="person-box">
                <div className="bubble pos-top">
                  <div className="bubble-content">
                    <span className="kg-word">
                      Салам Айгерим <AudioIcon file="Aigerim.mp3" />
                    </span>
                    <span className="ru-word">Привет Айгерим</span>
                  </div>
                </div>
                <img src="/src/assets/1tema/girl1.png" alt="" />
              </div>

              <div className="person-box">
                <div className="bubble pos-top">
                  <div className="bubble-content">
                    <span className="kg-word">
                      Салам Айдай <AudioIcon file="Aidai.mp3" />
                    </span>
                    <span className="ru-word">Привет Айдай</span>
                  </div>
                </div>
                <img src="/src/assets/1tema/girl2.png" alt="" />
              </div>
            </div>
          </div>

          {/* Ряд 3 */}
          <div className="dialogue-group">
            <div className="person-box">
              <div className="bubble teacher-left">
                <div className="bubble-content">
                  <span className="kg-word">
                    Саламатсыңарбы балдар? <AudioIcon file="Baldar.mp3" />
                  </span>
                  <span className="ru-word">Здравствуйте дети?</span>
                </div>
              </div>

              <div className="bubble teacher-right">
                <div className="bubble-content">
                  <span className="kg-word">
                    Саламатсызбы эже? <AudioIcon file="Salamatsyzby.mp3" />
                  </span>
                  <span className="ru-word">Здравствуйте учительница?</span>
                </div>
              </div>

              <img src="/src/assets/1tema/teacher.png" className="teacher-img" alt="" />
            </div>

            <div className="person-box">
              <div className="bubble bektur-left">
                <div className="bubble-content">
                  <span className="kg-word">
                    Кандайсыз? <AudioIcon file="Kandaisyn.mp3" />
                  </span>
                  <span className="ru-word">Как вы?</span>
                </div>
              </div>

              <div className="bubble bektur-right">
                <div className="bubble-content">
                  <span className="kg-word">
                    Жакшы <AudioIcon file="Jakshy.mp3" />
                  </span>
                  <span className="ru-word">Хорошо</span>
                </div>
              </div>

              <img src="/src/assets/1tema/bektur.png" alt="" />
            </div>
          </div>
        </main>

        <RightSidebar 
          words={wordsForRightMenu} 
          exerciseLink="/salam-exercise" 
          onWordClick={(audioName) => playAudio(audioName)}
        />
      </div>
    </div>
  );
}

export default Greetings;