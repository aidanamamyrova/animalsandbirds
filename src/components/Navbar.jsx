import "./Navbar.css"
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">

      <div className="logo">
        Кыргыз тили
      </div>

      <div className="menu">
        <Link to="/">
          <button>Башкы бет</button>
        </Link>
        <button>Кируу</button>
        <button>Катталуу</button>
      </div>

    </div>
  )
}

export default Navbar