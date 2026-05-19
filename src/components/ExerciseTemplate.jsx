// components/ExerciseTemplate.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Character from "./Character";
import "./ExerciseTemplate.css";

const ExerciseTemplate = ({ 
  title,           // Заголовок упражнения
  steps,           // Массив объектов с шагами: { content: JSX, checkComplete: function }
  getStepProgress, // Функция для прогресс-бара (опционально)
  onComplete,      // Коллбек при завершении
  onReset,         // Коллбек при сбросе
  containerClass   // Дополнительный класс для контейнера
}) => {
  const navigate = useNavigate();
  const [characterState, setCharacterState] = useState("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [stepInitialized, setStepInitialized] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const totalSteps = steps.length;
  const progress = getStepProgress 
    ? getStepProgress(currentStep, steps) 
    : ((currentStep + 1) / (totalSteps + 1)) * 100;

  const playCharacterTalk = (step) => {
    setCharacterState("talk");
    setTimeout(() => setCharacterState("idle"), 3000);
  };

  const checkAnswerWithCharacter = (isCorrect) => {
    setCharacterState(isCorrect ? "success" : "error");
    setTimeout(() => setCharacterState("idle"), 2000);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      setStepInitialized(false);
    } else if (currentStep === totalSteps - 1) {
      setIsFinished(true);
      if (onComplete) onComplete();
    }
  };

  const handleBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setStepInitialized(false);
    }
  };

  const handleRetry = () => {
    setCurrentStep(0);
    setIsFinished(false);
    setStepInitialized(false);
    if (onReset) onReset();
  };

  useEffect(() => {
    if (!isFinished && currentStep < totalSteps) {
      const timer = setTimeout(() => {
        playCharacterTalk(currentStep);
        setStepInitialized(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isFinished]);

  // Проверка ответов для каждого шага
  useEffect(() => {
    if (stepInitialized && steps[currentStep]?.checkComplete) {
      const isComplete = steps[currentStep].checkComplete();
      if (isComplete) {
        checkAnswerWithCharacter(true);
      }
    }
  }, [steps, currentStep, stepInitialized]);

  const currentContent = steps[currentStep]?.content;

  return (
    <div className={`ex-template-page ${containerClass || ''}`}>
      <Navbar />
      <div className="ex-template-layout">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <main className="ex-template-content">
          <h2 className="ex-title">{title}</h2>

          <div className="progress-container">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="ex-header-banner">
            {steps[currentStep]?.banner || `Көнүгүү ${currentStep + 1}`}
          </div>

          <div className="exercise-scroll-container">
            {!isFinished ? (
              <div className="step-content">
                {currentContent}
              </div>
            ) : (
              <div className="finish-screen">
                <div className="finish-icon">🏆</div>
                <h2>Азаматсың!</h2>
                <p>Бардык көнүгүүлөрдү ийгиликтүү аяктадың!</p>
                <div className="finish-buttons">
                  <button className="btn-retry" onClick={handleRetry}>Кайра аткаруу</button>
                  <button className="btn-home" onClick={() => navigate("/")}>Башкы бет</button>
                </div>
              </div>
            )}
          </div>

          {!isFinished && (
            <div className="ex-nav-controls">
              <button
                className="nav-btn back"
                onClick={handleBackStep}
                disabled={currentStep === 0}
              >
                Артка
              </button>
              <button className="nav-btn next" onClick={handleNextStep}>
                {currentStep === totalSteps - 1 ? "Аяктоо" : "Кийинки"}
              </button>
            </div>
          )}

          <Character state={characterState} />
        </main>
      </div>
    </div>
  );
};

export default ExerciseTemplate;