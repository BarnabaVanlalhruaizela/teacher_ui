import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import api from "../api/apiClient";
import ClassroomUI from "../components/live/ClassroomUI";
import TeacherControls from "../components/live/TeacherControls";

export default function TeacherLiveSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const joinSession = async () => {
      try {
        const res = await api.post(
          `/livestream/sessions/${id}/join/`
        );
        setData(res.data);
      } catch (err) {
        console.error("Join failed:", err);
        alert("Unable to join session.");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    joinSession();
  }, [id, navigate]);

  if (loading) {
    return <div style={{ padding: 20 }}>Joining session...</div>;
  }

  if (!data?.livekit_url || !data?.token) {
    return <div style={{ padding: 20 }}>Failed to load session.</div>;
  }

  return (
    <LiveKitRoom
      serverUrl={data.livekit_url}
      token={data.token}
      connect={true}
      video={true}   // teacher always has video
      audio={true}
    >
      <ClassroomUI role="TEACHER" />
      <TeacherControls />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}