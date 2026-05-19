// pages/31tema/DeneExercise.jsx
import React, { useState, useRef } from 'react';
import ExerciseTemplate from '../../components/ExerciseTemplate';
import "../../components/ExerciseCommon.css";
import "./DeneExercise.css";

const DeneExercise = () => {
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  
  // Состояния для упражнений
  const [connections, setConnections] = useState([]);
  const [activeStart, setActiveStart] = useState(null);
  const [wrongDots, setWrongDots] = useState([]);
  const [correctDots, setCorrectDots] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  const [bodyPartAnswer, setBodyPartAnswer] = useState(null);
  const [bodyPartLocked, setBodyPartLocked] = useState(false);
  
  const [bodyPartAnswer2, setBodyPartAnswer2] = useState(null);
  const [bodyPartLocked2, setBodyPartLocked2] = useState(false);
  
  const [hairAnswer, setHairAnswer] = useState(null);
  const [hairLocked, setHairLocked] = useState(false);
  
  const [fillAnswer, setFillAnswer] = useState(null);
  const [fillLocked, setFillLocked] = useState(false);

  // Функция для воспроизведения звука
  const playSound = (audioFile) => {
    if (!audioEnabled) return;
    
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(`/src/assets/31tema/sounds/${audioFile}`);
      audioRef.current = audio;
      audio.play().catch(error => console.log("Audio play failed:", error));
    } catch (error) {
      console.log("Audio creation failed:", error);
    }
  };

  // Активация аудио при первом клике
  React.useEffect(() => {
    const enableAudio = () => {
      setAudioEnabled(true);
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    return () => {
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, []);

  // Данные для сопоставления (Шаг 1) - Дене мүчөлөрү (Слева картинки, справа слова)
  const matchingBodyParts = {
    left: [
      { id: 'l1', img: "head.png", text: "Баш", width: "80px" },
      { id: 'l2', img: "hand.png", text: "Кол", width: "80px" },
      { id: 'l3', img: "leg.png", text: "Бут", width: "80px" },
      { id: 'l4', img: "eye.png", text: "Көз", width: "80px" },
      { id: 'l5', img: "ear.png", text: "Кулак", width: "80px" },
      { id: 'l6', img: "nose.png", text: "Мурун", width: "80px" },
      { id: 'l7', img: "mouth.png", text: "Ооз", width: "80px" },
      { id: 'l8', img: "hair.png", text: "Чач", width: "80px" },
    ],
    right: [
      { id: 'r1', text: "Баш", audio: "bash.mp3" },
      { id: 'r2', text: "Кол", audio: "kol.mp3" },
      { id: 'r3', text: "Бут", audio: "but.mp3" },
      { id: 'r4', text: "Көз", audio: "koz.mp3" },
      { id: 'r5', text: "Кулак", audio: "kulak.mp3" },
      { id: 'r6', text: "Мурун", audio: "murun.mp3" },
      { id: 'r7', text: "Ооз", audio: "ooz.mp3" },
      { id: 'r8', text: "Чач", audio: "chach.mp3" },
    ],
    correct: { 
      'l1': 'r1', 'l2': 'r2', 'l3': 'r3', 'l4': 'r4',
      'l5': 'r5', 'l6': 'r6', 'l7': 'r7', 'l8': 'r8'
    }
  };

  // Данные для упражнения 2 - Бул эмне? (Кол, Бут, Тизе)
  const bodyOptions1 = [
    { id: 1, value: "Кол", correct: "Кол" },
    { id: 2, value: "Бут", correct: "Бут" },
    { id: 3, value: "тизе", correct: "тизе" }
  ];

  // Данные для упражнения 3 - Бул эмне? (Кол, Кирпик, ооз,тиш)
  const bodyOptions2 = [
    { id: 1, value: "Кол", correct: "Кол" },
    { id: 2, value: "Кирпик", correct: "Кирпик" },
    { id: 3, value: "ооз,тиш", correct: "ооз,тиш" }
  ];

  // Данные для упражнения 4 - Кыздын чачы кандай?
  const hairOptions = [
    { id: 1, value: "Узун", correct: "Узун" },
    { id: 2, value: "кыска", correct: "кыска" },
    { id: 3, value: "кичинекей", correct: "кичинекей" }
  ];

  // Данные для упражнения 5 - Толуктагыла
  const fillOptions = [
    { id: 1, value: "чачым", correct: "чачым" },
    { id: 2, value: "мурдум", correct: "мурдум" },
    { id: 3, value: "кулагым", correct: "кулагым" }
  ];

  // Функции для matching
  const isMatched = (id) => {
    return connections.some(conn => (conn.start.id === id || conn.end.id === id) && conn.isCorrect);
  };

  const handlePointClick = (id, side, e) => {
    if (isMatched(id)) return;
    
    const rect = e.target.getBoundingClientRect();
    const cRect = containerRef.current.getBoundingClientRect();
    const point = {
      x: rect.left + rect.width / 2 - cRect.left,
      y: rect.top + rect.height / 2 - cRect.top,
      id,
      side,
    };

    if (!activeStart) {
      setActiveStart(point);
      return;
    }

    if (activeStart.side !== side) {
      const isCorrect = side === 'right' 
        ? matchingBodyParts.correct[activeStart.id] === id 
        : matchingBodyParts.correct[id] === activeStart.id;

      setConnections(prev => [...prev, { start: activeStart, end: point, isCorrect }]);

      if (isCorrect) {
        setCorrectDots(prev => [...prev, activeStart.id, point.id]);
      } else {
        setWrongDots(prev => [...prev, activeStart.id, point.id]);
        setTimeout(() => {
          setWrongDots(prev => prev.filter(d => d !== activeStart.id && d !== point.id));
        }, 500);
      }
    }
    setActiveStart(null);
  };

  const getOptionClass = (optionValue, selected, correct) => {
    if (!selected) return "quiz-option";
    if (selected === optionValue) {
      return optionValue === correct ? "quiz-option correct-answer" : "quiz-option wrong-answer";
    }
    return "quiz-option disabled";
  };

  // Шаги упражнения
  const steps = [
    // Шаг 1: Дал келтиргиле (Слева картинки, справа слова с озвучкой)
    {
      banner: "Дал келтиргиле",
      content: (
        <div className="matching-area" ref={containerRef}>
          <svg className="arrows-svg">
            {connections.map((conn, i) => (
              <line key={i} x1={conn.start.x} y1={conn.start.y} x2={conn.end.x} y2={conn.end.y} 
                    stroke={conn.isCorrect ? "#66f877" : "#ff4d4d"} strokeWidth="3" />
            ))}
          </svg>
          <div className="matching-grid">
            {/* Левая колонка - картинки */}
            <div className="items-column">
              {matchingBodyParts.left.map(item => (
                <div key={item.id} className={`match-row left ${isMatched(item.id) ? 'matched' : ''}`}>
                  <img src={`/src/assets/31tema/${item.img}`} className="body-part-img" alt={item.text} />
                  <div className={`dot ${activeStart?.id === item.id ? 'active' : ''} ${wrongDots.includes(item.id) ? 'wrong-dot' : ''} ${correctDots.includes(item.id) ? 'correct-dot' : ''}`} 
                       onClick={(e) => handlePointClick(item.id, 'left', e)}></div>
                </div>
              ))}
            </div>
            {/* Правая колонка - слова с озвучкой */}
            <div className="items-column">
              {matchingBodyParts.right.map(item => (
                <div key={item.id} className={`match-row right ${isMatched(item.id) ? 'matched' : ''}`}>
                  <div className={`dot ${wrongDots.includes(item.id) ? 'wrong-dot' : ''} ${correctDots.includes(item.id) ? 'correct-dot' : ''}`} 
                       onClick={(e) => handlePointClick(item.id, 'right', e)}></div>
                  <div className="bubble-text right">
                    {item.text}
                    <button 
                      className="sound-btn-small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        playSound(item.audio);
                      }}
                      disabled={!audioEnabled}
                    >
                      🔊
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!audioEnabled && (
            <div className="audio-warning">🔈 Үндү угуу үчүн экранды басыңыз</div>
          )}
        </div>
      ),
      checkAnswer: () => {
        const allCorrect = Object.keys(matchingBodyParts.correct).length === connections.filter(c => c.isCorrect).length;
        return allCorrect && connections.length > 0 ? true : (connections.length > 0 ? false : null);
      }
    },
    // Шаг 2: Бул эмне? (Кол, Бут, Тизе)
    {
      banner: "Бул эмне?",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src="/src/assets/31tema/knee.png" className="task-img-large" alt="body part" />
          </div>
          <p className="question-kg">Бул эмне?</p>
          <div className="quiz-options-horizontal">
            {bodyOptions1.map(opt => (
              <button 
                key={opt.id}
                className={getOptionClass(opt.value, bodyPartAnswer, opt.correct)}
                onClick={() => !bodyPartLocked && setBodyPartAnswer(opt.value)}
                disabled={bodyPartLocked}
              >
                {opt.value}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (!bodyPartAnswer) return null;
        return bodyPartAnswer === "тизе";
      }
    },
    // Шаг 3: Бул эмне? (Кол, Кирпик, ооз,тиш)
    {
      banner: "Бул эмне?",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src="/src/assets/31tema/eyelash.png" className="task-img-large" alt="body part" />
          </div>
          <p className="question-kg">Бул эмне?</p>
          <div className="quiz-options-horizontal">
            {bodyOptions2.map(opt => (
              <button 
                key={opt.id}
                className={getOptionClass(opt.value, bodyPartAnswer2, opt.correct)}
                onClick={() => !bodyPartLocked2 && setBodyPartAnswer2(opt.value)}
                disabled={bodyPartLocked2}
              >
                {opt.value}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (!bodyPartAnswer2) return null;
        return bodyPartAnswer2 === "Кирпик";
      }
    },
    // Шаг 4: Кыздын чачы кандай?
    {
      banner: "Кыздын чачы кандай?",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src="/src/assets/31tema/girl_hair.png" className="task-img-large" alt="girl with long hair" />
          </div>
          <p className="question-kg">Кыздын чачы кандай?</p>
          <div className="quiz-options-horizontal">
            {hairOptions.map(opt => (
              <button 
                key={opt.id}
                className={getOptionClass(opt.value, hairAnswer, opt.correct)}
                onClick={() => !hairLocked && setHairAnswer(opt.value)}
                disabled={hairLocked}
              >
                {opt.value}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (!hairAnswer) return null;
        return hairAnswer === "Узун";
      }
    },
    // Шаг 5: Толуктагыла
    {
      banner: "Толуктагыла",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src="/src/assets/31tema/face.png" className="task-img-large" alt="face" />
          </div>
          <p className="question-kg">Менин эки ___ бар</p>
          <div className="quiz-options-horizontal">
            {fillOptions.map(opt => (
              <button 
                key={opt.id}
                className={getOptionClass(opt.value, fillAnswer, opt.correct)}
                onClick={() => !fillLocked && setFillAnswer(opt.value)}
                disabled={fillLocked}
              >
                {opt.value}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (!fillAnswer) return null;
        return fillAnswer === "кулагым";
      }
    }
  ];

  const handleReset = () => {
    setConnections([]);
    setActiveStart(null);
    setWrongDots([]);
    setCorrectDots([]);
    setBodyPartAnswer(null);
    setBodyPartLocked(false);
    setBodyPartAnswer2(null);
    setBodyPartLocked2(false);
    setHairAnswer(null);
    setHairLocked(false);
    setFillAnswer(null);
    setFillLocked(false);
  };

  return (
    <ExerciseTemplate
      title="Дене мүчөлөрү / көнүгүү"
      steps={steps}
      totalSteps={5}
      onReset={handleReset}
      containerClass="dene-exercise"
    />
  );
};

export default DeneExercise;