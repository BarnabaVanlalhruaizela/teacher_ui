import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

export default function QuizItem({ id, subject, dueDate, submissionRate, avgScore, highest, lowest, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="acc-item">
      <div className="acc-header" onClick={() => setExpanded(!expanded)}>
        <span className="acc-id">{id}</span>
        {expanded ? <MdExpandLess className="acc-arrow" /> : <MdExpandMore className="acc-arrow" />}
      </div>
      {expanded && (
        <div className="acc-body">
          {subject && <p className="acc-line"><strong>Subject Name:</strong> {subject}</p>}
          {dueDate && <p className="acc-line"><strong>Due Date:</strong> {dueDate}</p>}
          {submissionRate && <p className="acc-line"><strong>Submission Rate:</strong> {submissionRate}</p>}
          {avgScore && <p className="acc-line"><strong>Average Score:</strong> {avgScore}</p>}
          {(highest || lowest) && (
            <p className="acc-line"><strong>Highest:</strong> {highest} &nbsp;<strong>Lowest:</strong> {lowest}</p>
          )}
          <button className="btn-view-sub">View Submissions</button>
        </div>
      )}
    </div>
  );
}
