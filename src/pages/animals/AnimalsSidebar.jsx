import { Link } from "react-router-dom";
import "./AnimalsSidebar.css";

function AnimalsSidebar({ isOpen, onClose }) {
  const menuData = [
    { title: "Үй/Жапайы жаныбарлары", path: "/" },
    { title: "Канаттуулар", path: "/birds" },
  ];

  return (
    <div className={`animals-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-sidebar-btn" onClick={onClose}>
        ×
      </button>

      {menuData.map((item, index) => (
        <div className="animals-topic-wrapper" key={index}>
          <Link
            to={item.path}
            className="animals-topic-link"
            onClick={onClose}
          >
            <div className="animals-topic">
              <span className="animals-topic-title">{item.title}</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default AnimalsSidebar;