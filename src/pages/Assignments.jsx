import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import "../styles/assignments.css";

const defaultAssignments = [
  {
    id: "Assignment - ID",
    title: "(TITLE) Integration - I",
    issuedOn: "21 Jan 2026",
    dueOn: "30 Jan 2026",
    turnedIn: "17/32",
  },
  {
    id: "Assignment - ID",
    title: "(TITLE) Integration - I",
    issuedOn: "21 Jan 2026",
    dueOn: "30 Jan 2026",
    turnedIn: "17/32",
  },
  {
    id: "Assignment - ID",
    title: "(TITLE) Integration - I",
    issuedOn: "21 Jan 2026",
    dueOn: "30 Jan 2026",
    turnedIn: "17/32",
  },
  {
    id: "Assignment - ID",
    title: "(TITLE) Integration - I",
    issuedOn: "21 Jan 2026",
    dueOn: "30 Jan 2026",
    turnedIn: "17/32",
  },
  {
    id: "Assignment - ID",
    title: "(TITLE) Integration - I",
    issuedOn: "21 Jan 2026",
    dueOn: "30 Jan 2026",
    turnedIn: "17/32",
  },
  {
    id: "Assignment - ID",
    title: "(TITLE) Integration - I",
    issuedOn: "21 Jan 2026",
    dueOn: "30 Jan 2026",
    turnedIn: "17/32",
  },
  {
    id: "Assignment - ID",
    title: "(TITLE) Integration - I",
    issuedOn: "21 Jan 2026",
    dueOn: "30 Jan 2026",
    turnedIn: "17/32",
  },
  {
    id: "Assignment - ID",
    title: "(TITLE) Integration - I",
    issuedOn: "21 Jan 2026",
    dueOn: "30 Jan 2026",
    turnedIn: "17/32",
  },
];

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Assignments() {
  const navigate = useNavigate();
  const { batchId } = useParams();
  const backPath = batchId ? `/teacher/classes/${batchId}` : "/teacher/classes";

  // Load user-created assignments from localStorage
  const saved = JSON.parse(localStorage.getItem("assignments") || "[]");
  const createdAssignments = saved.map((a) => ({
    id: "Assignment - ID",
    title: `(TITLE) ${a.title}`,
    issuedOn: formatDate(a.dateIssued),
    dueOn: formatDate(a.dueDate),
    turnedIn: "0/10",
    // keep raw data for navigation
    _raw: a,
  }));

  const allAssignments = [...createdAssignments, ...defaultAssignments];

  return (
    <div className="assignments-page">

      <button className="assignments-back-btn" onClick={() => navigate(backPath)}>
        <IoChevronBack /> Back
      </button>

      <div className="assignments-title-container">
        <h2 className="assignments-title">Mathematics</h2>
        <div className="assignments-search">
          <input type="text" placeholder="Search" />
          <FiSearch className="assignments-search-icon" />
        </div>
      </div>

      <div className="assignments-list-container">
        <div className="assignments-actions">
          <button className="assignments-create-btn" onClick={() => navigate("/teacher/classes/assignments/create")}>+ Create New Assignment</button>
        </div>

        <div className="assignments-list">
          {allAssignments.map((assignment, index) => (
            <div className="assignment-row" key={index}>
              <div className="assignment-info">
                <span className="assignment-id">{assignment.id}</span>
                <span className="assignment-name">{assignment.title}</span>
              </div>
              <div className="assignment-detail">
                <span className="assignment-label">Issued on:</span>
                <span className="assignment-value">{assignment.issuedOn}</span>
              </div>
              <div className="assignment-detail">
                <span className="assignment-label">Due on:</span>
                <span className="assignment-value">{assignment.dueOn}</span>
              </div>
              <div className="assignment-detail">
                <span className="assignment-label">Turned In:</span>
                <span className="assignment-value bold">{assignment.turnedIn}</span>
              </div>
              <button
                className="assignment-view-btn"
                onClick={() =>
                  navigate("/teacher/classes/assignments/view/submissions", {
                    state: {
                      title: `Mathematics ${assignment.id}`,
                    },
                  })
                }
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
