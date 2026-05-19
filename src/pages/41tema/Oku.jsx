import React from 'react';
import "./Oku.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSidebar from "../../components/RightSidebar";

// Импорт изображений
import studentImg from "../../assets/5tema/student_boy.png"; // Ученик в центре
import backpackImg from "../../assets/31tema/backpack.png";
import bookImg from "../../assets/31tema/book.png";
import pencilImg from "../../assets/31tema/pencil.png";
import rulerImg from "../../assets/31tema/ruler.png";
import boardImg from "../../assets/31tema/board_desk.png";
import chalkImg from "../../assets/31tema/chalks.png";
import chairImg from "../../assets/31tema/chair_single.png";
import deskImg from "../../assets/31tema/desk_single.png";
import paintsImg from "../../assets/31tema/paints.png";
import notebookImg from "../../assets/31tema/notebook.png";
import sharpenerImg from "../../assets/31tema/sharpener.png";
import eraserImg from "../../assets/31tema/eraser.png";
import brushImg from "../../assets/31tema/brush.png";
import scissorsImg from "../../assets/31tema/scissors.png";

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


const Okuu = () => {
  // Слова для правого сайдбара
  const wordsForRightMenu = [
    { kg: "Окуу куралдары", ru: "Учебные принадлежности", audio: "Okuukuraldary.mp3" },
    { kg: "Китеп", ru: "Книга", audio: "Kitep.mp3" },
    { kg: "Дептер", ru: "Тетрадь", audio: "Menin.mp3" },
    { kg: "Калем", ru: "Карандаш", audio: "Kalem1.mp3" },
    { kg: "Өчүргүч", ru: "Ластик", audio: "Ochurguch.mp3" },
    { kg: "Сызгыч", ru: "Линейка", audio: "Syzgych.mp3" },
    { kg: "Жон баштык", ru: "Рюкзак", audio: "Jonbashtyk.mp3" },
  ];

  // Данные предметов для кругового расположения
  // Угол (angle) указан в градусах, 0 - это верх, далее по часовой стрелке
  const supplies = [
    { id: 1, kg: "Китеп", ru: "Книга", img: bookImg, angle: 8 },
    { id: 2, kg: "Сызгыч", ru: "Линейка", img: rulerImg, angle: 30 },
    { id: 3, kg: "Боёк", ru: "Краски", img: paintsImg, angle: 53 },
    { id: 4, kg: "Дептер", ru: "Тетрадь", img: notebookImg, angle: 81 },
    { id: 5, kg: "Учтагыч", ru: "Точилка", img: sharpenerImg, angle: 110 },
    { id: 6, kg: "Өчүргүч", ru: "Ластик", img: eraserImg, angle: 137 },
    { id: 7, kg: "Кыл калем", ru: "Кисть", img: brushImg, angle: 160 },
    { id: 8, kg: "Такта", ru: "Доска", img: boardImg, angle: 185 },
    { id: 9, kg: "Үстөл", ru: "Стол", img: deskImg, angle: 210 },
    { id: 10, kg: "Бор", ru: "Мел", img: chalkImg, angle: 235 }, // Чуть сдвинут
    { id: 11, kg: "Отургуч", ru: "Стул", img: chairImg, angle: 266 }, // Чуть сдвинут
    { id: 12, kg: "Калем", ru: "Карандаш", img: pencilImg, angle: 298 },
    { id: 13, kg: "Кайчы", ru: "Ножницы", img: scissorsImg, angle: 324 },
    { id: 14, kg: "Жон баштык", ru: "Рюкзак", img: backpackImg, angle: 347 },
  ];

  return (
    <div className="ok-page-wrapper">
      <Navbar />
      <div className="ok-content-layout">
        <Sidebar />

        <main className="ok-main-area">
          <h1 className="ok-main-title">Окуу куралдары</h1>

          <div className="ok-circle-container">
            {/* Центральное изображение */}
            <div className="ok-center-image-wrap">
              <img src={studentImg} alt="Student" className="ok-student-img" />
            </div>

            {/* Предметы вокруг */}
            {supplies.map((item) => {
              // Расчет координат для круга (радиус ~280px)
              const radius = 305;
              const angleRad = (item.angle - 90) * (Math.PI / 180); // Коррекция угла
              const left = 50 + (radius * Math.cos(angleRad)) / 7; // В процентах от контейнера (800px)
              const top = 50 + (radius * Math.sin(angleRad)) / 6; // В процентах от контейнера (600px)

              return (
                <div 
                  key={item.id} 
                  className="ok-supply-item-wrap"
                  style={{ 
                    left: `${left}%`, 
                    top: `${top}%`
                  }}
                >
                  <div className="ok-item-circle">
                    <img src={item.img} alt={item.kg} className="ok-supply-img" />
                  </div>
                  <div className="ok-text-block">
                    <span className="ok-kg-word">{item.kg} <button className="ok-audio-btn">🔊</button></span>
                    <span className="ok-ru-word">{item.ru}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        <RightSidebar words={wordsForRightMenu} 
        exerciseLink="/okuu-exercise"
                    onWordClick={(audioName) => playAudio(audioName)}

        />
      </div>
    </div>
  );
};

export default Okuu;