// pages/1tema/GreetingsExercise.jsx
import React, { useState, useRef } from 'react';
import ExerciseTemplate from '../../components/ExerciseTemplate';
import '../../components/ExerciseCommon.css'; 
import "./Exercise.css";

const GreetingsExercise = () => {
  const containerRef = useRef(null);
  
  // Состояния для упражнений
  const [connections, setConnections] = useState([]);
  const [activeStart, setActiveStart] = useState(null);
  const [placedLetters, setPlacedLetters] = useState(Array(5).fill(null));
  const [placedCaptions, setPlacedCaptions] = useState({});
  const [selectedAnswer1, setSelectedAnswer1] = useState(null);
  const [selectedAnswer2, setSelectedAnswer2] = useState(null);
  const [quizLocked1, setQuizLocked1] = useState(false);
  const [quizLocked2, setQuizLocked2] = useState(false);

  // Данные
  const matchingData = {
    left: [
      { id: 'l1', text: "Саламатсыңарбы балдар?", img: "teacher_eje.png", width: "70px" },
      { id: 'l2', text: "Салам Айжан", img: "girl1.png", width: "115px" },
    ],
    right: [
      { id: 'r1', text: "Саламатсызбы эже?", img: "group_students.png", width: "135px" },
      { id: 'r3', text: "Салам Айдай", img: "girl2.png", width: "95px" },
    ],
    correct: { 'l1': 'r1', 'l2': 'r3' }
  };

  const correctScramble = ["С", "А", "Л", "А", "М"];
  const correctCaptions = {
    1: "Саламатсызбы чоң ата?",
    2: "Салам Айдай",
    3: "Саламатсызбы"
  };

  const scrambleLetters = ["С", "А", "М", "Л", "А"];

  const quizData1 = {
    question: "Кандайсын?",
    image: "bektur.png",
    options: ["Жакшы", "Саламатчылык", "Кандайсыз?"],
    correct: "Жакшы"
  };

  const quizData2 = {
    question: "Саламатсызбы чоң апа?",
    image: "chonapa.png",
    options: ["Салам Айдай", "Саламатсызбы", "Саламатчылык"],
    correct: "Саламатчылык"
  };

  // Вспомогательные функции
  const isMatched = (id) => connections.some(conn => (conn.start.id === id || conn.end.id === id) && conn.isCorrect);

  const handlePointClick = (id, side, e) => {
    if (isMatched(id)) return;
    const rect = e.target.getBoundingClientRect();
    const cRect = containerRef.current.getBoundingClientRect();
    const currentPoint = { x: rect.left + rect.width / 2 - cRect.left, y: rect.top + rect.height / 2 - cRect.top, id, side };

    if (!activeStart) { 
      setActiveStart(currentPoint); 
    } else {
      if (activeStart.side !== side) {
        const isCorrect = side === 'right' ? matchingData.correct[activeStart.id] === id : matchingData.correct[id] === activeStart.id;
        const newConnections = [...connections, { start: activeStart, end: currentPoint, isCorrect }];
        setConnections(newConnections);
      }
      setActiveStart(null);
    }
  };

  const handleDragStart = (e, content, type) => {
    e.dataTransfer.setData("content", content);
    e.dataTransfer.setData("type", type);
  };

  const handleDropToLetterSlot = (e, index) => {
    e.preventDefault();
    const content = e.dataTransfer.getData("content");
    if (e.dataTransfer.getData("type") === "letter") {
      const newLetters = [...placedLetters];
      newLetters[index] = content;
      setPlacedLetters(newLetters);
    }
  };

  const handleDropToCaptionSlot = (e, slotId) => {
    e.preventDefault();
    const content = e.dataTransfer.getData("content");
    setPlacedCaptions(prev => ({ ...prev, [slotId]: content }));
  };

  const getLetterClass = (char, index) => {
    if (!char) return "drop-slot";
    return char === correctScramble[index] ? "drop-slot correct" : "drop-slot wrong";
  };

  const getCaptionClass = (id) => {
    const placed = placedCaptions[id];
    if (!placed) return "drop-zone-green";
    return placed === correctCaptions[id] ? "drop-zone-green correct" : "drop-zone-green wrong";
  };

  const getOptionClass = (option, selected, correct) => {
    if (!selected) return "quiz-option";
    if (selected === option) {
      return option === correct ? "quiz-option correct-answer" : "quiz-option wrong-answer";
    }
    return "quiz-option disabled";
  };

  // Шаги упражнения
  const steps = [
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
            <div className="items-column">
              {matchingData.left.map(item => (
                <div key={item.id} className={`match-row left ${isMatched(item.id) ? 'matched' : ''}`}>
                  <div className="bubble-text left">{item.text}</div>
                  <img src={`/src/assets/1tema/${item.img}`} style={{width: item.width, height: 'auto'}} alt=""/>
                  <div className={`dot ${activeStart?.id === item.id ? 'active' : ''}`} onClick={(e) => handlePointClick(item.id, 'left', e)}></div>
                </div>
              ))}
            </div>
            <div className="items-column">
              {matchingData.right.map(item => (
                <div key={item.id} className={`match-row right ${isMatched(item.id) ? 'matched' : ''}`}>
                  <div className="dot" onClick={(e) => handlePointClick(item.id, 'right', e)}></div>
                  <img src={`/src/assets/1tema/${item.img}`} style={{width: '135px', height: 'auto'}} alt=""/>
                  <div className="bubble-text right">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      checkAnswer: () => {
        const allCorrect = Object.keys(matchingData.correct).length === connections.filter(c => c.isCorrect).length;
        return allCorrect && connections.length > 0 ? true : (connections.length > 0 ? false : null);
      }
    },
    {
      banner: "Туура жаз",
      content: (
        <>
          <div className="task-image-container">
            <img src="/src/assets/1tema/askar_walk.png" className="task-img-large" alt="task" style={{width: '135px', height: 'auto'}} />
          </div>
          <div className="slots-row">
            {placedLetters.map((char, i) => (
              <div key={i} 
                   className={getLetterClass(char, i)} 
                   onDragOver={(e) => e.preventDefault()} 
                   onDrop={(e) => handleDropToLetterSlot(e, i)}>
                {char}
              </div>
            ))}
          </div>
          <div className="letters-pool">
            {scrambleLetters.map((l, i) => (
              <div key={i} className="drag-item letter" draggable onDragStart={(e) => handleDragStart(e, l, "letter")}>{l}</div>
            ))}
          </div>
        </>
      ),
      checkAnswer: () => {
        const isComplete = placedLetters.every((letter, idx) => letter === correctScramble[idx]);
        return isComplete && placedLetters.some(l => l !== null) ? true : (placedLetters.some(l => l !== null) ? false : null);
      }
    },
    {
      banner: "Кантип саламдашабыз?",
      content: (
        <>
          <div className="images-row">
            {[
              {id: 1, img: "aksakal.png", w: "130px"},
              {id: 2, img: "girls_shaking_hands.png", w: "174px"},
              {id: 3, img: "teacher_eje.png", w: "85px"}
            ].map(item => (
              <div key={item.id} className="cap-card">
                <img src={`/src/assets/1tema/${item.img}`} style={{width: item.w, height: 'auto'}} alt=""/>
                <div className={getCaptionClass(item.id)} 
                     onDragOver={(e) => e.preventDefault()} 
                     onDrop={(e) => handleDropToCaptionSlot(e, item.id)}>
                  {placedCaptions[item.id] || ""}
                </div>
              </div>
            ))}
          </div>
          <div className="options-pool">
            {["Салам Айдай", "Саламатсызбы", "Саламатсызбы чоң ата?"].map(txt => (
              <div key={txt} className="drag-item caption" draggable onDragStart={(e) => handleDragStart(e, txt, "caption")}>{txt}</div>
            ))}
          </div>
        </>
      ),
      checkAnswer: () => {
        const isComplete = Object.keys(correctCaptions).every(key => placedCaptions[key] === correctCaptions[key]);
        const hasAnyAnswer = Object.keys(placedCaptions).length > 0;
        return isComplete && hasAnyAnswer ? true : (hasAnyAnswer ? false : null);
      }
    },
    {
      banner: "Туура жоопту танда",
      content: (
        <>
          <div className="task-image-container">
            <img src={`/src/assets/1tema/${quizData1.image}`} className="task-img-large" alt="task" />
          </div>
          <div className="question-text">
            <p className="question-kg">{quizData1.question}</p>
          </div>
          <div className="quiz-options-horizontal">
            {quizData1.options.map((option, idx) => (
              <button
                key={idx}
                className={getOptionClass(option, selectedAnswer1, quizData1.correct)}
                onClick={() => {
                  if (!quizLocked1) {
                    setSelectedAnswer1(option);
                    setQuizLocked1(true);
                  }
                }}
                disabled={quizLocked1}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ),
      checkAnswer: () => {
        if (!selectedAnswer1) return null;
        return selectedAnswer1 === quizData1.correct;
      }
    },
    {
      banner: "Туура жоопту танда",
      content: (
        <>
          <div className="task-image-container">
            <img src={`/src/assets/1tema/${quizData2.image}`} className="task-img-large" alt="task"  style={{ width: "400px", height: "auto" }}/>
          </div>
          <div className="question-text">
            <p className="question-kg">{quizData2.question}</p>
          </div>
          <div className="quiz-options-horizontal">
            {quizData2.options.map((option, idx) => (
              <button
                key={idx}
                className={getOptionClass(option, selectedAnswer2, quizData2.correct)}
                onClick={() => {
                  if (!quizLocked2) {
                    setSelectedAnswer2(option);
                    setQuizLocked2(true);
                  }
                }}
                disabled={quizLocked2}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ),
      checkAnswer: () => {
        if (!selectedAnswer2) return null;
        return selectedAnswer2 === quizData2.correct;
      }
    }
  ];

  const handleReset = () => {
    setConnections([]);
    setPlacedLetters(Array(5).fill(null));
    setPlacedCaptions({});
    setActiveStart(null);
    setSelectedAnswer1(null);
    setSelectedAnswer2(null);
    setQuizLocked1(false);
    setQuizLocked2(false);
  };

  return (
    <ExerciseTemplate
      title="Саламдашуу / көнүгүү"
      steps={steps}
      totalSteps={5}
      onReset={handleReset}
      containerClass="greetings-exercise"
    />
  );
};

export default GreetingsExercise;