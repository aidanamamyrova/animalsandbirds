import { useState } from "react";
import { Outlet } from "react-router-dom";
import AnimalsNavbar from "./AnimalsNavbar";
import AnimalsSidebar from "./AnimalsSidebar";
import "./AnimalsExercise.css";

function AnimalsLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="animals-wrapper">
      <AnimalsNavbar />

      <button
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="animals-layout">
        <AnimalsSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="animals-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AnimalsLayout;