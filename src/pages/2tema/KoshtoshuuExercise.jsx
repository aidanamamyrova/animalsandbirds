// pages/2tema/KoshtoshuuExercise.jsx
import React, { useState } from 'react';
import ExerciseTemplate from '../../components/ExerciseTemplate';
import '../../components/ExerciseCommon.css'; 

import "./KoshtoshuuExercise.css";

const KoshtoshuuExercise = () => {
  // Состояния для упражнений
  const [selectedAnswer0, setSelectedAnswer0] = useState(null);
  const [quizLocked0, setQuizLocked0] = useState(false);
  const [placedLetters, setPlacedLetters] = useState(Array(3).fill(null));
  const [placedCaptions, setPlacedCaptions] = useState({});
  const [selectedAnswer3, setSelectedAnswer3] = useState(null);
  const [quizLocked3, setQuizLocked3] = useState(false);

  // Данные упражнений
  const goodbyeImageData = {
    image: "bay1.png",
    question: "Эже жакшы калыңыз",
    options: ["Жакшы бар , Айдай", "Кош кел , Айдай", "Жакшы кел , Айдай"],
    correct: "Жакшы бар , Айдай"
  };

  const correctScramble = ["Э", "Ж", "Е"];
  const scrambleLetters = ["Ж", "Е", "Э"];

  const correctCaptions = {
    1: "Жакшы калыңыз",
    2: "Саламатта баргыла",
    3: "Жакшы барыңыз"
  };

  const quizData = {
    question: "Саламатта калыңыз, чоң ата!",
    image: "bay4.png",
    options: ["Салам Айдай", "Саламатта бар", "Саламатсызбы"],
    correct: "Саламатта бар"
  };

  // Обработчики
  const handleDragStart = (e, content) => {
    e.dataTransfer.setData("content", content);
  };

  const handleDropToLetterSlot = (e, index) => {
    e.preventDefault();
    const content = e.dataTransfer.getData("content");
    if (placedLetters[index] === null) {
      const newLetters = [...placedLetters];
      newLetters[index] = content;
      setPlacedLetters(newLetters);
    }
  };

  const handleLetterRemove = (index) => {
    if (placedLetters[index]) {
      const newLetters = [...placedLetters];
      newLetters[index] = null;
      setPlacedLetters(newLetters);
    }
  };

  const handleDropToCaptionSlot = (e, id) => {
    e.preventDefault();
    const content = e.dataTransfer.getData("content");
    setPlacedCaptions(prev => ({ ...prev, [id]: content }));
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
      banner: "Туура жоопту танда",
      content: (
        <div className="step-content">
          <div className="visual-scene-container">
            <div className="speech-bubble-top">
              {goodbyeImageData.question} 🔊
            </div>
            <img 
              src={`/src/assets/2tema/${goodbyeImageData.image}`} 
              className="task-img-large" 
              style={{ width: '580px' }}
              alt="Goodbye scene" 
            />
          </div>
          <div className="quiz-options-horizontal">
            {goodbyeImageData.options.map((opt, i) => (
              <button 
                key={i} 
                className={getOptionClass(opt, selectedAnswer0, goodbyeImageData.correct)}
                onClick={() => {
                  if (!quizLocked0) {
                    setSelectedAnswer0(opt);
                    setQuizLocked0(true);
                  }
                }}
                disabled={quizLocked0}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (!selectedAnswer0) return null;
        return selectedAnswer0 === goodbyeImageData.correct;
      }
    },
    {
      banner: "Сөздү кура",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src="/src/assets/2tema/bay1.png" className="task-img-large" style={{ width: '490px' }} alt="" />
          </div>
          <div className="slots-row">
            {placedLetters.map((char, i) => (
              <div 
                key={i} 
                className={getLetterClass(char, i)}
                onClick={() => handleLetterRemove(i)}
                onDragOver={(e) => e.preventDefault()} 
                onDrop={(e) => handleDropToLetterSlot(e, i)}
              >
                {char}
              </div>
            ))}
          </div>
          <div className="letters-pool">
            {scrambleLetters.map((l, i) => (
              <div 
                key={i} 
                className="drag-item letter" 
                draggable 
                onDragStart={(e) => handleDragStart(e, l)}
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        const isComplete = placedLetters.every((letter, idx) => letter === correctScramble[idx]);
        return isComplete && placedLetters.some(l => l !== null) ? true : (placedLetters.some(l => l !== null) ? false : null);
      }
    },
    {
      banner: "Кантип коштошушат?",
      content: (
        <div className="step-content">
          <div className="images-row">
            {[1, 2, 3].map(id => (
              <div key={id} className="cap-card">
                <img src={`/src/assets/2tema/bay${id}.png`} style={{ width: '250px' }} alt=""/>
                <div 
                  className={getCaptionClass(id)} 
                  onDragOver={(e) => e.preventDefault()} 
                  onDrop={(e) => handleDropToCaptionSlot(e, id)}
                >
                  {placedCaptions[id] || "..."}
                </div>
              </div>
            ))}
          </div>
          <div className="options-pool">
            {Object.values(correctCaptions).map(txt => (
              <div 
                key={txt} 
                className="drag-item caption" 
                draggable 
                onDragStart={(e) => handleDragStart(e, txt)}
              >
                {txt}
              </div>
            ))}
          </div>
        </div>
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
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/2tema/${quizData.image}`} className="task-img-large" style={{ width: '400px' }} alt="" />
          </div>
          <p className="question-kg">{quizData.question}</p>
          <div className="quiz-options-horizontal">
            {quizData.options.map((opt, i) => (
              <button 
                key={i} 
                className={getOptionClass(opt, selectedAnswer3, quizData.correct)}
                onClick={() => {
                  if (!quizLocked3) {
                    setSelectedAnswer3(opt);
                    setQuizLocked3(true);
                  }
                }}
                disabled={quizLocked3}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (!selectedAnswer3) return null;
        return selectedAnswer3 === quizData.correct;
      }
    }
  ];

  const handleReset = () => {
    setSelectedAnswer0(null);
    setQuizLocked0(false);
    setPlacedLetters(Array(3).fill(null));
    setPlacedCaptions({});
    setSelectedAnswer3(null);
    setQuizLocked3(false);
  };

  return (
    <ExerciseTemplate
      title="Коштошуу / көнүгүү"
      steps={steps}
      totalSteps={4}
      onReset={handleReset}
      containerClass="koshtoshuu-exercise"
    />
  );
};

export default KoshtoshuuExercise;