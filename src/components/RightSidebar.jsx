import React from 'react';
import "./RightSidebar.css";
import { Link } from "react-router-dom";

const RightSidebar = ({ words, exerciseLink, onWordClick }) => {
  if (!words) return null;

  return (
    <div className="right-sidebar">
      <div className="new-words-section">
        <h2 className="new-words-title">Жаңы сөздөр</h2>
        <p className="new-words-subtitle">Новые слова</p>
        
        <div className="words-list">
          {words.map((item, index) => (
            <div key={index} className="word-item-card">
              {/* При нажатии вызываем функцию и передаем имя файла из данных */}
              <button 
                className="audio-icon-btn" 
                onClick={() => onWordClick && onWordClick(item.audio)}
                disabled={!item.audio} // Блокируем, если аудио нет
              >
                🔊
              </button>
              <div className="word-text">
                <span className="kg-word">{item.kg}</span>
                <span className="dash"> - </span>
                <span className="ru-word">{item.ru}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Link to={exerciseLink}>
        <button className="exercise-nav-btn">
          Көнүгүү
          <p className="new-words-subtitle">Упражнения</p>
        </button>
      </Link>
    </div>
  );
};

export default RightSidebar;