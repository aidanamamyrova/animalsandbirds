import "./AnimalsNavbar.css";

function AnimalsNavbar({ onMenuClick }) {
  return (
    <div className="animals-navbar">

      <button
        className="navbar-menu-btn"
        onClick={onMenuClick}
      >
        ☰
      </button>

      <div className="animals-logo">
        🐾 Жаныбарлар дүйнөсү
      </div>

    </div>
  );
}

export default AnimalsNavbar;