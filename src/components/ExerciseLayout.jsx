// src/components/ExerciseLayout.jsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './ExerciseLayout.css';

const ExerciseLayout = ({ children, title }) => {
  return (
    <div className="ex-page">
      <Navbar />
      <div className="ex-layout">
        <Sidebar />
        <main className="ex-main-content">
          {title && <h2 className="ex-title">{title}</h2>}
          <div className="ex-scroll-prevent">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExerciseLayout;