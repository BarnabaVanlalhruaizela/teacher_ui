import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/apiClient";

export default function TeacherCreateLiveSession() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
  });

  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      await api.post("/livestream/sessions/", {
        ...form,
        subject_id: subjectId,
      });

      navigate(-1);
    } catch (err) {
      console.error(err);
      setError("Failed to create session.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Live Session</h2>

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="datetime-local"
        onChange={(e) =>
          setForm({
            ...form,
            start_time: e.target.value,
          })
        }
      />

      <input
        type="datetime-local"
        onChange={(e) =>
          setForm({
            ...form,
            end_time: e.target.value,
          })
        }
      />

      <button onClick={handleSubmit}>
        Create Session
      </button>
    </div>
  );
}