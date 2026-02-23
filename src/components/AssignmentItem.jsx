import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

export default function AssignmentItem({ id, subject, dueDate, submissionRate, defaultExpanded = false }) {
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
          <button className="btn-view-sub">View Submissions</button>
        </div>
      )}
    </div>
  );
}
