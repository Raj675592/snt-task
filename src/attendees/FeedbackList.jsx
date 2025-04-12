function FeedbackList({ feedbacks }) {
    return (
      <div className="feedback-list">
        <h2>Your Feedback List</h2>
        {feedbacks.length === 0 ? (
          <p>No feedbacks submitted yet.</p>
        ) : (
          <ul>
            {feedbacks.map((feedback, index) => (
              <li key={index}>
                
                <strong>Email:</strong> {feedback.email} <br />
                <strong>Rating:</strong> {feedback.rating} <br />
                <strong>Feedback:</strong> {feedback.feedback} <br />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  export default FeedbackList;