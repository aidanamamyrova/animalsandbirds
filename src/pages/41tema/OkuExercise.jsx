// pages/31tema/OkuExercise.jsx
import React, { useState, useEffect } from 'react';
import ExerciseTemplate from '../../components/ExerciseTemplate';
import '../../components/ExerciseCommon.css';
import "./OkuExercise.css";

const OkuExercise = () => {
  // Состояния для упражнений
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemStatus, setItemStatus] = useState({}); // для отслеживания статуса каждой кнопки
  const [multiChoiceLocked, setMultiChoiceLocked] = useState(false);
  
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [activeWordId, setActiveWordId] = useState(null);
  const [matchingLocked, setMatchingLocked] = useState(false);
  
  const [inputs, setInputs] = useState({});
  const [fillLettersLocked, setFillLettersLocked] = useState(false);
  
  const [dropdownAnswers, setDropdownAnswers] = useState({});
  const [dropdownLocked, setDropdownLocked] = useState(false);

  // Данные упражнений
  const exercise1 = {
    type: "multi-choice",
    question: "Устолдо эмне бар?",
    translation: "Что есть на столе?",
    img: "desk_items.png",
    options: ["Клей", "Кайчы", "Боек", "Сызгыч", "Калем", "Кагаз", "Сызгыч"],
    correctItems: ["Клей", "Кайчы", "Боек", "Калем", "Кагаз"]
  };

  const exercise2 = {
    type: "matching",
    question: "Дал келтир",
    translation: "Сопоставление",
    pairs: [
      { id: 1, text: "кайчы", img: "scissors.png" },
      { id: 2, text: "сызгыч", img: "ruler.png" },
      { id: 3, text: "боек", img: "paints.png" },
      { id: 4, text: "жон баштык", img: "backpack.png" },
      { id: 5, text: "бор", img: "chalks.png" },
      { id: 6, text: "китеп", img: "book.png" }
    ]
  };

  const exercise3 = {
    type: "fill-letters",
    question: "Сөздөрдү толуктагыла",
    translation: "Дополните слова",
    items: [
      { id: "w1", word: "дептер", missing: [2], correct: "п" },
      { id: "w2", word: "калемсап", missing: [7], correct: "п" },
      { id: "w3", word: "учтагыч", missing: [2], correct: "т" },
      { id: "w4", word: "өчүргүч", missing: [6], correct: "ч" }
    ]
  };

  const exercise4 = {
    type: "dropdown-sentence",
    question: "Сүйлөмдү толуктагыла",
    translation: "Дополните предложение",
    img: "backpak_ruler.png",
    sentence: ["Бул", "___", "жана", "___"],
    options: ["жон баштык", "сызгыч", "калем"],
    correct: { select1: "жон баштык", select2: "сызгыч" }
  };

  // Обработчики для упражнения 1
  const handleMultiChoiceClick = (opt) => {
    if (!multiChoiceLocked) {
      const isCorrect = exercise1.correctItems.includes(opt);
      const isSelected = selectedItems.includes(opt);
      
      // Обновляем статус кнопки
      setItemStatus(prev => ({
        ...prev,
        [opt]: isSelected ? null : (isCorrect ? 'correct' : 'wrong')
      }));
      
      // Обновляем выбранные элементы
      setSelectedItems(prev => 
        prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]
      );
    }
  };

  // Эффект для проверки завершения упражнения 1
  useEffect(() => {
    if (!multiChoiceLocked && selectedItems.length === exercise1.correctItems.length) {
      const allCorrect = selectedItems.every(val => exercise1.correctItems.includes(val));
      if (allCorrect) {
        setMultiChoiceLocked(true);
      }
    }
  }, [selectedItems, multiChoiceLocked]);

 // Обработчики для упражнения 2 (без подсказки и без подсветки)
const [activeSelection, setActiveSelection] = useState({ type: null, id: null });

