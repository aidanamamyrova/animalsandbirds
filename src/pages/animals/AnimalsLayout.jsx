import { Outlet } from "react-router-dom";
import AnimalsNavbar from "./AnimalsNavbar";
import AnimalsSidebar from "./AnimalsSidebar";
import "./AnimalsExercise.css";

function AnimalsLayout() {
  return (
    <div className="animals-wrapper">
      <AnimalsNavbar />

      <div className="animals-layout">
        <AnimalsSidebar />

        <div className="animals-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AnimalsLayout;