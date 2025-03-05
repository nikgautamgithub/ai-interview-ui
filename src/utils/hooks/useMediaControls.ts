"use client";
import { useEffect, useRef, useState } from "react";

export interface MediaControls {
  stream: MediaStream | null;
  microphones: MediaDeviceInfo[];
  speakers: MediaDeviceInfo[];
  cameras: MediaDeviceInfo[];
  selectedMicrophone: string;
  selectedSpeaker: string;
  selectedCamera: string;
  micMuted: boolean;
  cameraOff: boolean;
  speakerMuted: boolean;
  toggleMic: () => void;
  toggleCamera: () => void;
  toggleSpeaker: () => void;
  handleSelectMic: (deviceId: string) => void;
  handleSelectSpeaker: (deviceId: string) => void;
  handleSelectCamera: (deviceId: string) => void;
  handleEndInterview: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

const useMediaControls = (): MediaControls => {
  // Stream and video element ref
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Device lists
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);

  // Selected devices
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>("");
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("");
  const [selectedCamera, setSelectedCamera] = useState<string>("");

  // Mute toggles
  const [micMuted, setMicMuted] = useState<boolean>(false);
  const [speakerMuted, setSpeakerMuted] = useState<boolean>(false);
  const [cameraOff, setCameraOff] = useState<boolean>(false);

  // 1. Enumerate devices on mount
  useEffect(() => {
    async function getDevices() {
      try {
        // Request permission so that device labels are available
        await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const micList = devices.filter((d) => d.kind === "audioinput");
        const speakerList = devices.filter((d) => d.kind === "audiooutput");
        const cameraList = devices.filter((d) => d.kind === "videoinput");

        setMicrophones(micList);
        setSpeakers(speakerList);
        setCameras(cameraList);

        // Set defaults if available
        if (micList.length > 0) setSelectedMicrophone(micList[0].deviceId);
        if (speakerList.length > 0) setSelectedSpeaker(speakerList[0].deviceId);
        if (cameraList.length > 0) setSelectedCamera(cameraList[0].deviceId);
      } catch (error) {
        console.error("Error enumerating devices:", error);
      }
    }
    getDevices();
  }, []);

  // 2. Request media stream when selected mic or camera changes
  useEffect(() => {
    const stopTracks = (mediaStream: MediaStream) => {
      mediaStream.getTracks().forEach((track) => track.stop());
    };

    async function requestMedia(micId: string, camId: string) {
      try {
        // Stop existing stream if available
        if (stream) {
          stopTracks(stream);
        }
        // Request new stream with device constraints
        const newStream = await navigator.mediaDevices.getUserMedia({
          audio: micId ? { deviceId: micId } : true,
          video: camId ? { deviceId: camId } : true,
        });
        setStream(newStream);
      } catch (error) {
        console.error("Error requesting media:", error);
      }
    }

    if (selectedMicrophone || selectedCamera) {
      requestMedia(selectedMicrophone, selectedCamera);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMicrophone, selectedCamera]);

  // 3. Attach stream to video element
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // 4. Update audio output (speaker) if supported
  useEffect(() => {
    if (videoRef.current && (videoRef.current as any).setSinkId) {
      if (selectedSpeaker) {
        (videoRef.current as any)
          .setSinkId(selectedSpeaker)
          .catch((err: any) =>
            console.error("Error setting speaker sinkId:", err)
          );
      }
    }
  }, [selectedSpeaker]);

  // 5. Toggle mic and camera state by enabling/disabling tracks
  useEffect(() => {
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !micMuted;
    });
  }, [micMuted, stream]);

  useEffect(() => {
    if (!stream) return;
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !cameraOff;
    });
    if (!cameraOff) {
      async function startCamera() {
        const newStream = await navigator.mediaDevices.getUserMedia({
          audio: selectedMicrophone ? { deviceId: selectedMicrophone } : true,
          video: selectedCamera ? { deviceId: selectedCamera } : true,
        });
        setStream(newStream);
      }
      startCamera();
    }
  }, [cameraOff]);

  // For speaker, adjust the volume of the video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = speakerMuted ? 0 : 1;
    }
  }, [speakerMuted]);

  // 6. Handlers for device selection
  const handleSelectMic = (deviceId: string) => {
    setSelectedMicrophone(deviceId);
  };

  const handleSelectSpeaker = (deviceId: string) => {
    setSelectedSpeaker(deviceId);
  };

  const handleSelectCamera = (deviceId: string) => {
    setSelectedCamera(deviceId);
  };

  // 7. End Interview: stop all tracks
  const handleEndInterview = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    console.log("Interview ended");
  };

  // Toggle functions for mic, camera, and speaker
  const toggleMic = () => setMicMuted((prev) => !prev);
  const toggleCamera = () => setCameraOff((prev) => !prev);
  const toggleSpeaker = () => setSpeakerMuted((prev) => !prev);

  return {
    stream,
    microphones,
    speakers,
    cameras,
    selectedMicrophone,
    selectedSpeaker,
    selectedCamera,
    micMuted,
    cameraOff,
    speakerMuted,
    toggleMic,
    toggleCamera,
    toggleSpeaker,
    handleSelectMic,
    handleSelectSpeaker,
    handleSelectCamera,
    handleEndInterview,
    videoRef,
  };
};

export default useMediaControls;
