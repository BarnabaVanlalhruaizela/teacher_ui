import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import api from "../api/apiClient";

import ClassroomUI from "../components/live/ClassroomUI";
import TeacherControls from "../components/live/TeacherControls";

export default function TeacherLiveSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    let mounted = true;

    const joinSession = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.post(
          `/livestream/sessions/${id}/join/`
        );

        if (mounted) {
          setSessionData(res.data);
        }
      } catch (err) {
        console.error("Failed to join session:", err);
        if (mounted) {
          setError("Unable to join session.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    joinSession();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return <div style={{ padding: 20 }}>Connecting to session...</div>;
  }

  if (error || !sessionData?.livekit_url || !sessionData?.token) {
    return (
      <div style={{ padding: 20 }}>
        <p>{error || "Session unavailable."}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <LiveKitRoom
      serverUrl={sessionData.livekit_url}
      token={sessionData.token}
      connect={true}
      video={true}
      audio={true}
    >
      <ClassroomUI role="teacher" />
      <TeacherControls />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}