import React, { useState, useEffect } from 'react';
import './Diary.css';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';

const Diary = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [diaryEntry, setDiaryEntry] = useState({
    whatWentWell: '',
    whatCouldBeBetter: '',
    moodLevel: 5,
    focusRating: 3,
    pomodoroSessions: 0
  });
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setDiaryEntry({
      ...diaryEntry,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      // API call to save diary entry
      console.log('Saving diary entry:', diaryEntry);
      // Add API integration here
    } catch (error) {
      console.error('Error saving diary entry:', error);
    }
  };

  const renderStars = (rating, onChange) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => onChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{color: 'red'}}>Error: {error.message}</div>;

  return (
    <ErrorBoundary>
      <div className="diary-container">
        <h1>Personal Diary</h1>
        
        <div className="diary-content">
          <div className="diary-form">
            <div className="date-selector">
              <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))}>
                ←
              </button>
              <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              <button onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))}>
                →
              </button>
            </div>
            
            <div className="form-section">
              <label>What went well today:</label>
              <textarea
                name="whatWentWell"
                placeholder="Enter text here..."
                value={diaryEntry.whatWentWell}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-section">
              <label>What could've been better:</label>
              <textarea
                name="whatCouldBeBetter"
                placeholder="Enter text here..."
                value={diaryEntry.whatCouldBeBetter}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-section">
              <label>Focus Rating:</label>
              {renderStars(diaryEntry.focusRating, (rating) => 
                setDiaryEntry({...diaryEntry, focusRating: rating})
              )}
            </div>
            
            <div className="form-section">
              <label>Mood Level:</label>
              <div className="mood-slider">
                <input
                  type="range"
                  min="1"
                  max="10"
                  name="moodLevel"
                  value={diaryEntry.moodLevel}
                  onChange={handleInputChange}
                />
                <span>{diaryEntry.moodLevel}/10</span>
              </div>
            </div>
            
            <div className="form-buttons">
              <button onClick={handleSave} className="save-btn">Save</button>
              <button className="cancel-btn">Cancel</button>
            </div>
          </div>
          
          <div className="recent-logs">
            <h3>Recent Logs</h3>
            <div className="log-list">
              <div className="log-item">2025/05/06</div>
              <div className="log-item">2025/05/07</div>
              <div className="log-item">2025/05/08</div>
              <div className="log-item">2025/05/09</div>
              <div className="log-item">2025/05/10</div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Diary;