const handleMatchingWordClick = (pairId) => {
  if (!matchingLocked && !matchedPairs.includes(pairId)) {
    if (activeSelection.type === null) {
      // Выбрали слово
      setActiveSelection({ type: 'word', id: pairId });
    } else if (activeSelection.type === 'word' && activeSelection.id === pairId) {
      // Отмена выбора
      setActiveSelection({ type: null, id: null });
    } else if (activeSelection.type === 'image') {
      // Проверяем соответствие
      if (activeSelection.id === pairId) {
        setMatchedPairs(prev => [...prev, pairId]);
      }
      setActiveSelection({ type: null, id: null });
    } else {
      setActiveSelection({ type: null, id: null });
    }
  }
};

const handleMatchingImageClick = (pairId) => {
  if (!matchingLocked && !matchedPairs.includes(pairId)) {
    if (activeSelection.type === null) {
      // Выбрали картинку
      setActiveSelection({ type: 'image', id: pairId });
    } else if (activeSelection.type === 'image' && activeSelection.id === pairId) {
      // Отмена выбора
      setActiveSelection({ type: null, id: null });
    } else if (activeSelection.type === 'word') {
      // Проверяем соответствие
      if (activeSelection.id === pairId) {
        setMatchedPairs(prev => [...prev, pairId]);
      }
      setActiveSelection({ type: null, id: null });
    } else {
      setActiveSelection({ type: null, id: null });
    }
  }
};

  // Эффект для проверки завершения упражнения 3
  useEffect(() => {
    if (!fillLettersLocked) {
      const allFilled = exercise3.items.every(item => inputs[item.id] !== undefined && inputs[item.id] !== "");
      if (allFilled) {
        const allCorrect = exercise3.items.every(item => inputs[item.id] === item.correct);
        if (allCorrect) {
          setFillLettersLocked(true);
        }
      }
    }
  }, [inputs, fillLettersLocked]);

  const handleDropdownChange = (select, value) => {
    if (!dropdownLocked) {
      setDropdownAnswers(prev => ({ ...prev, [select]: value }));
    }
  };

  // Эффект для проверки завершения упражнения 4
  useEffect(() => {
    if (!dropdownLocked && dropdownAnswers.select1 && dropdownAnswers.select2) {
      const isCorrect = dropdownAnswers.select1 === exercise4.correct.select1 && 
                        dropdownAnswers.select2 === exercise4.correct.select2;
      if (isCorrect) {
        setDropdownLocked(true);
      }
    }
  }, [dropdownAnswers, dropdownLocked]);

  // Функции проверки для шаблона
  const isMultiChoiceComplete = () => {
    if (selectedItems.length !== exercise1.correctItems.length) return null;
    return selectedItems.every(val => exercise1.correctItems.includes(val));
  };

  const isMatchingComplete = () => {
    if (matchedPairs.length !== exercise2.pairs.length) return null;
    return true;
  };

  const isFillLettersComplete = () => {
    const allFilled = exercise3.items.every(item => inputs[item.id] !== undefined && inputs[item.id] !== "");
    if (!allFilled) return null;
    return exercise3.items.every(item => inputs[item.id] === item.correct);
  };

  const isDropdownComplete = () => {
    if (!dropdownAnswers.select1 || !dropdownAnswers.select2) return null;
    return dropdownAnswers.select1 === exercise4.correct.select1 && 
           dropdownAnswers.select2 === exercise4.correct.select2;
  };

  // Получение класса для кнопки (упражнение 1)
  const getOptionClass = (opt) => {
    const status = itemStatus[opt];
    if (status === 'correct') return "quiz-option correct-highlight";
    if (status === 'wrong') return "quiz-option wrong-highlight";
    if (selectedItems.includes(opt)) return "quiz-option selected";
    return "quiz-option";
  };

  // Создание шагов
  const steps = [
    // Шаг 1: Multi-choice
    {
      banner: exercise1.question,
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/31tema/${exercise1.img}`} className="task-img-large" alt="task" />
          </div>
          <p className="question-translation">{exercise1.translation}</p>
          <div className="quiz-options-horizontal">
            {exercise1.options.map((opt, i) => (
              <button 
                key={i} 
                className={getOptionClass(opt)} 
                onClick={() => handleMultiChoiceClick(opt)}
                disabled={multiChoiceLocked}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        const result = isMultiChoiceComplete();
        return result;
      }
    },
  // Шаг 2: Matching 
{
  banner: exercise2.question,
  content: (
    <div className="step-content">
      <p className="question-translation">{exercise2.translation}</p>
      <div className="matching-container-horizontal">
        {/* Верхний ряд: Слова */}
        <div className="matching-row-words">
          {exercise2.pairs.map(pair => (
            <button
              key={pair.id}
              className={`match-item ${matchedPairs.includes(pair.id) ? "matched" : ""}`}
              onClick={() => handleMatchingWordClick(pair.id)}
              disabled={matchingLocked || matchedPairs.includes(pair.id)}
            >
              {pair.text}
            </button>
          ))}
        </div>

        {/* Нижний ряд: Картинки */}
        <div className="matching-row-images">
          {exercise2.pairs.map(pair => (
            <div 
              key={pair.id} 
              className={`match-image-item ${matchedPairs.includes(pair.id) ? "matched-img" : ""}`}
              onClick={() => handleMatchingImageClick(pair.id)}
            >
              <img src={`/src/assets/31tema/${pair.img}`} alt="item" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  checkAnswer: () => {
    const result = isMatchingComplete();
    return result;
  }
},
    // Шаг 3: Fill letters
    {
      banner: exercise3.question,
      content: (
        <div className="step-content">
          <p className="question-translation">{exercise3.translation}</p>
          <div className="fill-letters-container">
            {exercise3.items.map((item) => (
              <div key={item.id} className="word-row">
                {item.word.split('').map((char, charIdx) => (
                  <span key={charIdx} className={`char-box ${inputs[item.id] && inputs[item.id] === item.correct ? "correct" : inputs[item.id] ? "wrong" : ""}`}>
                    {item.missing.includes(charIdx) ? (
                      <input 
                        type="text" 
                        maxLength="1" 
                        value={inputs[item.id] || ""}
                        onChange={(e) => handleFillLettersChange(item.id, e.target.value)}
                        disabled={fillLettersLocked}
                      />
                    ) : char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ),
      checkAnswer: () => {
        const result = isFillLettersComplete();
        return result;
      }
    },
    // Шаг 4: Dropdown sentence
    {
      banner: exercise4.question,
      content: (
        <div className="step-content">
          <div className="task-image-container">
            <img src={`/src/assets/31tema/${exercise4.img}`} className="task-img-large" alt="task" />
          </div>
          <p className="question-translation">{exercise4.translation}</p>
          <div className="dropdown-container">
            <div className="sentence-row">
              <span className="sentence-word">{exercise4.sentence[0]}</span>
              <select 
                className={`sentence-select ${dropdownAnswers.select1 === exercise4.correct.select1 ? "correct-select" : dropdownAnswers.select1 ? "wrong-select" : ""}`}
                value={dropdownAnswers.select1 || ""} 
                onChange={(e) => handleDropdownChange("select1", e.target.value)}
                disabled={dropdownLocked}
              >
                <option value="">___</option>
                {exercise4.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <span className="sentence-word">{exercise4.sentence[2]}</span>
              <select 
                className={`sentence-select ${dropdownAnswers.select2 === exercise4.correct.select2 ? "correct-select" : dropdownAnswers.select2 ? "wrong-select" : ""}`}
                value={dropdownAnswers.select2 || ""} 
                onChange={(e) => handleDropdownChange("select2", e.target.value)}
                disabled={dropdownLocked}
              >
                <option value="">___</option>
                {exercise4.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
        </div>
      ),
      checkAnswer: () => {
        const result = isDropdownComplete();
        return result;
      }
    }
  ];

  const handleReset = () => {
    setSelectedItems([]);
    setItemStatus({});
    setMultiChoiceLocked(false);
    setMatchedPairs([]);
    setActiveWordId(null);
    setMatchingLocked(false);
    setInputs({});
    setFillLettersLocked(false);
    setDropdownAnswers({});
    setDropdownLocked(false);
  };

  return (
    <ExerciseTemplate
      title="Окуу куралдары / көнүгүү"
      steps={steps}
      totalSteps={4}
      onReset={handleReset}
      containerClass="oku-exercise"
    />
  );
};

export default OkuExercise;