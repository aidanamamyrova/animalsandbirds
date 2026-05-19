// pages/5tema/KlassExercise.jsx
import React, { useState, useEffect } from 'react';
import ExerciseTemplate from '../../components/ExerciseTemplate';
import "./KlassExercise.css";

const KlassExercise = () => {
  // Состояния для упражнений
  const [inputWord1, setInputWord1] = useState("");
  const [spellingLocked1, setSpellingLocked1] = useState(false);
  
  const [inputWord2, setInputWord2] = useState("");
  const [spellingLocked2, setSpellingLocked2] = useState(false);
  
  const [dropdownAnswers, setDropdownAnswers] = useState({});
  const [dropdownFillLocked, setDropdownFillLocked] = useState(false);
  
  const [pronounAnswer1, setPronounAnswer1] = useState(null);
  const [pronounLocked1, setPronounLocked1] = useState(false);
  
  const [pronounAnswer2, setPronounAnswer2] = useState(null);
  const [pronounLocked2, setPronounLocked2] = useState(false);
  
  const [choiceAnswer1, setChoiceAnswer1] = useState(null);
  const [choiceLocked1, setChoiceLocked1] = useState(false);
  
  const [choiceAnswer2, setChoiceAnswer2] = useState(null);
  const [choiceLocked2, setChoiceLocked2] = useState(false);

  const pronouns = ["Мен", "Сен", "Ал"];

  // Данные упражнений
  const exercise1 = {
    question: "Бул эмне?",
    translation: "Что это?",
    img: "board_desk.png",
    letters: ["Т", "А", "К", "Т", "А"],
    correct: "ТАКТА"
  };

  const exercise2 = {
    question: "Бул ким?",
    translation: "Кто это?",
    img: "student_boy.png",
    letters: ["О", "К", "У", "У", "Ч", "У"],
    correct: "ОКУУЧУ"
  };

  const exercise3 = {
    question: "Сүйлөмдү толуктагыла",
    translation: "Дополняем предложения",
    img: "classroom.png",
    sentences: [
      { text: "Бул ___ класс", correct: "биздин", slotIndex: 0 },
      { text: "Класста ___ , ___  бар.", correct: ["саат", "желек"], slotIndexes: [0, 1] }
    ],
    allOptions: ["биздин", "саат", "желек", "жарык", "таза"]
  };

  const exercise4 = {
    question: "Тиешелүү ат атоочту тандаңыз:",
    verb: "..... окуйм",
    correct: "Мен",
    trans: "..... читаю",
    img: "reading_book.png",
    options: pronouns
  };

  const exercise5 = {
    question: "Тиешелүү ат атоочту тандаңыз:",
    verb: "..... окуйсуң",
    correct: "Сен",
    trans: "..... читаешь",
    img: "student_boy.png",
    options: pronouns
  };

  const exercise6 = {
    question: "Сүрөттө балдар эмне кылып жатышат?",
    trans: "Что делают дети на картинке?",
    img: "students_in_class.png",
    options: ["Алар сабак жазып жатышат", "Ал китеп окуйт", "Силер сүрөт тартышат"],
    correct: 0
  };

  const exercise7 = {
    question: "Оля эмне кылат?",
    trans: "Что делает Оля?",
    img: "olya_enter.png",
    options: ["Ал класска кирет", "Алар класска кирет", "Силер класска киресиңер"],
    correct: 0
  };

  // Обработчики для spelling с авто-проверкой
  const handleSpellingClick = (letter, type, correctWord, setLocked) => {
    if (type === 1 && !spellingLocked1) {
      const newValue = inputWord1 + letter;
      setInputWord1(newValue);
      if (newValue.length === correctWord.length) {
        if (newValue === correctWord) {
          setSpellingLocked1(true);
        }
      }
    }
    if (type === 2 && !spellingLocked2) {
      const newValue = inputWord2 + letter;
      setInputWord2(newValue);
      if (newValue.length === correctWord.length) {
        if (newValue === correctWord) {
          setSpellingLocked2(true);
        }
      }
    }
  };

  const clearSpelling = (type) => {
    if (type === 1 && !spellingLocked1) setInputWord1("");
    if (type === 2 && !spellingLocked2) setInputWord2("");
  };

  const handleDropdownChange = (value) => {
    if (!pronounLocked1) {
      setPronounAnswer1(value);
      if (value === exercise4.correct) {
        setPronounLocked1(true);
      }
    }
  };

  const handleDropdownChange2 = (value) => {
    if (!pronounLocked2) {
      setPronounAnswer2(value);
      if (value === exercise5.correct) {
        setPronounLocked2(true);
      }
    }
  };

  const handleChoiceClick = (idx, type, correct) => {
    if (type === 1 && !choiceLocked1) {
      setChoiceAnswer1(idx);
      if (idx === correct) {
        setChoiceLocked1(true);
      }
    }
    if (type === 2 && !choiceLocked2) {
      setChoiceAnswer2(idx);
      if (idx === correct) {
        setChoiceLocked2(true);
      }
    }
  };

  const handleDropdownFillChange = (slotId, value) => {
    if (!dropdownFillLocked) {
      const newAnswers = { ...dropdownAnswers, [slotId]: value };
      setDropdownAnswers(newAnswers);
      
      // Проверка на завершение
      const requiredSlots = ["s1", "s2_0", "s2_1"];
      const allFilled = requiredSlots.every(slot => newAnswers[slot]);
      if (allFilled) {
        const isCorrect = newAnswers["s1"] === exercise3.sentences[0].correct &&
          newAnswers["s2_0"] === exercise3.sentences[1].correct[0] &&
          newAnswers["s2_1"] === exercise3.sentences[1].correct[1];
        if (isCorrect) {
          setDropdownFillLocked(true);
        }
      }
    }
  };

  // Функции проверки для шаблона
  const isSpelling1Complete = () => {
    if (inputWord1.length !== exercise1.correct.length) return null;
    return inputWord1 === exercise1.correct;
  };

  const isSpelling2Complete = () => {
    if (inputWord2.length !== exercise2.correct.length) return null;
    return inputWord2 === exercise2.correct;
  };

  const isDropdownFillComplete = () => {
    const requiredSlots = ["s1", "s2_0", "s2_1"];
    const allFilled = requiredSlots.every(slot => dropdownAnswers[slot]);
    if (!allFilled) return null;
    return dropdownAnswers["s1"] === exercise3.sentences[0].correct &&
      dropdownAnswers["s2_0"] === exercise3.sentences[1].correct[0] &&
      dropdownAnswers["s2_1"] === exercise3.sentences[1].correct[1];
  };

  const isPronoun1Complete = () => {
    if (!pronounAnswer1) return null;
    return pronounAnswer1 === exercise4.correct;
  };

  const isPronoun2Complete = () => {
    if (!pronounAnswer2) return null;
    return pronounAnswer2 === exercise5.correct;
  };

  const isChoice1Complete = () => {
    if (choiceAnswer1 === null) return null;
    return choiceAnswer1 === exercise6.correct;
  };

  const isChoice2Complete = () => {
    if (choiceAnswer2 === null) return null;
    return choiceAnswer2 === exercise7.correct;
  };

  const getOptionClass = (idx, selected, correct) => {
    if (selected === null) return "quiz-option";
    if (selected === idx) {
      return idx === correct ? "quiz-option correct-answer" : "quiz-option wrong-answer";
    }
    return "quiz-option disabled";
  };

  const getPronounClass = (value, selected, correct) => {
    if (!selected) return "";
    if (selected === value) {
      return value === correct ? "correct-select" : "wrong-select";
    }
    return "";
  };

  // Шаги упражнения
  const steps = [
    {
      banner: exercise1.question,
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/5tema/${exercise1.img}`} className="task-img-large" alt="task" />
          </div>
          <p className="question-translation">{exercise1.translation}</p>
          <div className="spelling-area">
            <div className={`word-display ${spellingLocked1 ? (inputWord1 === exercise1.correct ? "correct-text" : "wrong-text") : ""}`}>
              {inputWord1 || "______"}
            </div>
            <div className="letters-pool">
              {exercise1.letters.map((L, i) => (
                <button 
                  key={i} 
                  className="letter-chip" 
                  onClick={() => handleSpellingClick(L, 1, exercise1.correct, setSpellingLocked1)} 
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
        </div>
      ),
      checkAnswer: isSpelling1Complete
    },
    {
      banner: exercise2.question,
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/5tema/${exercise2.img}`} className="task-img-large" alt="task" />
          </div>
          <p className="question-translation">{exercise2.translation}</p>
          <div className="spelling-area">
            <div className={`word-display ${spellingLocked2 ? (inputWord2 === exercise2.correct ? "correct-text" : "wrong-text") : ""}`}>
              {inputWord2 || "______"}
            </div>
            <div className="letters-pool">
              {exercise2.letters.map((L, i) => (
                <button 
                  key={i} 
                  className="letter-chip" 
                  onClick={() => handleSpellingClick(L, 2, exercise2.correct, setSpellingLocked2)} 
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
        </div>
      ),
      checkAnswer: isSpelling2Complete
    },
    {
      banner: exercise3.question,
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/5tema/${exercise3.img}`} className="task-img-large" alt="task" />
          </div>
          <p className="question-translation">{exercise3.translation}</p>
          <div className="dropdown-fill-container">
            <div className="sentence-row-simple">
              <span>Бул</span>
              <select 
                onChange={(e) => handleDropdownFillChange("s1", e.target.value)}
                disabled={dropdownFillLocked}
                className={dropdownFillLocked && dropdownAnswers["s1"] === exercise3.sentences[0].correct ? "correct-select" : ""}
                value={dropdownAnswers["s1"] || ""}
              >
                <option value="">---</option>
                {exercise3.allOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <span>класс</span>
            </div>
            <div className="sentence-row-simple">
              <span>Класста</span>
              <select 
                onChange={(e) => handleDropdownFillChange("s2_0", e.target.value)}
                disabled={dropdownFillLocked}
                className={dropdownFillLocked && dropdownAnswers["s2_0"] === exercise3.sentences[1].correct[0] ? "correct-select" : ""}
                value={dropdownAnswers["s2_0"] || ""}
              >
                <option value="">---</option>
                {exercise3.allOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <span>,</span>
              <select 
                onChange={(e) => handleDropdownFillChange("s2_1", e.target.value)}
                disabled={dropdownFillLocked}
                className={dropdownFillLocked && dropdownAnswers["s2_1"] === exercise3.sentences[1].correct[1] ? "correct-select" : ""}
                value={dropdownAnswers["s2_1"] || ""}
              >
                <option value="">---</option>
                {exercise3.allOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <span>бар.</span>
            </div>
          </div>
        </div>
      ),
      checkAnswer: isDropdownFillComplete
    },
    {
      banner: exercise4.question,
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/5tema/${exercise4.img}`} className="task-img-large" alt="task" />
          </div>
          <p className="question-translation">{exercise4.trans}</p>
          <div className="dropdown-container">
            <select 
              value={pronounAnswer1 || ""} 
              onChange={(e) => handleDropdownChange(e.target.value)}
              disabled={pronounLocked1}
              className={pronounLocked1 ? getPronounClass(pronounAnswer1, pronounAnswer1, exercise4.correct) : ""}
            >
              <option value="">---</option>
              {exercise4.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <span className="verb-text">{exercise4.verb}</span>
          </div>
        </div>
      ),
      checkAnswer: isPronoun1Complete
    },
    {
      banner: exercise5.question,
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/5tema/${exercise5.img}`} className="task-img-large" alt="task" />
          </div>
          <p className="question-translation">{exercise5.trans}</p>
          <div className="dropdown-container">
            <select 
              value={pronounAnswer2 || ""} 
              onChange={(e) => handleDropdownChange2(e.target.value)}
              disabled={pronounLocked2}
              className={pronounLocked2 ? getPronounClass(pronounAnswer2, pronounAnswer2, exercise5.correct) : ""}
            >
              <option value="">---</option>
              {exercise5.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <span className="verb-text">{exercise5.verb}</span>
          </div>
        </div>
      ),
      checkAnswer: isPronoun2Complete
    },
    {
      banner: exercise6.question,
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/5tema/${exercise6.img}`} className="task-img-large" alt="task" />
          </div>
          <p className="question-translation">{exercise6.trans}</p>
          <div className="quiz-options-horizontal">
            {exercise6.options.map((opt, idx) => (
              <button 
                key={idx} 
                className={getOptionClass(idx, choiceAnswer1, exercise6.correct)} 
                onClick={() => handleChoiceClick(idx, 1, exercise6.correct)}
                disabled={choiceLocked1}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: isChoice1Complete
    },
    {
      banner: exercise7.question,
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/5tema/${exercise7.img}`} className="task-img-large" alt="task" />
          </div>
          <p className="question-translation">{exercise7.trans}</p>
          <div className="quiz-options-horizontal">
            {exercise7.options.map((opt, idx) => (
              <button 
                key={idx} 
                className={getOptionClass(idx, choiceAnswer2, exercise7.correct)} 
                onClick={() => handleChoiceClick(idx, 2, exercise7.correct)}
                disabled={choiceLocked2}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: isChoice2Complete
    }
  ];

  const handleReset = () => {
    setInputWord1("");
    setSpellingLocked1(false);
    setInputWord2("");
    setSpellingLocked2(false);
    setDropdownAnswers({});
    setDropdownFillLocked(false);
    setPronounAnswer1(null);
    setPronounLocked1(false);
    setPronounAnswer2(null);
    setPronounLocked2(false);
    setChoiceAnswer1(null);
    setChoiceLocked1(false);
    setChoiceAnswer2(null);
    setChoiceLocked2(false);
  };

  return (
    <ExerciseTemplate
      title="Бул менин классым / көнүгүү"
      steps={steps}
      totalSteps={7}
      onReset={handleReset}
      containerClass="klass-exercise"
    />
  );
};

export default KlassExercise;