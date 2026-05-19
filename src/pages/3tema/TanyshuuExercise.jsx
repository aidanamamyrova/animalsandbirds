// pages/3tema/TanyshuuExercise.jsx
import React, { useState } from 'react';
import ExerciseTemplate from '../../components/ExerciseTemplate';
import '../../components/ExerciseCommon.css'; 

import "./TanyshuuExercise.css";

import img1 from "../../assets/3tema/kids.png";
import girlImg from "../../assets/3tema/girl_wave.png";
import schoolImg from "../../assets/3tema/boy_wave.png";

const TanyshuuExercise = () => {
  // Состояния для упражнений
  const [selectedAnswer1, setSelectedAnswer1] = useState(null);
  const [quizLocked1, setQuizLocked1] = useState(false);
  
  const [placedLettersKyz, setPlacedLettersKyz] = useState(Array(3).fill(null));
  const [placedLettersMektep, setPlacedLettersMektep] = useState(Array(5).fill(null));
  
  const [selectedAnswer4, setSelectedAnswer4] = useState(null);
  const [quizLocked4, setQuizLocked4] = useState(false);
  
  const [selectedAnswer5, setSelectedAnswer5] = useState(null);
  const [quizLocked5, setQuizLocked5] = useState(false);

  // Данные упражнений
  const correctKyz = ["К", "Ы", "З"];
  const scrambleKyz = ["К", "Ы", "З"];
  
  const correctMektep = ["А", "С", "К", "А", "Р"];
  const scrambleMektep = ["С", "А", "К", "Р", "А"];

  const quizData1 = { 
    question: "___ атым Айгерим", 
    options: ["Менин", "Сенин", "Айгерим"], 
    correct: "Менин", 
    image: img1 
  };
  
  const quizData4 = { 
    question: "Сенин атың ___?", 
    options: ["кайда", "эмне", "ким"], 
    correct: "ким", 
    image: img1 
  };
  
  const quizData5 = { 
    question: "Менин фамилиям ___", 
    options: ["жакшы", "салам", "Абакарова"], 
    correct: "Абакарова", 
    image: img1 
  };

  // Обработчики
  const handleDragStart = (e, content) => {
    e.dataTransfer.setData("content", content);
  };

  const handleDropToLetterSlot = (e, index, type) => {
    e.preventDefault();
    const content = e.dataTransfer.getData("content");
    
    if (type === "kyz") {
      if (placedLettersKyz[index] === null) {
        const newLetters = [...placedLettersKyz];
        newLetters[index] = content;
        setPlacedLettersKyz(newLetters);
      }
    } else {
      if (placedLettersMektep[index] === null) {
        const newLetters = [...placedLettersMektep];
        newLetters[index] = content;
        setPlacedLettersMektep(newLetters);
      }
    }
  };

  const handleLetterRemove = (index, type) => {
    if (type === "kyz") {
      if (placedLettersKyz[index]) {
        const newLetters = [...placedLettersKyz];
        newLetters[index] = null;
        setPlacedLettersKyz(newLetters);
      }
    } else {
      if (placedLettersMektep[index]) {
        const newLetters = [...placedLettersMektep];
        newLetters[index] = null;
        setPlacedLettersMektep(newLetters);
      }
    }
  };

  const getLetterClass = (char, correctArray, index) => {
    if (!char) return "drop-slot";
    return char === correctArray[index] ? "drop-slot correct" : "drop-slot wrong";
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
          <div className="task-image-container">
            <img src={quizData1.image} className="task-img-large" alt="task" />
          </div>
          <div className="question-text">
            <p className="question-kg">{quizData1.question}</p>
          </div>
          <div className="quiz-options-horizontal">
            {quizData1.options.map((opt, i) => (
              <button 
                key={i} 
                className={getOptionClass(opt, selectedAnswer1, quizData1.correct)}
                onClick={() => { 
                  if (!quizLocked1) {
                    setSelectedAnswer1(opt); 
                    setQuizLocked1(true); 
                  }
                }}
                disabled={quizLocked1}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (!selectedAnswer1) return null;
        return selectedAnswer1 === quizData1.correct;
      }
    },
    {
      banner: "Бул ким?",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={girlImg} className="task-img-large" alt="task" />
          </div>
          <div className="slots-row">
            {placedLettersKyz.map((char, i) => (
              <div 
                key={i} 
                className={getLetterClass(char, correctKyz, i)} 
                onClick={() => handleLetterRemove(i, "kyz")}
                onDragOver={e => e.preventDefault()} 
                onDrop={e => handleDropToLetterSlot(e, i, "kyz")}
              >
                {char}
              </div>
            ))}
          </div>
          <div className="letters-pool">
            {scrambleKyz.map((l, i) => (
              <div 
                key={i} 
                className="drag-item letter" 
                draggable 
                onDragStart={e => handleDragStart(e, l)}
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        const isComplete = placedLettersKyz.every((letter, idx) => letter === correctKyz[idx]);
        return isComplete && placedLettersKyz.some(l => l !== null) ? true : (placedLettersKyz.some(l => l !== null) ? false : null);
      }
    },
    {
      banner: "Сенин атын ким?",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={schoolImg} className="task-img-large mektep-img" alt="task" />
          </div>
          <div className="slots-row">
            {placedLettersMektep.map((char, i) => (
              <div 
                key={i} 
                className={getLetterClass(char, correctMektep, i)} 
                onClick={() => handleLetterRemove(i, "mektep")}
                onDragOver={e => e.preventDefault()} 
                onDrop={e => handleDropToLetterSlot(e, i, "mektep")}
              >
                {char}
              </div>
            ))}
          </div>
          <div className="letters-pool">
            {scrambleMektep.map((l, i) => (
              <div 
                key={i} 
                className="drag-item letter" 
                draggable 
                onDragStart={e => handleDragStart(e, l)}
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        const isComplete = placedLettersMektep.every((letter, idx) => letter === correctMektep[idx]);
        return isComplete && placedLettersMektep.some(l => l !== null) ? true : (placedLettersMektep.some(l => l !== null) ? false : null);
      }
    },
    {
      banner: "Туура жоопту танда",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={quizData4.image} className="task-img-large" alt="task" />
          </div>
          <div className="question-text">
            <p className="question-kg">{quizData4.question}</p>
          </div>
          <div className="quiz-options-horizontal">
            {quizData4.options.map((opt, i) => (
              <button 
                key={i} 
                className={getOptionClass(opt, selectedAnswer4, quizData4.correct)}
                onClick={() => { 
                  if (!quizLocked4) {
                    setSelectedAnswer4(opt); 
                    setQuizLocked4(true); 
                  }
                }}
                disabled={quizLocked4}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (!selectedAnswer4) return null;
        return selectedAnswer4 === quizData4.correct;
      }
    },
    {
      banner: "Туура жоопту танда",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={quizData5.image} className="task-img-large" alt="task" />
          </div>
          <div className="question-text">
            <p className="question-kg">{quizData5.question}</p>
          </div>
          <div className="quiz-options-horizontal">
            {quizData5.options.map((opt, i) => (
              <button 
                key={i} 
                className={getOptionClass(opt, selectedAnswer5, quizData5.correct)}
                onClick={() => { 
                  if (!quizLocked5) {
                    setSelectedAnswer5(opt); 
                    setQuizLocked5(true); 
                  }
                }}
                disabled={quizLocked5}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (!selectedAnswer5) return null;
        return selectedAnswer5 === quizData5.correct;
      }
    }
  ];

  const handleReset = () => {
    setSelectedAnswer1(null);
    setQuizLocked1(false);
    setPlacedLettersKyz(Array(3).fill(null));
    setPlacedLettersMektep(Array(5).fill(null));
    setSelectedAnswer4(null);
    setQuizLocked4(false);
    setSelectedAnswer5(null);
    setQuizLocked5(false);
  };

  return (
    <ExerciseTemplate
      title="Таанышуу / көнүгүү"
      steps={steps}
      totalSteps={5}
      onReset={handleReset}
      containerClass="tanyshuu-exercise"
    />
  );
};

export default TanyshuuExercise;