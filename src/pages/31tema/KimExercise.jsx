// pages/31tema/KimExercise.jsx
import React, { useState } from 'react';
import ExerciseTemplate from '../../components/ExerciseTemplate';
import "./KimExercise.css";

const KimExercise = () => {
  // Состояния для упражнений
  const [catAnswers, setCatAnswers] = useState({ kim: [], emne: [] });
  const [word1, setWord1] = useState(["", "", ""]); // КЫЗ
  const [word2, setWord2] = useState(["", "", "", "", ""]); // КИТЕП
  const [selectedKymder, setSelectedKymder] = useState("");
  const [selectedEmneler, setSelectedEmneler] = useState("");
  const [placedAnswers, setPlacedAnswers] = useState({});

  const catItems = [
    { id: 1, img: "book.png", type: "emne" },
    { id: 2, img: "boy.png", type: "kim" },
    { id: 3, img: "pencil.png", type: "emne" },
    { id: 4, img: "teacher.png", type: "kim" },
    { id: 5, img: "girl.png", type: "kim" },
    { id: 6, img: "board_desk.png", type: "emne" },
  ];

  const exercise6Data = [
    { id: 1, img: "girl.png", correct: "Кыз бала" },
    { id: 2, img: "boy.png", correct: "Эркек бала" },
    { id: 3, img: "teacher.png", correct: "Мугалим" },
    { id: 4, img: "students_group.png", correct: "Окуучулар" },
    { id: 5, img: "boys_group.png", correct: "Балдар" },
    { id: 6, img: "girls_group.png", correct: "Кыздар" }
  ];

  const options6 = ["Окуучулар", "Балдар", "Мугалим", "Кыздар", "Эркек бала", "Кыз бала"];

  const handleCatDrop = (e, targetCat) => {
    e.preventDefault();
    try {
      const item = JSON.parse(e.dataTransfer.getData("item"));
      if (item.type === targetCat) {
        if (!catAnswers[targetCat].find(i => i.id === item.id)) {
          setCatAnswers(prev => ({ ...prev, [targetCat]: [...prev[targetCat], item] }));
        }
      }
    } catch (err) { console.error("Drop error", err); }
  };

  const handleLetterClick = (letter, stepNum) => {
    if (stepNum === 2) {
      const nextIdx = word1.indexOf("");
      if (nextIdx !== -1) {
        const newWord = [...word1];
        newWord[nextIdx] = letter;
        setWord1(newWord);
      }
    } else if (stepNum === 3) {
      const nextIdx = word2.indexOf("");
      if (nextIdx !== -1) {
        const newWord = [...word2];
        newWord[nextIdx] = letter;
        setWord2(newWord);
      }
    }
  };

  const handleLetterRemove = (index, stepNum) => {
    if (stepNum === 2 && word1[index]) {
      const newWord = [...word1];
      newWord[index] = "";
      setWord1(newWord);
    } else if (stepNum === 3 && word2[index]) {
      const newWord = [...word2];
      newWord[index] = "";
      setWord2(newWord);
    }
  };

  const handleSelectChange = (val, correct, setter) => {
    setter(val);
  };

  const handleDragStart = (e, text) => e.dataTransfer.setData("text", text);

  const handleDrop6 = (e, id) => {
    e.preventDefault();
    const droppedText = e.dataTransfer.getData("text");
    const item = exercise6Data.find(d => d.id === id);
    const isCorrect = droppedText === item.correct;
    setPlacedAnswers(prev => ({ ...prev, [id]: { text: droppedText, isCorrect } }));
  };

  // Функции проверки для каждого шага
  const stepCheckFns = {
    1: () => {
      return catAnswers.kim.length + catAnswers.emne.length === catItems.length;
    },
    2: () => {
      if (word1.join("") === "") return null;
      return word1.join("") === "КЫЗ";
    },
    3: () => {
      if (word2.join("") === "") return null;
      return word2.join("") === "КИТЕП";
    },
    4: () => {
      if (!selectedKymder) return null;
      return selectedKymder === "Окуучулар";
    },
    5: () => {
      if (!selectedEmneler) return null;
      return selectedEmneler === "Калемдер";
    },
    6: () => {
      const allFilled = Object.keys(placedAnswers).length === exercise6Data.length;
      if (!allFilled) return null;
      return Object.values(placedAnswers).every(a => a.isCorrect);
    }
  };

  const handleReset = () => {
    setCatAnswers({ kim: [], emne: [] });
    setWord1(["", "", ""]);
    setWord2(["", "", "", "", ""]);
    setSelectedKymder("");
    setSelectedEmneler("");
    setPlacedAnswers({});
  };

  // Создание шагов
  const steps = [
    {
      banner: "Категорияга бөл",
      content: (
        <div className="step-content">
          <div className="cat-header-row">
            <div className="cat-label yellow">Ким?</div>
            <div className="cat-label green">Эмне?</div>
          </div>
          <div className="cat-zones-row">
            <div className="cat-zone yellow-zone" onDragOver={e => e.preventDefault()} onDrop={e => handleCatDrop(e, 'kim')}>
              {catAnswers.kim.map(i => <img key={i.id} src={`/src/assets/31tema/${i.img}`} className="mini-img" alt="kim" />)}
            </div>
            <div className="cat-zone green-zone" onDragOver={e => e.preventDefault()} onDrop={e => handleCatDrop(e, 'emne')}>
              {catAnswers.emne.map(i => <img key={i.id} src={`/src/assets/31tema/${i.img}`} className="mini-img" alt="emne" />)}
            </div>
          </div>
          <div className="cat-options-pool">
            {catItems.filter(i => !catAnswers.kim.concat(catAnswers.emne).find(a => a.id === i.id)).map(item => (
              <img 
                key={item.id} 
                src={`/src/assets/31tema/${item.img}`} 
                draggable 
                onDragStart={e => e.dataTransfer.setData("item", JSON.stringify(item))}
                className="pool-img"
                alt="option"
              />
            ))}
          </div>
        </div>
      ),
      checkAnswer: stepCheckFns[1]
    },
    {
      banner: "Сөздү кура",
      content: (
        <div className="step-content words-step">
          <div className="word-block">
            <img src="/src/assets/31tema/girl.png" className="task-img-large" alt="task" />
            <div className="letter-slots">
              {word1.map((l, i) => (
                <div key={i} className="letter-box" onClick={() => handleLetterRemove(i, 2)}>
                  {l}
                </div>
              ))}
            </div>
            <div className="letters-pool">
              {["Ы", "К", "З"].map((l, i) => (
                <button key={i} className="letter-btn" onClick={() => handleLetterClick(l, 2)}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      checkAnswer: stepCheckFns[2]
    },
    {
      banner: "Сөздү кура",
      content: (
        <div className="step-content words-step">
          <div className="word-block">
            <h3>Бул эмне?</h3>
            <img src="/src/assets/31tema/book.png" className="task-img-large" alt="task" style={{ height: "160px", width: "auto" }}  />
            <div className="letter-slots">
              {word2.map((l, i) => (
                <div key={i} className="letter-box" onClick={() => handleLetterRemove(i, 3)}>
                  {l}
                </div>
              ))}
            </div>
            <div className="letters-pool">
              {["К", "Т", "И", "П", "Е"].map((l, i) => (
                <button key={i} className="letter-btn" onClick={() => handleLetterClick(l, 3)}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      checkAnswer: stepCheckFns[3]
    },
    {
      banner: "Туура жоопту танда",
      content: (
        <div className="step-content select-step">
          <div className="word-block">
            <img src="/src/assets/31tema/students_group.png" className="task-img-large" alt="group" />
            <div className="select-container">
              <p>Булар кимдер?</p>
              <div className="sentence-row">
                <span>Булар </span>
                <select 
                  value={selectedKymder} 
                  onChange={(e) => handleSelectChange(e.target.value, "Окуучулар", setSelectedKymder)}
                  className={selectedKymder === "Окуучулар" ? "correct-select" : ""}
                >
                  <option value="">---</option>
                  <option value="Окуучулар">Окуучулар</option>
                  <option value="Балдар">Балдар</option>
                  <option value="Кыздар">Кыздар</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ),
      checkAnswer: stepCheckFns[4]
    },
    {
      banner: "Туура жоопту танда",
      content: (
        <div className="step-content select-step">
          <div className="word-block">
            <img src="/src/assets/31tema/pencils.png" className="task-img-large" alt="pencils" />
            <div className="select-container">
              <p>Булар эмнелер?</p>
              <div className="sentence-row">
                <span>Булар </span>
                <select 
                  value={selectedEmneler} 
                  onChange={(e) => handleSelectChange(e.target.value, "Калемдер", setSelectedEmneler)}
                  className={selectedEmneler === "Калемдер" ? "correct-select" : ""}
                >
                  <option value="">---</option>
                  <option value="Китептер">Китептер</option>
                  <option value="Такталар">Такталар</option>
                  <option value="Калемдер">Калемдер</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ),
      checkAnswer: stepCheckFns[5]
    },
    {
      banner: "Сүрөткө карап, тиешелүү сөздү кой",
      content: (
        <div className="step-content match-step">
          <div className="kim-ex-grid">
            {exercise6Data.map((item) => (
              <div key={item.id} className="kim-ex-card">
                <img src={`/src/assets/31tema/${item.img}`} alt="task" />
                <div 
                  className={`kim-drop-zone ${placedAnswers[item.id] ? (placedAnswers[item.id].isCorrect ? 'correct' : 'wrong') : ''}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop6(e, item.id)}
                >
                  {placedAnswers[item.id]?.text || "Тартып кел..."}
                </div>
              </div>
            ))}
          </div>
          <div className="kim-options-pool">
            {options6.map((opt, index) => (
              <div 
                key={index} 
                className="kim-drag-item" 
                draggable 
                onDragStart={(e) => handleDragStart(e, opt)}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      ),
      checkAnswer: stepCheckFns[6]
    }
  ];

  return (
    <ExerciseTemplate
      title="Ким? Эмне? / көнүгүү"
      steps={steps}
      totalSteps={6}
      onReset={handleReset}
      containerClass="kim-exercise"
    />
  );
};

export default KimExercise;