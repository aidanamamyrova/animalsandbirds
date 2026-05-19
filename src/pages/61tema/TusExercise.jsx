// pages/31tema/TusExercise.jsx
import React, { useState } from 'react';
import ExerciseTemplate from '../../components/ExerciseTemplate';
import "../../components/ExerciseCommon.css";
import "./TusExercise.css";

const TusExercise = () => {
  // Состояния для упражнений
  const [missingLetterAnswers, setMissingLetterAnswers] = useState({ 1: null, 2: null });
  const [missingLocked, setMissingLocked] = useState(false);
  
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [activeMatch, setActiveMatch] = useState(null);
  const [matchingLocked, setMatchingLocked] = useState(false);
  
  const [boardAnswer, setBoardAnswer] = useState(null);
  const [boardLocked, setBoardLocked] = useState(false);
  
  const [hairAnswer, setHairAnswer] = useState(null);
  const [hairLocked, setHairLocked] = useState(false);
  
  const [penAnswer, setPenAnswer] = useState(null);
  const [penLocked, setPenLocked] = useState(false);

  // Данные упражнений
  const missingLetterData = {
    1: { word: "Кызыл", display: "Кыз_л", correct: "ы", options: ["ы", "и", "у"] },
    2: { word: "Жашыл", display: "Ж_зыл", correct: "а", options: ["а", "о", "е"] }
  };

  // Упражнение 2: Түстөрдү окшоштуруп тапкыла (слева картинки, справа названия)
  const colorMatchingData = {
    left: [
      { id: "l1", name: "Кара", img: "black_pencil.png", correctId: "r1" },
      { id: "l2", name: "Кызыл", img: "red_pencil.png", correctId: "r2" },
      { id: "l3", name: "Жашыл", img: "zhashyl.png", correctId: "r3" }
    ],
    right: [
      { id: "r1", name: "кара" },
      
      { id: "r3", name: "жашыл" },
      { id: "r2", name: "кызыл" }
    ]
  };

  const boardQuiz = {
    question: "Такта кандай түстө?",
    translation: "Какого цвета доска?",
    img: "board_desk.png",
    options: ["кызыл", "жашыл", "кара"],
    correct: "кара"
  };

  const hairQuiz = {
    question: "Кыздын чачы кандай түстө?",
    translation: "Какого цвета волосы у девочки?",
    img: "black_hair.png",
    options: ["кызыл", "жашыл", "кара"],
    correct: "кара"
  };

  const penQuiz = {
    question: "Калем кандай түстө?",
    translation: "Какого цвета ручка?",
    img: "white_pencil.png",
    options: ["кызыл", "ак", "кара"],
    correct: "ак"
  };

  // Обработчики для упражнения 1
  const handleMissingAnswer = (index, answer) => {
    if (missingLocked) return;
    const newAnswers = { ...missingLetterAnswers, [index]: answer };
    setMissingLetterAnswers(newAnswers);
    
    if (newAnswers[1] && newAnswers[2]) {
      const allCorrect = newAnswers[1] === missingLetterData[1].correct && 
                        newAnswers[2] === missingLetterData[2].correct;
      if (allCorrect) setMissingLocked(true);
    }
  };

  // Обработчики для упражнения 2 (matching)
  const handleLeftClick = (leftId) => {
    if (matchingLocked || matchedPairs.includes(leftId)) return;
    setActiveMatch({ type: 'left', id: leftId });
  };

  const handleRightClick = (rightId) => {
    if (matchingLocked) return;
    
    if (activeMatch && activeMatch.type === 'left') {
      const leftItem = colorMatchingData.left.find(l => l.id === activeMatch.id);
      if (leftItem && leftItem.correctId === rightId) {
        setMatchedPairs(prev => [...prev, activeMatch.id]);
      }
      setActiveMatch(null);
    } else {
      setActiveMatch({ type: 'right', id: rightId });
    }
  };

  // Обработчики для викторин
  const handleBoardAnswer = (answer) => {
    if (!boardLocked) {
      setBoardAnswer(answer);
      if (answer === boardQuiz.correct) setBoardLocked(true);
    }
  };

  const handleHairAnswer = (answer) => {
    if (!hairLocked) {
      setHairAnswer(answer);
      if (answer === hairQuiz.correct) setHairLocked(true);
    }
  };

  const handlePenAnswer = (answer) => {
    if (!penLocked) {
      setPenAnswer(answer);
      if (answer === penQuiz.correct) setPenLocked(true);
    }
  };

  // Функции проверки
  const isMissingComplete = () => {
    if (!missingLetterAnswers[1] || !missingLetterAnswers[2]) return null;
    const isCorrect = missingLetterAnswers[1] === missingLetterData[1].correct &&
                      missingLetterAnswers[2] === missingLetterData[2].correct;
    if (isCorrect && !missingLocked) setMissingLocked(true);
    return isCorrect;
  };

  const isMatchingComplete = () => {
    if (matchedPairs.length !== colorMatchingData.left.length) return null;
    if (!matchingLocked) setMatchingLocked(true);
    return true;
  };

  const isBoardComplete = () => {
    if (!boardAnswer) return null;
    const isCorrect = boardAnswer === boardQuiz.correct;
    if (isCorrect && !boardLocked) setBoardLocked(true);
    return isCorrect;
  };

  const isHairComplete = () => {
    if (!hairAnswer) return null;
    const isCorrect = hairAnswer === hairQuiz.correct;
    if (isCorrect && !hairLocked) setHairLocked(true);
    return isCorrect;
  };

  const isPenComplete = () => {
    if (!penAnswer) return null;
    const isCorrect = penAnswer === penQuiz.correct;
    if (isCorrect && !penLocked) setPenLocked(true);
    return isCorrect;
  };

  const getMissingOptionClass = (selected, value, correct) => {
    if (!selected) return "tus-quiz-option";
    if (selected === value) {
      return selected === correct ? "tus-quiz-option correct-answer" : "tus-quiz-option wrong-answer";
    }
    return "tus-quiz-option disabled";
  };

  const getMatchClass = (id, type) => {
    if (matchedPairs.includes(id)) return "tus-match-item matched";
    if (activeMatch?.id === id && activeMatch?.type === type) return "tus-match-item active";
    return "tus-match-item";
  };

  const getOptionClass = (option, selected, correct) => {
    if (!selected) return "tus-quiz-option";
    if (selected === option) {
      return option === correct ? "tus-quiz-option correct-answer" : "tus-quiz-option wrong-answer";
    }
    return "tus-quiz-option disabled";
  };

  // Проверка, matched ли правый элемент
  const isRightMatched = (rightId) => {
    return matchedPairs.some(leftId => {
      const leftItem = colorMatchingData.left.find(l => l.id === leftId);
      return leftItem && leftItem.correctId === rightId;
    });
  };

  // Шаги упражнения
  const steps = [
    // Шаг 1: Кайсыл тамга жок?
    {
      banner: "Кайсыл тамга жок?",
      content: (
        <div className="tus-step-content">
          <div className="tus-missing-container">
            {[1, 2].map((index) => (
              <div key={index} className="tus-missing-card">
                <div className="tus-word-display">
                  <span className="tus-word-text">{missingLetterData[index].display}</span>
                </div>
                <div className="tus-quiz-options-horizontal">
                  {missingLetterData[index].options.map((opt) => (
                    <button
                      key={opt}
                      className={getMissingOptionClass(
                        missingLetterAnswers[index], 
                        opt, 
                        missingLetterData[index].correct
                      )}
                      onClick={() => handleMissingAnswer(index, opt)}
                      disabled={missingLocked}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      checkAnswer: isMissingComplete
    },
    // Шаг 2: Түстөрдү окшоштуруп тапкыла
    {
      banner: "Түстөрдү окшоштуруп тапкыла",
      content: (
        <div className="tus-step-content">
          <div className="tus-matching-container-horizontal">
            {/* Слева - картинки */}
            <div className="tus-matching-row-images">
              {colorMatchingData.left.map(item => (
                <div 
                  key={item.id} 
                  className={getMatchClass(item.id, 'left')}
                  onClick={() => handleLeftClick(item.id)}
                >
                  <img src={`/src/assets/31tema/${item.img}`} className="tus-match-img" alt={item.name} />
                </div>
              ))}
            </div>
            
            {/* Справа - слова */}
            <div className="tus-matching-row-words">
              {colorMatchingData.right.map(item => (
                <div 
                  key={item.id} 
                  className={`tus-match-item ${isRightMatched(item.id) ? 'matched' : ''} ${activeMatch?.id === item.id && activeMatch?.type === 'right' ? 'active' : ''}`}
                  onClick={() => handleRightClick(item.id)}
                >
                  <span className="tus-match-text">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      checkAnswer: isMatchingComplete
    },
    // Шаг 3: Такта кандай түстө?
    {
      banner: boardQuiz.question,
      content: (
        <div className="tus-step-content">
          <div className="tus-task-image-container">
            <img src={`/src/assets/31tema/${boardQuiz.img}`} className="tus-task-img-large" alt="task" />
          </div>
          <p className="tus-question-translation">{boardQuiz.translation}</p>
          <div className="tus-quiz-options-horizontal">
            {boardQuiz.options.map((opt, idx) => (
              <button 
                key={idx} 
                className={getOptionClass(opt, boardAnswer, boardQuiz.correct)}
                onClick={() => handleBoardAnswer(opt)}
                disabled={boardLocked}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: isBoardComplete
    },
    // Шаг 4: Кыздын чачы кандай түстө?
    {
      banner: hairQuiz.question,
      content: (
        <div className="tus-step-content">
          <div className="tus-task-image-container">
            <img src={`/src/assets/31tema/${hairQuiz.img}`} className="tus-task-img-large" alt="task" />
          </div>
          <p className="tus-question-translation">{hairQuiz.translation}</p>
          <div className="tus-quiz-options-horizontal">
            {hairQuiz.options.map((opt, idx) => (
              <button 
                key={idx} 
                className={getOptionClass(opt, hairAnswer, hairQuiz.correct)}
                onClick={() => handleHairAnswer(opt)}
                disabled={hairLocked}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: isHairComplete
    },
    // Шаг 5: Калем кандай түстө?
    {
      banner: penQuiz.question,
      content: (
        <div className="tus-step-content">
          <div className="tus-task-image-container">
            <img src={`/src/assets/31tema/${penQuiz.img}`} className="tus-task-img-large" alt="task" />
          </div>
          <p className="tus-question-translation">{penQuiz.translation}</p>
          <div className="tus-quiz-options-horizontal">
            {penQuiz.options.map((opt, idx) => (
              <button 
                key={idx} 
                className={getOptionClass(opt, penAnswer, penQuiz.correct)}
                onClick={() => handlePenAnswer(opt)}
                disabled={penLocked}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: isPenComplete
    }
  ];

  const handleReset = () => {
    setMissingLetterAnswers({ 1: null, 2: null });
    setMissingLocked(false);
    setMatchedPairs([]);
    setActiveMatch(null);
    setMatchingLocked(false);
    setBoardAnswer(null);
    setBoardLocked(false);
    setHairAnswer(null);
    setHairLocked(false);
    setPenAnswer(null);
    setPenLocked(false);
  };

  return (
    <ExerciseTemplate
      title="Түстөр / көнүгүү"
      steps={steps}
      totalSteps={5}
      onReset={handleReset}
      containerClass="tus-exercise"
    />
  );
};

export default TusExercise;