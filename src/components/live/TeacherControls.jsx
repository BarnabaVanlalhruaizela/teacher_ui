import { useLocalParticipant, useRoomContext } from "@livekit/components-react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";
import { MdScreenShare, MdStopScreenShare, MdCallEnd } from "react-icons/md";

export default function TeacherControls() {
  const { localParticipant } = useLocalParticipant();
  const room = useRoomContext();

  const isMicEnabled = localParticipant?.isMicrophoneEnabled;
  const isCameraEnabled = localParticipant?.isCameraEnabled;
  const isScreenShareEnabled = localParticipant?.isScreenShareEnabled;

  const toggleMic = async () => {
    try {
      await localParticipant.setMicrophoneEnabled(!isMicEnabled);
    } catch (err) {
      console.error("Mic toggle failed:", err);
    }
  };

  const toggleCamera = async () => {
    try {
      await localParticipant.setCameraEnabled(!isCameraEnabled);
    } catch (err) {
      console.error("Camera toggle failed:", err);
    }
  };

  const toggleScreenShare = async () => {
    try {
      await localParticipant.setScreenShareEnabled(!isScreenShareEnabled);
    } catch (err) {
      console.error("Screen share toggle failed:", err);
    }
  };

  const leaveCall = async () => {
    try {
      await room.disconnect();
    } catch (err) {
      console.error("Leave failed:", err);
    }
  };

  return (
    <div className="teacher-controls">
      <button
        className={`control-btn ${!isMicEnabled ? "off" : ""}`}
        onClick={toggleMic}
        title="Toggle microphone"
      >
        {isMicEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
        <span>{isMicEnabled ? "Mic" : "Mic Off"}</span>
      </button>

      <button
        className={`control-btn ${!isCameraEnabled ? "off" : ""}`}
        onClick={toggleCamera}
        title="Toggle camera"
      >
        {isCameraEnabled ? <FaVideo /> : <FaVideoSlash />}
        <span>{isCameraEnabled ? "Camera" : "Camera Off"}</span>
      </button>

      <button
        className="control-btn"
        onClick={toggleScreenShare}
        title="Toggle screen share"
      >
        {isScreenShareEnabled ? <MdStopScreenShare /> : <MdScreenShare />}
        <span>{isScreenShareEnabled ? "Stop Share" : "Share Screen"}</span>
      </button>

      <button
        className="control-btn end-call-btn"
        onClick={leaveCall}
        title="Leave call"
      >
        <MdCallEnd />
        <span>Leave</span>
      </button>
    </div>
  );
}