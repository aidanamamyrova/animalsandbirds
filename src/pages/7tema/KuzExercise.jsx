// pages/7tema/KuzExercise.jsx
import React, { useState } from 'react';
import ExerciseTemplate from '../../components/ExerciseTemplate';
import "./KuzExercise.css";

const KuzExercise = () => {
  // Состояния для упражнений
  const [seasonAnswer, setSeasonAnswer] = useState("");
  const [seasonLocked, setSeasonLocked] = useState(false);
  
  const [weatherAnswer, setWeatherAnswer] = useState("");
  const [weatherLocked, setWeatherLocked] = useState(false);
  
  const [wordLetters, setWordLetters] = useState(["", "", ""]);
  const [wordLocked, setWordLocked] = useState(false);
  
  const [syllableGroups, setSyllableGroups] = useState({});
  const [constructedWords, setConstructedWords] = useState([]);
  const [syllableLocked, setSyllableLocked] = useState(false);
  
  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const [leafLocked, setLeafLocked] = useState(false);
  
  const [sentenceOrder, setSentenceOrder] = useState(["", "", "", ""]);
  const [availableWords, setAvailableWords] = useState(["жаан", "Эшикте", "жаап", "жатат"]);
  const [sentenceComplete, setSentenceComplete] = useState(false);
  const [sentenceLocked, setSentenceLocked] = useState(false);

  // Данные
  const seasonOptions = ["кыш", "күз", "жаз"];
  const weatherOptions = ["салкын", "ысык", "суук"];
  const correctScramble = ["к", "ү", "з"];
  
  const syllables = [
    { id: 1, text: "жа", group: "word1" },
    { id: 2, text: "рак", group: "word2" },
    { id: 3, text: "бы", group: "word2" },
    { id: 4, text: "жал", group: "word2" },
    { id: 5, text: "шыл", group: "word1" }
  ];

  const targetWords = [
    { id: "word1", syllables: ["жа", "шыл"], correct: "жашыл" },
    { id: "word2", syllables: ["жал", "бы", "рак"], correct: "жалбырак" },
  ];

  const leaves = [
    { id: 1, color: "green", name: "", img: "green_leaf.png", isCorrect: false },
    { id: 2, color: "yellow", name: "", img: "leaf_yellow.png", isCorrect: true },
    { id: 3, color: "brown", name: "", img: "leaf_red.png", isCorrect: false },
  ];

  const correctSentence = ["Эшикте", "жаан", "жаап", "жатат"];

  // Функции для упражнений с автоматической блокировкой
  const handleSeasonChange = (val) => {
    if (!seasonLocked) {
      setSeasonAnswer(val);
      if (val === "күз") setSeasonLocked(true);
    }
  };

  const handleWeatherChange = (val) => {
    if (!weatherLocked) {
      setWeatherAnswer(val);
      if (val === "салкын") setWeatherLocked(true);
    }
  };

  const handleLetterClick = (letter) => {
    if (wordLocked) return;
    const nextIdx = wordLetters.indexOf("");
    if (nextIdx !== -1) {
      const newWord = [...wordLetters];
      newWord[nextIdx] = letter;
      setWordLetters(newWord);
      if (newWord.join("") === "күз") setWordLocked(true);
    }
  };

  const handleLetterRemove = (index) => {
    if (!wordLocked && wordLetters[index]) {
      const newWord = [...wordLetters];
      newWord[index] = "";
      setWordLetters(newWord);
    }
  };

  const handleSyllableClick = (syllable, groupId) => {
    if (syllableLocked) return;
    const currentGroup = syllableGroups[groupId] || [];
    if (!currentGroup.includes(syllable.text)) {
      const newGroup = [...currentGroup, syllable.text];
      setSyllableGroups(prev => ({ ...prev, [groupId]: newGroup }));
      
      const targetWord = targetWords.find(w => w.id === groupId);
      if (newGroup.length === targetWord.syllables.length) {
        const constructed = newGroup.join("");
        if (constructed === targetWord.correct) {
          setConstructedWords(prev => [...prev, groupId]);
        }
      }
      // Проверка на завершение всех слов
      const allWordsComplete = targetWords.every(word => 
        [...(syllableGroups[word.id] || []), ...(groupId === word.id ? [syllable.text] : [])].length === word.syllables.length
      );
      if (allWordsComplete) setSyllableLocked(true);
    }
  };

  const handleLeafClick = (leafId) => {
    if (!leafLocked && selectedLeaf === null) {
      setSelectedLeaf(leafId);
      if (leafId === 2) setLeafLocked(true);
    }
  };

  const handleWordClick = (word, index) => {
    if (sentenceLocked) return;
    if (sentenceOrder[index] === "") {
      const newOrder = [...sentenceOrder];
      newOrder[index] = word;
      setSentenceOrder(newOrder);
      setAvailableWords(availableWords.filter(w => w !== word));
      const allFilled = newOrder.every(slot => slot !== "");
      setSentenceComplete(allFilled);
      if (allFilled && newOrder.join(" ") === correctSentence.join(" ")) {
        setSentenceLocked(true);
      }
    }
  };

  const handleSlotRemove = (index) => {
    if (!sentenceLocked && sentenceOrder[index]) {
      const removedWord = sentenceOrder[index];
      const newOrder = [...sentenceOrder];
      newOrder[index] = "";
      setSentenceOrder(newOrder);
      setAvailableWords([...availableWords, removedWord]);
      setSentenceComplete(false);
    }
  };

  // CSS классы
  const getLetterClass = (char, index) => {
    if (!char) return "letter-box";
    if (wordLocked) {
      return char === correctScramble[index] ? "letter-box correct" : "letter-box wrong";
    }
    return "letter-box";
  };

  const getSeasonBtnClass = (opt) => {
    if (!seasonAnswer) return "season-btn";
    if (seasonAnswer === opt) {
      return opt === "күз" ? "season-btn selected correct" : "season-btn selected wrong";
    }
    if (seasonLocked) return "season-btn disabled";
    return "season-btn";
  };

  const getWeatherBtnClass = (opt) => {
    if (!weatherAnswer) return "weather-btn";
    if (weatherAnswer === opt) {
      return opt === "салкын" ? "weather-btn selected correct" : "weather-btn selected wrong";
    }
    if (weatherLocked) return "weather-btn disabled";
    return "weather-btn";
  };

  const getLeafClass = (leaf) => {
    if (selectedLeaf === null) return "leaf-card";
    if (selectedLeaf === leaf.id) {
      return leaf.isCorrect ? "leaf-card selected correct" : "leaf-card selected wrong";
    }
    return "leaf-card";
  };

  const isSyllableComplete = () => {
    return constructedWords.length === targetWords.length;
  };

  // Определение шагов
  const steps = [
    {
      banner: "1. Азыр кайсы мезгил?",
      content: (
        <div className="step-content select-step">
          <div className="word-block">
            <img src="/src/assets/31tema/main_kuz.png" className="task-img-large" alt="autumn" />
            <div className="select-container">
              <p className="question-text">Азыр кайсы мезгил?</p>
              <div className="options-row">
                {seasonOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    className={getSeasonBtnClass(opt)}
                    onClick={() => handleSeasonChange(opt)}
                    disabled={seasonLocked}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      checkComplete: () => seasonAnswer === "күз"
    },
    {
      banner: "2. Туура жоопту танда",
      content: (
        <div className="step-content select-step">
          <div className="word-block">
            <img src="/src/assets/31tema/main_kuz.png" className="task-img-large" alt="weather" />
            <div className="select-container">
              <p className="question-text">Күзүндө күн кандай болот?</p>
              <div className="options-row">
                {weatherOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    className={getWeatherBtnClass(opt)}
                    onClick={() => handleWeatherChange(opt)}
                    disabled={weatherLocked}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      checkComplete: () => weatherAnswer === "салкын"
    },
    {
      banner: "3. Туура жаз",
      content: (
        <div className="step-content words-step">
          <div className="word-block">
            <img src="/src/assets/31tema/weather_compare.png" className="task-img-large" alt="spring" />
            <p className="task-hint">Туура жаз</p>
            <div className="letter-slots">
              {wordLetters.map((l, i) => (
                <div key={i} className={getLetterClass(l, i)} onClick={() => handleLetterRemove(i)}>
                  {l}
                </div>
              ))}
            </div>
            <div className="letters-pool">
              {[ "ү","к", "з"].map((l, i) => (
                <button 
                  key={i} 
                  className="letter-btn" 
                  onClick={() => handleLetterClick(l)}
                  disabled={wordLocked || wordLetters.every(letter => letter !== "")}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      checkComplete: () => wordLetters.join("") === "күз"
    },
    {
      banner: "4. Муундардан сөздөрдү түзгүлө",
      content: (
        <div className="step-content syllables-step">
          <div className="syllables-container">
            <div className="syllables-pool">
              <h3>Муундар:</h3>
              <div className="syllables-grid">
                {syllables.map((syllable) => {
                  const isUsed = Object.values(syllableGroups).some(group => group.includes(syllable.text));
                  return (
                    <button
                      key={syllable.id}
                      className={`syllable-card ${isUsed ? "used" : ""}`}
                      onClick={() => {
                        if (!isUsed && !syllableLocked) {
                          if (syllable.text === "жа" || syllable.text === "шыл") {
                            handleSyllableClick(syllable, "word1");
                          } else {
                            handleSyllableClick(syllable, "word2");
                          }
                        }
                      }}
                      disabled={isUsed || syllableLocked}
                    >
                      {syllable.text}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="constructed-words">
              <h3>Түзүлгөн сөздөр:</h3>
              <div className="words-list">
                {targetWords.map((word) => (
                  <div key={word.id} className="word-result">
                    <span className="word-label">{word.id === "word1" ? "1-сөз:" : "2-сөз:"}</span>
                    <span className={`word-value ${constructedWords.includes(word.id) ? "completed" : ""}`}>
                      {constructedWords.includes(word.id) ? word.correct : (syllableGroups[word.id]?.join("") || "___")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      checkComplete: isSyllableComplete
    },
    {
      banner: "5. Сары жалбыракты тапкыла",
      content: (
        <div className="step-content leaf-step">
          <div className="leaf-container">
            <p className="leaf-question"></p>
            <div className="leaves-grid">
              {leaves.map((leaf) => (
                <div key={leaf.id} className={getLeafClass(leaf)} onClick={() => handleLeafClick(leaf.id)}>
                  <img src={`/src/assets/31tema/${leaf.img}`} className="leaf-img" alt={leaf.name} />
                  <span className="leaf-name">{leaf.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      checkComplete: () => selectedLeaf === 2
    },
 {
  banner: "6. Сүйлөмдү туура түзгүлө",
  content: (
    <div className="step-content sentence-step">
      <div className="sentence-container">
        {/* Добавить картинку */}
        <div className="task-image-container">
          <img src="/src/assets/31tema/rain_scene.png" className="sentence-img" alt="rain scene" />
        </div>
        <p className="sentence-question">Сүйлөмдү туура түзгүлө</p>
        <div className="sentence-slots">
          {sentenceOrder.map((word, idx) => (
            <div key={idx} className="sentence-slot" onClick={() => handleSlotRemove(idx)}>
              {word || "___"}
            </div>
          ))}
        </div>
        <div className="words-pool">
          {availableWords.map((word, idx) => (
            <button
              key={idx}
              className="word-btn"
              onClick={() => {
                const emptyIndex = sentenceOrder.findIndex(slot => slot === "");
                if (emptyIndex !== -1 && !sentenceLocked) handleWordClick(word, emptyIndex);
              }}
              disabled={sentenceLocked}
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  ),
  checkComplete: () => sentenceLocked
}
  ];

  const handleReset = () => {
    setSeasonAnswer("");
    setSeasonLocked(false);
    setWeatherAnswer("");
    setWeatherLocked(false);
    setWordLetters(["", "", ""]);
    setWordLocked(false);
    setSyllableGroups({});
    setConstructedWords([]);
    setSyllableLocked(false);
    setSelectedLeaf(null);
    setLeafLocked(false);
    setSentenceOrder(["", "", "", ""]);
    setAvailableWords(["жаан", "Эшикте", "жаап", "жатат"]);
    setSentenceComplete(false);
    setSentenceLocked(false);
  };

  return (
    <ExerciseTemplate
      title="Күз мезгили / көнүгүү"
      steps={steps}
      totalSteps={6}
      onReset={handleReset}
      containerClass="kuz-exercise"
    />
  );
};

export default KuzExercise;