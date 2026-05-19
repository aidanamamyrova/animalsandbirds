import React from 'react';
import "./Dene.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";

let currentAudio = null;

const playAudio = (fileName) => {
  if (!fileName) return;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  const audio = new Audio(`/audio/${fileName}`);
  currentAudio = audio;
  audio.play().catch(err => console.log("Ошибка аудио:", err));
};

function Dene() {
  const bodyParts = [
    // Левая сторона (side: "left") - Текст слева, картинка справа
    { id: 1, kg: "көз", ru: "глаз", audio: "koz.mp3", top: "10%", left: "5%", img: "eye.png", side: "left" },
    { id: 3, kg: "мурун", ru: "нос", audio: "murun.mp3", top: "25%", left: "8%", img: "nose.png", side: "left" },
    { id: 4, kg: "ооз, тиш", ru: "рот, зубы", audio: "ooz_tish.mp3", top: "40%", left: "10%", img: "mouth.png", side: "left" },
    { id: 5, kg: "бут", ru: "нога", audio: "but.mp3", top: "65%", left: "0%", img: "legs.png", side: "left" },
    { id: 7, kg: "таман", ru: "стопа", audio: "taman.mp3", top: "85%", left: "20%", img: "foot.png", side: "left" },

    // Правая сторона (side: "right") - Картинка слева, текст справа
    { id: 8, kg: "баш", ru: "голова", audio: "bash.mp3", top: "5%", left: "65%", img: "head.png", side: "right" },
    { id: 9, kg: "кулак", ru: "ухо", audio: "kulak.mp3", top: "35%", left: "68%", img: "ear.png", side: "right" },
    { id: 10, kg: "алакан", ru: "ладонь", audio: "alakan.mp3", top: "55%", left: "68%", img: "palm.png", side: "right" },
    { id: 11, kg: "кол", ru: "рука", audio: "kol.mp3", top: "80%", left: "70%", img: "arm.png", side: "right" },
    { id: 6, kg: "тизе", ru: "колено", audio: "tize.mp3", top: "65%", left: "45%", img: "", side: "right" },
  ];

  const sentences = [
    { kg: "Менин эки көзүм бар", ru: "У меня есть два глаза", audio: "2koz.mp3" },
    { kg: "Менин эки кулагым бар", ru: "У меня есть два уха", audio: "2kulak.mp3" },
    { kg: "Менин эки колум бар", ru: "У меня есть две руки", audio: "2kol.mp3" },
    { kg: "Менин эки бутум бар", ru: "У меня есть две ноги", audio: "2but.mp3" },
  ];

  const wordsForRightMenu = [
    { kg: "Фиолетовый", ru: "", audio: "purple.mp3" },
    { kg: "Розовый", ru: "", audio: "pink.mp3" },
    { kg: "Голубой", ru: "", audio: "blue.mp3" },
    { kg: "Темносиний", ru: "", audio: "darkblue.mp3" },
  ];

  return (
    <div className="de-container">
      <Navbar />
      <div className="de-layout">
        <Sidebar />
        <main className="de-main-content">
          <h1 className="de-title">Дене мүчөлөрү</h1>

          <section className="de-body-map">
            <div className="de-image-wrapper">
              <img src="/src/assets/body/girl_body.png" alt="body" className="de-main-girl" />
              
              {bodyParts.map(part => (
                <div 
                  key={part.id} 
                  className={`de-item-container side-${part.side}`} 
                  style={{ top: part.top, left: part.left }}
                >
                  <div className="de-label-bubble">
                    <button className="de-audio-btn" onClick={() => playAudio(part.audio)}>🔊</button>
                    <div className="de-text-col">
                      <span className="de-kg-sm">{part.kg}</span>
                      <span className="de-ru-sm">{part.ru}</span>
                    </div>
                  </div>
                  
                  {part.img && (
                    <img src={`/src/assets/body/${part.img}`} alt={part.kg} className="de-part-img" />
                  )}
                </div>
              ))}
            </div>
          </section>

          <hr className="de-divider" />

          <section className="de-middle-section">
            <div className="de-poem-box">
              <p>Чогуу жаттайбыз:<br/>Башым, чачым, көзүм, кашым,<br/>Колум, бутум, тизем, ийиним,<br/>Оозум, мурдум, кулагым -<br/>Туура айтам мен баарын.</p>
            </div>
            <img src="/src/assets/6tema/azat.png" alt="boy" className="de-boy-img" />
            <div className="de-sentence-list">
              {sentences.map((s, i) => (
                <div key={i} className="de-s-item">
                  <p className="de-kg-text">{s.kg}</p>
                  <button className="de-audio-btn-small" onClick={() => playAudio(s.audio)}>🔊</button>
                </div>
              ))}
            </div>
          </section>

          <section className="de-bottom-grid">
            <div className="de-desc-card">
              <img src="/src/assets/3tema/boy_wave.png" alt="Azat" className="de-avatar" />
              <div className="de-desc-bubble">
                <p>Бул бала <button onClick={() => playAudio("b1.mp3")}>🔊</button></p>
                <p>Анын аты Азат <button onClick={() => playAudio("b2.mp3")}>🔊</button></p>
                <p>Азаттын көзү кичинекей <button onClick={() => playAudio("b3.mp3")}>🔊</button></p>
                <p>Азаттын кулагы кичинекей <button onClick={() => playAudio("b4.mp3")}>🔊</button></p>
              </div>
            </div>

            <div className="de-desc-card">
              <img src="/src/assets/3tema/girl_wave.png" alt="Ayana" className="de-avatar" />
              <div className="de-desc-bubble">
                <p>Бул кыз <button onClick={() => playAudio("g1.mp3")}>🔊</button></p>
                <p>Анын аты Аяна <button onClick={() => playAudio("g2.mp3")}>🔊</button></p>
                <p>Аянанын чачы узун <button onClick={() => playAudio("g3.mp3")}>🔊</button></p>
                <p>Аянанын көзү чоң <button onClick={() => playAudio("g4.mp3")}>🔊</button></p>
              </div>
            </div>
          </section>
        </main>
        <RightSidebar 
          words={wordsForRightMenu} 
          exerciseLink="/dene_exercise" 
          onWordClick={(audio) => playAudio(audio)} 
        />
      </div>
    </div>
  );
}

export default Dene;