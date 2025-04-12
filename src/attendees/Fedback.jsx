import './Attendees.css';
import React, { useState } from 'react';

function Feedback() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');

  const feedbackSubmitted = async (e) => {
    e.preventDefault();

    if (name.trim() !== '' && email.trim() !== '' && rating.trim() !== '' && feedback.trim() !== '') {
      const feedbackData = {
        name,
        email,
        rating,
        feedback,
        isAnonymous: false, // Set to true if anonymous feedback is allowed
      };

      try {
        const response = await fetch('http://localhost:5500/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feedbackData),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Feedback submitted successfully');
          setName('');
          setEmail('');
          setRating('');
          setFeedback('');
        } else {
          alert(data.error || 'Failed to submit feedback');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('An error occurred while submitting feedback');
      }
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <div className="feedback">
      <h2>We value your feedback. Giving genuine feedback will help us and others as well.</h2>
      <div>
        <h2>Feedback Form</h2>
        <form onSubmit={feedbackSubmitted}>
          <label htmlFor="name">NAME</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            placeholder="Enter Your Name"
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Enter Email"
            required
          />
          <br />
          <label htmlFor="feedback">Feedback</label>
          <textarea
            type="text"
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Please give your feedback"
            required
          ></textarea>
          <br />
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;