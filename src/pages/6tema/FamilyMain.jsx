import React from 'react';
import "./FamilyMain.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from '../../components/RightSidebar';

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

function FamilyMain() {
  const mainFamily = [
    { id: "me", name: "Мен", translate: "Я", img: "me.png", pos: "pos-me", audio: "Men.mp3" },
    { id: "mother", name: "Апа", translate: "Мама", img: "mother.png", pos: "pos-mother" },
    { id: "father", name: "Ата", translate: "Папа", img: "father.png", pos: "pos-father" },
    { id: "grandma", name: "Чоң апа", translate: "Бабушка", img: "grandma.png", pos: "pos-grandma" },
    { id: "grandpa", name: "Чоң ата", translate: "Дедушка", img: "grandpa.png", pos: "pos-grandpa" },
  ];
  const relatives = [
    { name: "Эже", translate: "Старшая сестра", img: "sister_big.png" },
    { name: "Байке", translate: "Старший брат", img: "brother_big.png" },
    { name: "Сиңди", translate: "Младшая сестра", img: "sister_small.png" },
    { name: "Ини", translate: "Младший брат", img: "brother_small.png" },
  ];

const familyIntro = [
    { name: "Бул мен, менин атым Азат. мен 5 жаштамын", ru: "Это я, меня зовут Азат, мне 5", img: "azat.png" },
    { name: "Бул менин атам жана апам", ru: "Это мои мама и папа", img: "parents.png" },
    { name: "Мен чоң атамды, чоң апамды жакшы көрөм", ru: "Я люблю свою бабушку и дедушку", img: "grandparents1.png" },
    { name: "Бул менин таятам жана таенем", ru: "Это мои бабушка и дедушка (со стороны матери)", img: "grandparents2.png" },
  ];

  const siblings = [
    { name: "Бул менин эжем, Эжемдин аты Анара Ал 12 жашта", ru: "Это моя сестра, ее зовут Анара, ей 12", img: "sister_big.png" },
    { name: "Бул мен байкем, Байкемдин аты Жолдош, Ал 10 жашта", ru: "Это мой брат, его зовут Жолдош, ему 10", img: "brother_big.png" },
    { name: "Бул мен карындашым ал 3 жашта", ru: "Это моя сестренка, ей 3 года", img: "sister_small.png" },
    { name: "Бул мен иним, ал 1 жашта", ru: "Это мой младший брат, ему 1 год", img: "brother_small.png" },
  ];

   const wordsForRightMenu = [
    { kg: "менин", ru: "мой, моя, мое", audio: "Menin.mp3" },
    { kg: "мектеп", ru: "школа", audio: "Mektep.mp3" },
    { kg: "эмне", ru: "что", audio: "Emne.mp3" },
    { kg: "ким", ru: "кто" , audio: "Kim.mp3"},
    { kg: "балдар", ru: "дети", audio: "Baldar.mp3" },
  ];

 return (
    <div className="main-container">
      <Navbar />
      <div className="layout">
        <Sidebar />
        <div className="family-content">
          <h1 className="family-title">Менин үй-бүлөм</h1>

          <div className="hand-section">
            <div className="hand-container">
              {/* Увеличили саму ладонь */}
              <img src="/src/assets/6tema/hand.png" className="hand-img" alt="hand" />
              
              {mainFamily.map((member) => (
                <div key={member.id} className={`member-node ${member.pos}`}>
                  <div className="avatar-wrapper main-family-avatar">
                    <img src={`/src/assets/6tema/${member.img}`} alt={member.name} />
                  </div>
                  <div className="label-block">
                    <div className="name-row">
                      <span>{member.name}</span>
                      <button className="sound-btn-small">🔊</button>
                    </div>
                    <small className="gray-translate">{member.translate}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Нижняя часть - сетка родственников */}
          <div className="relatives-grid">
            {relatives.map((rel, index) => (
              <div key={index} className="rel-card">
                <div className="avatar-wrapper small">
                  <img src={`/src/assets/6tema/${rel.img}`} alt={rel.name} />
                </div>
                <div className="label-block">
                  <div className="name-row">
                    <span>{rel.name}</span>
                    <button className="sound-btn-small">🔊</button>
                  </div>
                  <small className="gray-translate">{rel.translate}</small>
                </div>
              </div>
            ))}
          </div>

          {/* 1. Общая фотография семьи (Верхняя часть изображения) */}
          <div className="family-banner">
            <img src="/src/assets/6tema/all_family.png" alt="Вся семья" className="full-family-img" />
          </div>

        
            <div className="banner-label">
              <span>Бул биздин үй бүлөө</span>
              <button className="sound-btn-small">🔊</button>
            </div>
            
          {/* 2. Сетка основных членов семьи с описанием */}
          <div className="family-intro-grid">
            {familyIntro.map((item, index) => (
              <div key={index} className="intro-card">
                <img src={`/src/assets/6tema/${item.img}`} alt="family" />
                <div className="card-text">
                  <div className="kg-row">
                    <p>{item.name}</p>
                    <button className="sound-btn-small">🔊</button>
                  </div>
                  <small className="ru-text">{item.ru}</small>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Раздел "Бир туугандар" (Братья и сестры) */}
          <div className="siblings-section">
            <h2 className="section-divider">Бир туугандар</h2>
            <div className="family-intro-grid">
              {siblings.map((item, index) => (
                <div key={index} className="intro-card">
                  <img src={`/src/assets/6tema/${item.img}`} alt="sibling" />
                  <div className="card-text">
                    <div className="kg-row">
                      <p>{item.name}</p>
                      <button className="sound-btn-small">🔊</button>
                    </div>
                    <small className="ru-text">{item.ru}</small>
                    
                  </div>
                </div>
                
              ))}
              
            </div>
          </div>

          {/* 4. Блок "Запомните" (Нижняя желтая панель на фото) */}
          <div className="grammar-note-container">
            <div className="grammar-card yellow-bg">
              <div className="grammar-left">
                <h3>Запомните:</h3>
                <p>Мой / Моя / Мое</p>
              </div>
              <div className="grammar-middle">
                <span className="suffix-formula">-м (-ым)</span>
              </div>
              <div className="grammar-right">
                <p>мама-апа → <strong>моя мама - менин апам</strong></p>
                <p>сестра - эжем → <strong>моя сестра - менин эжем</strong></p>
              </div>
            </div>
          </div>


        </div>

<RightSidebar 
  words={wordsForRightMenu} 
  exerciseLink="/family-exercise" 
              onWordClick={(audioName) => playAudio(audioName)}

/>      </div>
    </div>
  );
}

export default FamilyMain;