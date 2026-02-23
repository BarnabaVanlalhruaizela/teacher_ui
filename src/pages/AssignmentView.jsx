import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { FaRegFolder } from "react-icons/fa";
import "../styles/assignment-view.css";

export default function AssignmentView() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const title = state?.title;
  const description = state?.description;
  const dateIssued = state?.dateIssued ? formatDate(state.dateIssued) : null;
  const dueDate = state?.dueDate ? formatDate(state.dueDate) : null;
  const fileName = state?.fileName;

  return (
    <div className="assignment-view-page">
      <button className="av-back-btn" onClick={() => navigate("/teacher/classes/assignments")}>
        <IoChevronBack /> Back
      </button>

      <div className="av-header">
        <h2 className="av-title">Create New Mathematics Assignment</h2>
        <div className="av-search">
          <input type="text" placeholder="Search" />
          <FiSearch className="av-search-icon" />
        </div>
      </div>

      <div className="av-content-card">
        <div className="av-edit-row">
          <button
            className="av-edit-btn"
            onClick={() =>
              navigate("/teacher/classes/assignments/create", {
                state: {
                  title,
                  description: state?.description,
                  dueDate: state?.dueDate,
                  fileName,
                },
              })
            }
          >
            Edit
          </button>
        </div>

        <div className="av-details">
          {title && (
            <p className="av-detail-line">
              <span className="av-label">Title: </span>
              <span className="av-value-bold">{title}</span>
            </p>
          )}

          {(dateIssued || dueDate) && (
            <div className="av-dates">
              {dateIssued && (
                <p className="av-detail-line">
                  <span className="av-label">Date Issued: </span>
                  <span className="av-value-bold">{dateIssued}</span>
                </p>
              )}
              {dueDate && (
                <p className="av-detail-line">
                  <span className="av-label">Due Date: </span>
                  <span className="av-value-bold">{dueDate}</span>
                </p>
              )}
            </div>
          )}

          {description && (
            <div className="av-description">
              <span className="av-label">Description: </span>
              <span className="av-desc-text">{description}</span>
            </div>
          )}

          {fileName && (
            <div className="av-file-card">
              <div className="av-file-icon-box">
                <FaRegFolder className="av-file-icon" />
              </div>
              <span className="av-file-name">{fileName}</span>
            </div>
          )}

          <div className="av-actions">
            <button
              className="av-view-submission-btn"
              onClick={() =>
                navigate("/teacher/classes/assignments/view/submissions", {
                  state: { title: `${title} - Submissions` },
                })
              }
            >
              View Submission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
