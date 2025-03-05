"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FaCog,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPowerOff,
} from "react-icons/fa";
import {
  MdVolumeOff,
  MdVolumeUp,
  MdVideocam,
  MdVideocamOff,
} from "react-icons/md";
import { MediaControls } from "@/utils/hooks/useMediaControls";
import { useRouter } from "next/navigation";

interface ControlBarProps {
  mediaControls: MediaControls;
  totalDuration: number;
}

const ControlBar = ({ mediaControls, totalDuration }: ControlBarProps) => {
  const router = useRouter();

  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const gearButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        gearButtonRef.current &&
        !gearButtonRef.current.contains(event.target as Node)
      ) {
        setSettingsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Increment elapsedTime every second, up to totalDuration
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        if (prev < totalDuration) {
          return prev + 1;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalDuration]);

  // Format seconds into HH:MM:SS or MM:SS
  function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const hh = h > 0 ? String(h).padStart(2, "0") + ":" : "";
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");

    return hh + mm + ":" + ss;
  }

  const currentTimeStr = formatTime(elapsedTime);
  const totalTimeStr = formatTime(totalDuration);

  const onEndInterview = () => {
    mediaControls.handleEndInterview();
    router.back();
  };

  return (
    <div className="bg-[#2F3134] rounded-md px-8 py-4 flex items-center justify-between gap-4 max-w-4xl mx-auto relative">
      {/* Recording indicator + timer */}
      <div className="flex items-center justify-center gap-2">
        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse border-1" />
        <span className="text-base text-white">
          {currentTimeStr} / {totalTimeStr}
        </span>
      </div>

      <div className="flex space-x-4">
        {/* Toggle Microphone */}
        <button
          onClick={mediaControls.toggleMic}
          className="text-2xl hover:text-gray-300 transition"
          title="Toggle Microphone"
        >
          {mediaControls.micMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>

        {/* Toggle Speaker */}
        <button
          onClick={mediaControls.toggleSpeaker}
          className="text-2xl hover:text-gray-300 transition"
          title="Toggle Speaker"
        >
          {mediaControls.speakerMuted ? <MdVolumeOff /> : <MdVolumeUp />}
        </button>

        {/* Toggle Camera */}
        <button
          onClick={mediaControls.toggleCamera}
          className="text-2xl hover:text-gray-300 transition"
          title="Toggle Camera"
        >
          {mediaControls.cameraOff ? <MdVideocamOff /> : <MdVideocam />}
        </button>

        {/* Settings Popover */}
        <div className="relative flex">
          <button
            ref={gearButtonRef}
            onClick={() => setSettingsOpen((prev) => !prev)}
            className="text-2xl hover:text-gray-300 transition my-auto"
            title="Device Settings"
          >
            <FaCog />
          </button>
          {settingsOpen && (
            <div
              ref={popoverRef}
              className="absolute right-0 top-4 mt-2 w-64 bg-[#2F3134] border border-[#4B4B4B] rounded-md shadow-lg z-50 p-4"
            >
              <h3 className="font-semibold text-lg mb-2 border-b-1 border-gray-500">
                Device Settings
              </h3>
              {/* Microphone Selection */}
              <div className="mb-4 border-b-1 border-gray-500">
                <p className="text-sm font-medium mb-1">Select a Microphone</p>
                {mediaControls.microphones.length === 0 ? (
                  <p className="text-xs text-gray-400">No microphones found</p>
                ) : (
                  mediaControls.microphones.map((mic) => (
                    <div className="flex" key={mic.deviceId}>
                      <div
                        className={`${
                          mic.deviceId === mediaControls.selectedMicrophone
                            ? ""
                            : "opacity-0"
                        }`}
                      >
                        ✓
                      </div>
                      <button
                        onClick={() =>
                          mediaControls.handleSelectMic(mic.deviceId)
                        }
                        className="block w-full text-left px-2 py-1 text-sm text-gray-250 hover:bg-gray-700 rounded"
                      >
                        {mic.label || "Unknown Microphone"}
                      </button>
                    </div>
                  ))
                )}
              </div>
              {/* Speaker Selection */}
              <div className="mb-4 border-b-1 border-gray-500">
                <p className="text-sm font-medium mb-1">Select a Speaker</p>
                {mediaControls.speakers.length === 0 ? (
                  <p className="text-xs text-gray-400">No speakers found</p>
                ) : (
                  mediaControls.speakers.map((speaker) => (
                    <div className="flex" key={speaker.deviceId}>
                      <div
                        className={`${
                          speaker.deviceId === mediaControls.selectedSpeaker
                            ? ""
                            : "opacity-0"
                        }`}
                      >
                        ✓
                      </div>
                      <button
                        onClick={() =>
                          mediaControls.handleSelectSpeaker(speaker.deviceId)
                        }
                        className="block w-full text-left px-2 py-1 text-sm text-gray-250 hover:bg-gray-700 rounded"
                      >
                        {speaker.label || "Unknown Speaker"}
                      </button>
                    </div>
                  ))
                )}
              </div>
              {/* Camera Selection */}
              <div>
                <p className="text-sm font-medium mb-1">Select a Camera</p>
                {mediaControls.cameras.length === 0 ? (
                  <p className="text-xs text-gray-400">No cameras found</p>
                ) : (
                  mediaControls.cameras.map((camera) => (
                    <div className="flex" key={camera.deviceId}>
                      <div
                        className={`${
                          camera.deviceId === mediaControls.selectedCamera
                            ? ""
                            : "opacity-0"
                        }`}
                      >
                        ✓
                      </div>
                      <button
                        onClick={() =>
                          mediaControls.handleSelectCamera(camera.deviceId)
                        }
                        className="block w-full text-left px-2 py-1 text-sm text-gray-250 hover:bg-gray-700 rounded"
                      >
                        {camera.label || "Unknown Camera"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* End Interview Button */}
        <button
          onClick={onEndInterview}
          className="bg-[#EB5757] hover:bg-red-700 text-white px-4 py-2 rounded-md ml-auto text-sm font-medium flex items-center gap-2"
        >
          <FaPowerOff />
          End Interview
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
