import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('POMODORO'); // POMODORO, SHORT_REST, LONG_REST
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const phases = {
    POMODORO: { time: 25 * 60, label: 'Pomodoro 4', color: '#4f46e5' },
    SHORT_REST: { time: 5 * 60, label: 'Rest 3', color: '#10b981' },
    LONG_REST: { time: 15 * 60, label: 'Long Rest 2', color: '#10b981' }
  };

  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Phase completed
      handlePhaseComplete();
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handlePhaseComplete = () => {
    setIsRunning(false);
    
    if (currentPhase === 'POMODORO') {
      setCompletedPomodoros(prev => prev + 1);
      // After 4 pomodoros, long rest. Otherwise, short rest.
      const nextPhase = (completedPomodoros + 1) % 4 === 0 ? 'LONG_REST' : 'SHORT_REST';
      setCurrentPhase(nextPhase);
      setTimeLeft(phases[nextPhase].time);
    } else {
      // Rest completed, back to pomodoro
      setCurrentPhase('POMODORO');
      setTimeLeft(phases.POMODORO.time);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(phases[currentPhase].time);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{color: 'red'}}>Error: {error.message}</div>;

  return (
    <ErrorBoundary>
      <div className="pomodoro-timer">
        <div className="timer-container">
          <div className="phase-indicators">
            <span className={currentPhase === 'POMODORO' ? 'active' : ''}>
              Pomodoro {completedPomodoros + 1}
            </span>
            <span className={currentPhase === 'SHORT_REST' ? 'active' : ''}>
              Rest {Math.floor(completedPomodoros / 4) + 1}
            </span>
            <span className={currentPhase === 'LONG_REST' ? 'active' : ''}>
              Long Rest {Math.floor(completedPomodoros / 4) + 1}
            </span>
          </div>
          
          <div className="timer-circle">
            <div className="timer-display">
              {formatTime(timeLeft)}
            </div>
          </div>
          
          <div className="timer-controls">
            <button onClick={toggleTimer} className="start-btn">
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={resetTimer} className="reset-btn">
              Reset
            </button>
          </div>
        </div>
        
        <div className="today-tasks">
          <h3>Today Tasks</h3>
          {/* Today's tasks list */}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PomodoroTimer;