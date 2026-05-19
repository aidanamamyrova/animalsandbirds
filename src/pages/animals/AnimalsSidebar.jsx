import { Link } from "react-router-dom";
import "./AnimalsSidebar.css";

function AnimalsSidebar() {
  const menuData = [
    { title: "Үй/Жапайы жаныбарлары", path: "/animals-aidana" },
    { title: "Канаттуулар", path: "/animals-aidana/birds" },
  ];

  return (
    <div className="animals-sidebar">
      {menuData.map((item, index) => (
        <div className="animals-topic-wrapper" key={index}>
          <Link to={item.path} className="animals-topic-link">
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