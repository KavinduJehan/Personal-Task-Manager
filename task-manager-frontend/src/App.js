import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import Dashboard from './components/Dashboard/Dashboard';
import KanbanBoard from './components/KanbanBoard/KanbanBoard';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import Grading from './components/Grading/Grading';
import Diary from './components/Diary/Diary';
import './App.css';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/kanban" element={<KanbanBoard />} />
                <Route path="/work-mode" element={<PomodoroTimer />} />
                <Route path="/grading" element={<Grading />} />
                <Route path="/diary" element={<Diary />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </Router>
  );
}

export default App;