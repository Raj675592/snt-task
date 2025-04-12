import React, { useState, useEffect } from 'react';
import './User.css';
import Feedback from './Fedback';
import FeedbackList from './FeedbackList';

function User() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [activeView, setActiveView] = useState('feedback');

  const handleFeedbackSubmit = (newFeedback) => {
    setFeedbackList((prevFeedbackList) => [...prevFeedbackList, newFeedback]);
  };

  return (
    <div className="App">

      <nav className="navbar">
      <button onClick={() => setActiveView('feedback')}>Feedback Form</button>
      <button onClick={() => setActiveView('feedbackList')}>Feedback List</button>
      </nav>

     
      {activeView === 'feedback' && (
        <div className="feedback-form">

         
          <Feedback onSubmitFeedback={handleFeedbackSubmit} />
        </div>
      )}
      {activeView === 'feedbackList' && (
        <div className="feedback-list">
          
          <FeedbackList feedbacks={feedbackList} />
        </div>
      )}
    </div>
  );
}

export default User;