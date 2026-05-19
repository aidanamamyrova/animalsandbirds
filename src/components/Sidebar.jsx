import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { topicsData } from "../pages/topicsData";


function Sidebar() {
  const [activeId, setActiveId] = useState(null);
  const location = useLocation();

  // Функция только для открытия/закрытия меню (чтобы не срабатывал переход по ссылке)
  const toggleSubmenu = (e, id) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setActiveId(activeId === id ? null : id);
  };

  const menuData = [
    { id: 1, title: "Саламдашуу", path: "/salam",  exercise: "/salam-exercise" },
    { id: 2, title: "Коштошуу", path: "/koshtoshuu", words: "/kosh", exercise: "/kosh" },
    { id: 3, title: "Таанышуу", path: "/tanyshuu", words: "/tanyshuu", exercise: "/tany-exercise" },
    { id: 31, title: "Ким? эмне?", path: "/kim", words: "/tanyshuu", exercise: "/kim-exercise" },

    { 

      id: 4, 
      title: "Мен мектепке барам", 
      path: "/mektep",           // Основная страница (карточки)
      exercise: "/mektep-exercise"
    },
        { id: 41, title: "Окуу куралдары", path: "/okuu", words: "/tanyshuu", exercise: "/okuu-exercise" },

    { id: 5, title: "Бул менин классым", path: "/klass", words: "/class-words", exercise: "/klass-exercise" },
            { id: 51, title: " Сандар", path: "/san", words: "/uibuloo-words", exercise: "/san_exercise" },
        { id: 6, title: " Үй-бүлө", path: "/uibuloo", words: "/uibuloo-words", exercise: "/family-exercise" },
        { id: 62, title: " Дене мүчөлөрү", path: "/dene", words: "/uibuloo-words", exercise: "/dene_exercise" },
        { id: 61, title: " Түстөр", path: "/tuc", words: "/uibuloo-words", exercise: "/tus-exercise" },
        { id: 8, title: " Күз", path: "/kuz", words: "/uibuloo-words", exercise: "/kuz-exercise" },
        //{ id: 91, title: " Жашылчалар", path: "/jash", words: "/uibuloo-words", exercise: "/jash-exercise" },
       // { id: 10, title: "Жемиштер", path: "/jemish", words: "/uibuloo-words", exercise: "/jemish-exercise" },
{ id: 9,
  title: "Жаныбарлар",
  path: "/animals-aidana",
  exercise: "/animals-aidana"
},

  ];

  return (
    <div className="sidebar">
      {menuData.map((item) => (
        <div key={item.id} className="topic-wrapper">
          
          {/* ЗАГОЛОВОК — ЭТО ССЫЛКА НА ОСНОВНУЮ ТЕМУ */}
          <Link to={item.path} className="topic-link-wrapper">
            <div className={`topic ${location.pathname === item.path ? "active-topic" : ""}`}>
              <div className="topic-info">
                <span className="topic-title">{item.title}</span>
              </div>
              
              {/* СТРЕЛКА ОТДЕЛЬНАЯ КНОПКА ДЛЯ МЕНЮ */}
              <div 
                className={`arrow-box ${activeId === item.id ? "rotate" : ""}`}
                onClick={(e) => toggleSubmenu(e, item.id)}
              >
                ↓
              </div>
            </div>
          </Link>

          {/* ВЫПАДАЮЩЕЕ МЕНЮ */}
          {activeId === item.id && (
            <div className="submenu">
             
              <Link to={item.exercise} className="submenu-link">
                <div className="submenu-item">Көнүгүү</div>
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;