import React, { useState, useRef } from "react";
import "./AnimalsExercise.css";

function AnimalsExercise() {
  const [currentStep, setCurrentStep] = useState(0);
  const [connections, setConnections] = useState([]);
  const [activeStart, setActiveStart] = useState(null);
  const [wrongDots, setWrongDots] = useState([]);
  const [correctDots, setCorrectDots] = useState([]);
  const [showMatchErrors, setShowMatchErrors] = useState(false);
  const [showWriteErrors, setShowWriteErrors] = useState(false);
  const [placedLetters, setPlacedLetters] = useState(Array(8).fill(null));
  const [usedLetterIds, setUsedLetterIds] = useState([]);
  const [placedGroups, setPlacedGroups] = useState({ domestic: [], wild: [] });
  const [groupError, setGroupError] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const containerRef = useRef(null);

  const matchGames = {
    0: {
      title: "Ким кимге таандык?",
      left: [
        { id: "l1", text: "Уй", img: "cow.png" },
        { id: "l2", text: "Бээ", img: "horse.png" },
        { id: "l3", text: "Эчки", img: "goat.png" },
      ],
      right: [
        { id: "r1", text: "Улак", img: "ulak.png" },
        { id: "r2", text: "Музоо", img: "muzo.png" },
        { id: "r3", text: "Кулун", img: "kulun.png" },
      ],
      correct: { l1: "r2", l2: "r3", l3: "r1" },
    },

    4: {
      title: "Ким кимге таандык?",
      left: [
        { id: "l1", text: "Бөрү", img: "wolf.png" },
        { id: "l2", text: "Коён", img: "rabbit.png" },
        { id: "l3", text: "Аюу", img: "bear.png" },
      ],
      right: [
        { id: "r1", text: "Мамалак", img: "bearbaby.png" },
        { id: "r2", text: "Бөлтүрүк", img: "wolfbaby.png" },
        { id: "r3", text: "Көжөк", img: "rabbitbaby.png" },
      ],
      correct: { l1: "r2", l2: "r3", l3: "r1" },
    },

    5: {
      title: "Кайда жашайт?",
      left: [
        { id: "l1", text: "Түлкү", img: "fox.png" },
        { id: "l2", text: "Аркар", img: "arkar.png" },
        { id: "l3", text: "Суур", img: "marmot.png" },
      ],
      right: [
        { id: "r1", text: "Тoo", img: "mountain.png" },
        { id: "r2", text: "Ийин", img: "burrow.png" },
        { id: "r3", text: "Токой", img: "forest.png" },
      ],
      correct: { l1: "r3", l2: "r1", l3: "r2" },
    },
  };

  const writeGames = {
    1: {
      word: ["К", "О", "Й"],
      letters: ["Й", "К", "О", "Т"],
      img: "koi.png",
    },
    2: {
      word: ["Ч", "О", "Ч", "К", "О"],
      letters: ["О", "О", "Ч", "К", "Ч", "Р"],
      img: "pig.png",
    },
    3: {
      word: ["К", "Ү", "Ч", "Ү", "К"],
      letters: ["Ү", "К", "Ч", "Ү", "К"],
      img: "babydog.png",
    },
    6: {
      word: ["М", "Ө", "Н", "Д", "Ө", "Л", "Ө", "Й"],
      letters: ["Ө", "М", "Д", "Й", "Н", "Ө", "Л", "Ө"],
      img: "mondoloy.png",
      clickMode: true,
    },
    7: {
      word: ["Ч", "Ө", "Н", "Д", "Ө", "Л", "Ө", "Й"],
      letters: ["Ө", "Ч", "Д", "Й", "Н", "Ө", "Л", "Ө"],
      img: "chondoloy.png",
      clickMode: true,
    },
  };

  const groupAnimals = [
    { id: "cow", name: "Уй", img: "cow.png", group: "domestic" },
    { id: "goat", name: "Эчки", img: "goat.png", group: "domestic" },
    { id: "wolf", name: "Бөрү", img: "wolf.png", group: "wild" },
    { id: "fox", name: "Түлкү", img: "fox.png", group: "wild" },
  ];

  const currentMatching = matchGames[currentStep];
  const currentWriteGame = writeGames[currentStep];
  const correctWord = currentWriteGame?.word || [];
  const letters = currentWriteGame?.letters || [];

  const isMatched = (id) =>
    connections.some(
      (conn) => (conn.start.id === id || conn.end.id === id) && conn.isCorrect
    );

  const resetStepState = () => {
    setConnections([]);
    setActiveStart(null);
    setWrongDots([]);
    setCorrectDots([]);
    setShowMatchErrors(false);
    setShowWriteErrors(false);
    setPlacedLetters(Array(8).fill(null));
    setUsedLetterIds([]);
    setGroupError(false);
  };

  const handleNextClick = () => {
    if (currentStep === 8) {
      setIsFinished(true);
      return;
    }

    setCurrentStep(currentStep + 1);
    resetStepState();
  };

  const handleBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      resetStepState();
    }
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
      const isCorrect =
        side === "right"
          ? currentMatching.correct[activeStart.id] === id
          : currentMatching.correct[id] === activeStart.id;

      setConnections((prev) => [
        ...prev,
        { start: activeStart, end: point, isCorrect },
      ]);

      if (isCorrect) {
        setCorrectDots((prev) => [...prev, activeStart.id, point.id]);
      } else {
        setWrongDots((prev) => [...prev, activeStart.id, point.id]);

        setTimeout(() => {
          setWrongDots((prev) =>
            prev.filter((d) => d !== activeStart.id && d !== point.id)
          );
        }, 500);
      }
    }

    setActiveStart(null);
  };

  const handleDragStart = (e, letterData) => {
    e.dataTransfer.setData("letterData", JSON.stringify(letterData));
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    const letterData = JSON.parse(e.dataTransfer.getData("letterData"));

    const newLetters = [...placedLetters];

    if (newLetters[index]) {
      setUsedLetterIds((prev) =>
        prev.filter((id) => id !== newLetters[index].id)
      );
    }

    newLetters[index] = letterData;

    setPlacedLetters(newLetters);
    setUsedLetterIds((prev) => [...prev, letterData.id]);
    setShowWriteErrors(true);
  };

  const handleLetterClick = (letterData) => {
    const emptyIndex = placedLetters.findIndex(
      (item, index) => index < correctWord.length && item === null
    );

    if (emptyIndex === -1) return;

    const newLetters = [...placedLetters];
    newLetters[emptyIndex] = letterData;

    setPlacedLetters(newLetters);
    setUsedLetterIds((prev) => [...prev, letterData.id]);
    setShowWriteErrors(true);
  };

  const handleSlotClick = (index) => {
    const selectedLetter = placedLetters[index];

    if (!selectedLetter) return;

    const newLetters = [...placedLetters];
    newLetters[index] = null;

    setPlacedLetters(newLetters);
    setUsedLetterIds((prev) =>
      prev.filter((id) => id !== selectedLetter.id)
    );
  };

  const getLetterClass = (letterData, index) => {
    if (!letterData) return "animal-drop-slot";

    if (letterData.letter === correctWord[index]) {
      return "animal-drop-slot correct";
    }

    return showWriteErrors
      ? "animal-drop-slot wrong shake-error"
      : "animal-drop-slot wrong";
  };

  const handleAnimalGroupDrag = (e, animalId) => {
    e.dataTransfer.setData("animalId", animalId);
  };

  const handleGroupDrop = (e, groupName) => {
    e.preventDefault();

    const animalId = e.dataTransfer.getData("animalId");
    const animal = groupAnimals.find((item) => item.id === animalId);

    if (!animal) return;

    if (animal.group === groupName) {
      setPlacedGroups((prev) => ({
        ...prev,
        [groupName]: prev[groupName].includes(animalId)
          ? prev[groupName]
          : [...prev[groupName], animalId],
      }));
      setGroupError(false);
    } else {
      setGroupError(true);
      setTimeout(() => setGroupError(false), 600);
    }
  };

  const isAnimalPlaced = (id) => {
    return (
      placedGroups.domestic.includes(id) || placedGroups.wild.includes(id)
    );
  };

  const removeAnimalFromGroup = (animalId, groupName) => {
    setPlacedGroups((prev) => ({
      ...prev,
      [groupName]: prev[groupName].filter((id) => id !== animalId),
    }));
  };

  if (isFinished) {
    return (
      <div className="finish-screen">
        <div className="finish-card">
          <div className="finish-icon">🏆</div>

          <h1>Азаматсың!</h1>

          <p>Көнүгүүнүн аягы</p>

          <div className="finish-buttons">
            <button
              onClick={() => {
                setCurrentStep(0);
                setIsFinished(false);
                resetStepState();
              }}
            >
              Кайра аткаруу
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="animals-title">Үй / жапайы жаныбарлар</h2>

      <div className="animals-progress">
        <div
          className="animals-progress-fill"
          style={{ width: `${((currentStep + 1) / 9) * 100}%` }}
        ></div>
      </div>

      <div className="animals-header">
        {currentMatching && currentMatching.title}
        {currentWriteGame && "Туура жаз"}
        {currentStep === 8 && "Жаныбарларды бөлүштүр"}
      </div>

      {currentMatching && (
        <div className="animals-matching-area" ref={containerRef}>
          <svg className="animals-arrows-svg">
            {connections.map((conn, i) => (
              <line
                key={i}
                x1={conn.start.x}
                y1={conn.start.y}
                x2={conn.end.x}
                y2={conn.end.y}
                stroke={conn.isCorrect ? "#4CAF50" : "#ff4d4d"}
                strokeWidth="3"
              />
            ))}
          </svg>

          <div className="animals-matching-grid">
            <div className="animals-column">
              {currentMatching.left.map((item) => (
                <div key={item.id} className="animals-match-row">
                  <div className="animal-bubble">{item.text}</div>

                  <img
                    src={`/src/assets/animals/${item.img}`}
                    className="animal-img"
                    alt=""
                  />

                  <div
                    className={`animal-dot
                      ${activeStart?.id === item.id ? "active" : ""}
                      ${wrongDots.includes(item.id) ? "wrong-dot" : ""}
                      ${correctDots.includes(item.id) ? "correct-dot" : ""}
                      ${showMatchErrors && !isMatched(item.id) ? "wrong-dot" : ""}
                    `}
                    onClick={(e) => handlePointClick(item.id, "left", e)}
                  ></div>
                </div>
              ))}
            </div>

            <div className="animals-column">
              {currentMatching.right.map((item) => (
                <div key={item.id} className="animals-match-row">
                  <div
                    className={`animal-dot
                      ${wrongDots.includes(item.id) ? "wrong-dot" : ""}
                      ${correctDots.includes(item.id) ? "correct-dot" : ""}
                      ${showMatchErrors && !isMatched(item.id) ? "wrong-dot" : ""}
                    `}
                    onClick={(e) => handlePointClick(item.id, "right", e)}
                  ></div>

                  <img
                    src={`/src/assets/animals/${item.img}`}
                    className="animal-img"
                    alt=""
                  />

                  <div className="animal-bubble">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentWriteGame && (
        <div className="animals-write-area">
          <img
            src={`/src/assets/animals/${currentWriteGame.img}`}
            className="animal-task-img"
            alt=""
          />

          <div className="animal-slots-row">
            {correctWord.map((_, i) => (
              <div
                key={`${currentStep}-${i}-${showWriteErrors}`}
                className={getLetterClass(placedLetters[i], i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, i)}
                onClick={() => handleSlotClick(i)}
              >
                {placedLetters[i]?.letter}
              </div>
            ))}
          </div>

          <div className="animal-letters-pool">
            {letters.map((letter, i) => {
              const letterData = {
                id: `${currentStep}-${i}`,
                letter,
              };

              if (usedLetterIds.includes(letterData.id)) return null;

              return (
                <div
                  key={letterData.id}
                  className="animal-letter"
                  draggable={!currentWriteGame?.clickMode}
                  onDragStart={(e) => {
                    if (!currentWriteGame?.clickMode) {
                      handleDragStart(e, letterData);
                    }
                  }}
                  onClick={() => handleLetterClick(letterData)}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {currentStep === 8 && (
        <div className="group-game-area">
          <div className="group-zones">
            <div
              className={`group-zone ${groupError ? "group-error" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleGroupDrop(e, "domestic")}
            >
              <div className="zone-header">
                <h3>Yй</h3>

                <img
                  src="/src/assets/animals/home.png"
                  className="zone-img"
                  alt=""
                />
              </div>

              <div className="group-placed">
                {placedGroups.domestic.map((id) => {
                  const animal = groupAnimals.find((a) => a.id === id);

                  return (
                    <img
                      key={id}
                      src={`/src/assets/animals/${animal.img}`}
                      className="group-placed-img"
                      alt=""
                      title="Кайтаруу"
                      onClick={() => removeAnimalFromGroup(id, "domestic")}
                    />
                  );
                })}
              </div>
            </div>

            <div
              className={`group-zone ${groupError ? "group-error" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleGroupDrop(e, "wild")}
            >
              <div className="zone-header">
                <h3>Токой</h3>

                <img
                  src="/src/assets/animals/forest.png"
                  className="zone-img"
                  alt=""
                />
              </div>

              <div className="group-placed">
                {placedGroups.wild.map((id) => {
                  const animal = groupAnimals.find((a) => a.id === id);

                  return (
                    <img
                      key={id}
                      src={`/src/assets/animals/${animal.img}`}
                      className="group-placed-img"
                      alt=""
                      title="Кайтаруу"
                      onClick={() => removeAnimalFromGroup(id, "wild")}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="group-animals-pool">
            {groupAnimals
              .filter((animal) => !isAnimalPlaced(animal.id))
              .map((animal) => (
                <div
                  key={animal.id}
                  className="group-animal-card"
                  draggable
                  onDragStart={(e) => handleAnimalGroupDrag(e, animal.id)}
                >
                  <img
                    src={`/src/assets/animals/${animal.img}`}
                    className="group-animal-img"
                    alt=""
                  />

                  <p>{animal.name}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="animals-nav">
        <button disabled={currentStep === 0} onClick={handleBackClick}>
          Артка
        </button>

        <button onClick={handleNextClick}>Кийинки</button>
      </div>
    </>
  );
}

export default AnimalsExercise;