import React, { useRef, useState } from "react";
import "./AnimalsExercise.css";

function BirdsExercise() {
  const [currentStep, setCurrentStep] = useState(0);
  const [connections, setConnections] = useState([]);
  const [activeStart, setActiveStart] = useState(null);
  const [wrongDots, setWrongDots] = useState([]);
  const [correctDots, setCorrectDots] = useState([]);
  const [placedLetters, setPlacedLetters] = useState(Array(8).fill(null));
  const [usedLetterIds, setUsedLetterIds] = useState([]);
  const [showWriteErrors, setShowWriteErrors] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [placedGroups, setPlacedGroups] = useState({
    domestic: [],
    forest: [],
    steppe: [],
    lake: [],
  });

  const [groupError, setGroupError] = useState(false);

  const containerRef = useRef(null);
  const audioRef = useRef(null);

  const totalSteps = 10;

  const playSound = (audioFile) => {
    if (!audioFile) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(`/src/assets/animals/sounds/${audioFile}`);
    audioRef.current = audio;
    audio.play();
  };

  const matchingGames = {
    0: {
      title: "Ким кимге таандык?",
      left: [
        { id: "l1", text: "Тоок", img: "chicken.png" },
        { id: "l2", text: "Өрдөк", img: "duck.png" },
        { id: "l3", text: "Каз", img: "goose.png" },
      ],
      right: [
        { id: "r1", text: "Өрдөк балапаны", img: "duckling.png" },
        { id: "r2", text: "Каз балапаны", img: "gosling.png" },
        { id: "r3", text: "Жөжө", img: "chick.png" },
      ],
      correct: { l1: "r3", l2: "r1", l3: "r2" },
    },

    4: {
      title: "Ким кайда жашайт?",
      left: [
        { id: "l1", text: "Индюк", img: "turkey.png" },
        { id: "l2", text: "Бүркүт", img: "berkut.png" },
        { id: "l3", text: "Ак куу", img: "swan.png" },
      ],
      right: [
        { id: "r2", text: "Тоо", img: "mountain.png" },
        { id: "r3", text: "Көл", img: "lake.png" },
        { id: "r1", text: "Үй", img: "home.png" },
      ],
      correct: { l1: "r1", l2: "r2", l3: "r3" },
    },

    7: {
      title: "Ким кандай үн чыгарат?",
      left: [
        { id: "l1", text: "Үкү", img: "sova.png" },
        { id: "l2", text: "Көгүчкөн", img: "golub.png" },
        { id: "l3", text: "Бүркүт", img: "berkut.png" },
      ],
      right: [
        { id: "r1", text: "Гүүлдөйт", img: "sound.png", audio: "golub.mp3" },
        { id: "r2", text: "Шаңшыйт", img: "sound.png", audio: "berkut.mp3" },
        { id: "r3", text: "Уу-уу", img: "sound.png", audio: "sova.mp3" },
      ],
      correct: { l1: "r3", l2: "r1", l3: "r2" },
      soundMode: true,
    },

    8: {
      title: "Ким кандай үн чыгарат?",
      left: [
        { id: "l1", text: "Ак куу", img: "swan.png" },
        { id: "l2", text: "Тоңкулдак", img: "tonkuldak.png" },
        { id: "l3", text: "Турна", img: "turna.png" },
      ],
      right: [
        { id: "r1", text: "Кыйкуулайт", img: "sound.png", audio: "turna.mp3" },
        { id: "r2", text: "Кайкылдайт", img: "sound.png", audio: "swan.mp3" },
        { id: "r3", text: "Тоңкулдайт", img: "sound.png", audio: "tonkuldak.mp3" },
      ],
      correct: { l1: "r2", l2: "r3", l3: "r1" },
      soundMode: true,
    },
  };

  const writeGames = {
    1: {
      word: ["Т", "О", "О", "К"],
      letters: ["О", "К", "Т", "О"],
      img: "chicken.png",
    },
    2: {
      word: ["Ө", "Р", "Д", "Ө", "К"],
      letters: ["Д", "Ө", "К", "Р", "Ө"],
      img: "duck.png",
    },
    3: {
      word: ["К", "А", "З"],
      letters: ["З", "К", "А"],
      img: "goose.png",
    },
    5: {
      word: ["Л", "Е", "Й", "Л", "Е", "К"],
      letters: ["Е", "К", "Й", "Л", "Л", "Е"],
      img: "stork.png",
      clickMode: true,
    },
    6: {
      word: ["Ү", "К", "Ү"],
      letters: ["Ү", "К", "Ү"],
      img: "sova.png",
      clickMode: true,
    },
  };

  const groupBirds = [
    { id: "chicken", name: "Тоок", img: "chicken.png", group: "domestic" },
    { id: "turkey", name: "Индюк", img: "turkey.png", group: "domestic" },
    { id: "sparrow", name: "Таранчы", img: "taranchy.png", group: "domestic" },

    { id: "eagle", name: "Бүркүт", img: "berkut.png", group: "steppe" },
    { id: "owl", name: "Үкү", img: "sova.png", group: "forest" },
    { id: "crow", name: "Карга", img: "karga.png", group: "forest" },

    { id: "stork", name: "Лейлек", img: "stork.png", group: "lake" },
    { id: "swallow", name: "Чабалекей", img: "chabalekey.png", group: "forest" },
    { id: "falcon", name: "Ителги", img: "itelgi.png", group: "steppe" },

    { id: "duck", name: "Өрдөк", img: "duck.png", group: "lake" },
    { id: "goose", name: "Каз", img: "goose.png", group: "lake" },
    { id: "swan", name: "Ак куу", img: "swan.png", group: "lake" },
    { id: "seagull", name: "Чардак", img: "chardak.png", group: "lake" },
  ];

  const zones = [
    { key: "domestic", title: "Үй", img: "home.png" },
    { key: "forest", title: "Токой", img: "forest.png" },
    { key: "steppe", title: "Тoo", img: "mountain.png" },
    { key: "lake", title: "Көл", img: "lake.png" },
  ];

  const currentMatching = matchingGames[currentStep];
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
    setPlacedLetters(Array(8).fill(null));
    setUsedLetterIds([]);
    setShowWriteErrors(false);
    setGroupError(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
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

  const handleBirdGroupDrag = (e, birdId) => {
    e.dataTransfer.setData("birdId", birdId);
  };

  const handleGroupDrop = (e, groupName) => {
    e.preventDefault();

    const birdId = e.dataTransfer.getData("birdId");
    const bird = groupBirds.find((item) => item.id === birdId);

    if (!bird) return;

    if (bird.group === groupName) {
      setPlacedGroups((prev) => ({
        ...prev,
        [groupName]: prev[groupName].includes(birdId)
          ? prev[groupName]
          : [...prev[groupName], birdId],
      }));
      setGroupError(false);
    } else {
      setGroupError(true);
      setTimeout(() => setGroupError(false), 600);
    }
  };

  const isBirdPlaced = (id) => {
    return Object.values(placedGroups).some((group) => group.includes(id));
  };

  const removeBirdFromGroup = (birdId, groupName) => {
    setPlacedGroups((prev) => ({
      ...prev,
      [groupName]: prev[groupName].filter((id) => id !== birdId),
    }));
  };

const handleNextClick = () => {
  if (currentStep < totalSteps - 1) {
    setCurrentStep(currentStep + 1);
    resetStepState();
  } else {
    setIsFinished(true);
  }
};

  const handleBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      resetStepState();
    }
  };

  if (isFinished) {
  return (
    <div className="finish-screen">
      <div className="finish-card">
        <div className="finish-icon">🏆</div>

        <h1>Азаматсың!</h1>

        <p>Көнүгүүнүн аягы</p>

        <button
          className="restart-btn"
          onClick={() => {
            setCurrentStep(0);
            setConnections([]);
            setCorrectDots([]);
            setWrongDots([]);
            setPlacedLetters(Array(8).fill(null));
            setShowWriteErrors(false);
            setIsFinished(false);
          }}
        >
          Кайра аткаруу
        </button>
      </div>
    </div>
  );
}

  return (
    <>
      <h2 className="animals-title">Канаттуулар</h2>

      <div className="animals-progress">
        <div
          className="animals-progress-fill"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="animals-header">
        {currentMatching && currentMatching.title}
        {currentWriteGame && "Туура жаз"}
        {currentStep === 9 && "Канаттууларды бөлүштүр"}
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
                    `}
                    onClick={(e) => handlePointClick(item.id, "right", e)}
                  ></div>

                  <img
                    src={`/src/assets/animals/${item.img}`}
                    className={`animal-img ${
                      currentMatching.soundMode ? "animal-sound-img" : ""
                    }`}
                    alt=""
                    onClick={() => {
                      if (currentMatching.soundMode) {
                        playSound(item.audio);
                      }
                    }}
                    style={{
                      cursor: currentMatching.soundMode ? "pointer" : "default",
                    }}
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

      {currentStep === 9 && (
        <div className="group-game-area">
          <div className="group-zones four-zones">
            {zones.map((zone) => (
              <div
                key={zone.key}
                className={`group-zone ${groupError ? "group-error" : ""}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleGroupDrop(e, zone.key)}
              >
                <div className="zone-header">
                  <h3>{zone.title}</h3>

                  <img
                    src={`/src/assets/animals/${zone.img}`}
                    className="zone-img"
                    alt=""
                  />
                </div>

                <div className="group-placed">
                  {placedGroups[zone.key].map((id) => {
                    const bird = groupBirds.find((b) => b.id === id);

                    return (
                      <img
                        key={id}
                        src={`/src/assets/animals/${bird.img}`}
                        className="group-placed-img"
                        alt=""
                        title="Кайтаруу"
                        onClick={() => removeBirdFromGroup(id, zone.key)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="group-animals-pool">
            {groupBirds
              .filter((bird) => !isBirdPlaced(bird.id))
              .map((bird) => (
                <div
                  key={bird.id}
                  className="group-animal-card"
                  draggable
                  onDragStart={(e) => handleBirdGroupDrag(e, bird.id)}
                >
                  <img
                    src={`/src/assets/animals/${bird.img}`}
                    className="group-animal-img"
                    alt=""
                  />

                  <p>{bird.name}</p>
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

export default BirdsExercise;