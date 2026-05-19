// pages/4tema/MektepExercise.jsx
import React, { useState } from 'react';
import ExerciseTemplate from '../../components/ExerciseTemplate';
import "./MektepExercise.css";

const MektepExercise = () => {
  // Состояния для упражнений
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [imageLocked, setImageLocked] = useState(false);
  
  const [dropdownAnswers, setDropdownAnswers] = useState({});
  const [dropdownLocked, setDropdownLocked] = useState(false);
  
  const [inputWord1, setInputWord1] = useState("");
  const [spellingLocked1, setSpellingLocked1] = useState(false);
  
  const [inputWord2, setInputWord2] = useState("");
  const [spellingLocked2, setSpellingLocked2] = useState(false);
  
  const [choiceAnswer1, setChoiceAnswer1] = useState(null);
  const [choiceLocked1, setChoiceLocked1] = useState(false);
  
  const [choiceAnswer2, setChoiceAnswer2] = useState(null);
  const [choiceLocked2, setChoiceLocked2] = useState(false);
  
  const [choiceAnswer3, setChoiceAnswer3] = useState(null);
  const [choiceLocked3, setChoiceLocked3] = useState(false);

  // Данные упражнений
  const exercise1 = {
    question: "Окуучу кызды тап?",
    image: "teacher_agai.png",
    options: [
      { id: "boy", img: "teacher_agai.png", isCorrect: false },
      { id: "girl", img: "girl.png", isCorrect: true },
      { id: "teacher", img: "teacher_eje.png", isCorrect: false }
    ],
    correctId: "girl"
  };

  const exercise3 = {
    question: "Бул эмне?",
    translation: "Что это?",
    image: "school_main.png",
    letters: ["М", "Е", "К", "Т", "Е", "П"],
    correct: "МЕКТЕП"
  };

  const exercise4 = {
    question: "Бул ким?",
    translation: "Кто это?",
    image: "teacher_stand.png",
    letters: ["М", "У", "Г", "А", "Л", "И", "М"],
    correct: "МУГАЛИМ"
  };

  const exercise5 = {
    question: "Окуучулар _________ барышат.",
    translation: "Дети идут _______.",
    image: "students.png",
    options: ["Мектепке", "Китепке", "Базарга"],
    correct: 0
  };

  const exercise6 = {
    question: "Сүрөттө балдар эмне кылышат?",
    translation: "Что делают дети на картинке?",
    image: "students_reading.png",
    options: ["Окуучулар сабак жазышат", "Окуучулар китеп окушат", "Балдар сүрөт тартышат"],
    correct: 1
  };

  const exercise7 = {
    question: "Назик эмне кылат?",
    translation: "Что делает Назик?",
    image: "nazik.png",
    options: ["Назик сабак жазат", "Назик китеп окуйт", "Назик мектепке барат"],
    correct: 1
  };

  // Обработчики
  const handleImageClick = (id) => {
    if (!imageLocked) {
      setSelectedImageId(id);
      setImageLocked(true);
    }
  };

  const handleDropdownChange = (idx, value) => {
    if (!dropdownLocked) {
      setDropdownAnswers(prev => ({ ...prev, [idx]: value }));
    }
  };

  const handleSpellingClick = (letter, type) => {
    if (type === 1 && !spellingLocked1 && inputWord1.length < exercise3.letters.length) {
      setInputWord1(prev => prev + letter);
    }
    if (type === 2 && !spellingLocked2 && inputWord2.length < exercise4.letters.length) {
      setInputWord2(prev => prev + letter);
    }
  };

  const clearSpelling = (type) => {
    if (type === 1 && !spellingLocked1) setInputWord1("");
    if (type === 2 && !spellingLocked2) setInputWord2("");
  };

  const handleChoiceClick = (idx, type) => {
    if (type === 1 && !choiceLocked1) {
      setChoiceAnswer1(idx);
      setChoiceLocked1(true);
    }
    if (type === 2 && !choiceLocked2) {
      setChoiceAnswer2(idx);
      setChoiceLocked2(true);
    }
    if (type === 3 && !choiceLocked3) {
      setChoiceAnswer3(idx);
      setChoiceLocked3(true);
    }
  };

  const getImageCardClass = (item) => {
    if (!imageLocked) return selectedImageId === item.id ? "image-card selected" : "image-card";
    if (item.isCorrect) return "image-card correct-border";
    if (selectedImageId === item.id) return "image-card wrong-border";
    return "image-card";
  };

  const getOptionClass = (idx, selected, correct) => {
    if (selected === null) return "quiz-option";
    if (selected === idx) {
      return idx === correct ? "quiz-option correct-answer" : "quiz-option wrong-answer";
    }
    if (idx === correct) return "quiz-option correct-answer";
    return "quiz-option disabled";
  };

  // Шаги упражнения
  const steps = [
    {
      banner: exercise1.question,
      content: (
        <div className="step-content">
          <div className="image-options-grid">
            {exercise1.options.map((item) => (
              <div 
                key={item.id} 
                className={getImageCardClass(item)} 
                onClick={() => handleImageClick(item.id)}
              >
                <img src={`/src/assets/4tema/${item.img}`} alt="choice" style={{ height: "200px", width: "auto" }} />
              </div>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (!imageLocked) return null;
        return selectedImageId === exercise1.correctId;
      }
    },
   
    {
      banner: exercise3.question,
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/4tema/${exercise3.image}`} className="task-img-large" alt="task" style={{ height: "160px", width: "auto" }} />
          </div>
          <div className={`word-display ${spellingLocked1 ? (inputWord1 === exercise3.correct ? "correct-text" : "wrong-text") : ""}`}>
            {inputWord1 || "______"}
          </div>
          <div className="letters-pool">
            {exercise3.letters.map((L, i) => (
              <button 
                key={i} 
                className="letter-chip" 
                onClick={() => handleSpellingClick(L, 1)} 
                disabled={spellingLocked1}
              >
                {L}
              </button>
            ))}
          </div>
          {!spellingLocked1 && inputWord1.length > 0 && (
            <button className="clear-btn" onClick={() => clearSpelling(1)}>Тазалоо</button>
          )}
        </div>
      ),
      checkAnswer: () => {
        if (inputWord1.length !== exercise3.letters.length) return null;
        const isCorrect = inputWord1 === exercise3.correct;
        if (isCorrect && !spellingLocked1) setSpellingLocked1(true);
        return isCorrect;
      }
    },
    {
      banner: exercise4.question,
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/4tema/${exercise4.image}`} className="task-img-large" alt="task" style={{ height: "350px", width: "auto" }} />
          </div>
          <div className={`word-display ${spellingLocked2 ? (inputWord2 === exercise4.correct ? "correct-text" : "wrong-text") : ""}`}>
            {inputWord2 || "______"}
          </div>
          <div className="letters-pool">
            {exercise4.letters.map((L, i) => (
              <button 
                key={i} 
                className="letter-chip" 
                onClick={() => handleSpellingClick(L, 2)} 
                disabled={spellingLocked2}
              >
                {L}
              </button>
            ))}
          </div>
          {!spellingLocked2 && inputWord2.length > 0 && (
            <button className="clear-btn" onClick={() => clearSpelling(2)}>Тазалоо</button>
          )}
        </div>
      ),
      checkAnswer: () => {
        if (inputWord2.length !== exercise4.letters.length) return null;
        const isCorrect = inputWord2 === exercise4.correct;
        if (isCorrect && !spellingLocked2) setSpellingLocked2(true);
        return isCorrect;
      }
    },
    {
      banner: "Туура жоопту танда",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/4tema/${exercise5.image}`} className="task-img-large" alt="task" style={{ height: "350px", width: "auto" }} />
          </div>
          <div className="question-text">
            <p className="question-kg">{exercise5.question}</p>
            <p className="question-ru">{exercise5.translation}</p>
          </div>
          <div className="quiz-options-horizontal">
            {exercise5.options.map((option, idx) => (
              <button 
                key={idx} 
                className={getOptionClass(idx, choiceAnswer1, exercise5.correct)}
                onClick={() => handleChoiceClick(idx, 1)}
                disabled={choiceLocked1}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (choiceAnswer1 === null) return null;
        return choiceAnswer1 === exercise5.correct;
      }
    },
    {
      banner: "Туура жоопту танда",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/4tema/${exercise6.image}`} className="task-img-large" alt="task" style={{ height: "350px", width: "auto" }} />
          </div>
          <div className="question-text">
            <p className="question-kg">{exercise6.question}</p>
            <p className="question-ru">{exercise6.translation}</p>
          </div>
          <div className="quiz-options-horizontal">
            {exercise6.options.map((option, idx) => (
              <button 
                key={idx} 
                className={getOptionClass(idx, choiceAnswer2, exercise6.correct)}
                onClick={() => handleChoiceClick(idx, 2)}
                disabled={choiceLocked2}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (choiceAnswer2 === null) return null;
        return choiceAnswer2 === exercise6.correct;
      }
    },
    {
      banner: "Туура жоопту танда",
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/4tema/${exercise7.image}`} className="task-img-large" alt="task" style={{ height: "350px", width: "auto" }} />
          </div>
          <div className="question-text">
            <p className="question-kg">{exercise7.question}</p>
            <p className="question-ru">{exercise7.translation}</p>
          </div>
          <div className="quiz-options-horizontal">
            {exercise7.options.map((option, idx) => (
              <button 
                key={idx} 
                className={getOptionClass(idx, choiceAnswer3, exercise7.correct)}
                onClick={() => handleChoiceClick(idx, 3)}
                disabled={choiceLocked3}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        if (choiceAnswer3 === null) return null;
        return choiceAnswer3 === exercise7.correct;
      }
    }
  ];

  const handleReset = () => {
    setSelectedImageId(null);
    setImageLocked(false);
    setDropdownAnswers({});
    setDropdownLocked(false);
    setInputWord1("");
    setSpellingLocked1(false);
    setInputWord2("");
    setSpellingLocked2(false);
    setChoiceAnswer1(null);
    setChoiceLocked1(false);
    setChoiceAnswer2(null);
    setChoiceLocked2(false);
    setChoiceAnswer3(null);
    setChoiceLocked3(false);
  };

  return (
    <ExerciseTemplate
      title="Мен мектепке барам / көнүгүү"
      steps={steps}
      totalSteps={7}
      onReset={handleReset}
      containerClass="mektep-exercise"
    />
  );
};

export default MektepExercise;