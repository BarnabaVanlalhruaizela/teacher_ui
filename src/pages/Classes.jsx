import { useState } from "react";
import { useParams } from "react-router-dom";
import SubjectCard from "../components/SubjectCard";
import SearchBar from "../components/SearchBar";
import "../styles/classes.css";

const batchLabels = {
  "math-8-by23": "Math (Class 8) BY23",
  "math-8-by26": "Math (Class 8) BY26",
};

export default function Classes() {
  const [hoveredTitle, setHoveredTitle] = useState("Assignments");
  const { batchId } = useParams();

  const base = batchId ? `/teacher/classes/${batchId}` : "/teacher/classes";
  const batchName = batchLabels[batchId] || null;

  return (
    <div className="classes-wrapper">
      <div className="classes-container">

        <div className="classes-top">
          <h2>{batchName ? `${batchName} — ${hoveredTitle}` : `Subjects (${hoveredTitle})`}</h2>
          <SearchBar />
        </div>

        <div className="classes-grid">
          <SubjectCard title="Assignments" count="4" label="Tasks" path={`${base}/assignments`} onHover={() => setHoveredTitle("Assignments")} />
          <SubjectCard title="Quiz" count="6" label="Tests" path={`${base}/quizzes`} onHover={() => setHoveredTitle("Quiz")} />
          <SubjectCard title="Study Materials" count="11" label="Resources" path={`${base}/study-materials`} onHover={() => setHoveredTitle("Study Materials")} />
          <SubjectCard title="Session Recordings" count="8" label="Recordings" path={`${base}/session-recordings`} onHover={() => setHoveredTitle("Session Recordings")} />
          <SubjectCard title="Live Sessions" count="5" label="Upcoming" path={`${base}/live-sessions`} onHover={() => setHoveredTitle("Live Sessions")} />
        </div>

      </div>
    </div>
  );
}
