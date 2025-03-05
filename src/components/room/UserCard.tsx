"use client";
import React from "react";
import { MediaControls } from "@/utils/hooks/useMediaControls";
import { FaVideoSlash } from "react-icons/fa";

interface AgentCardProps {
  mediaControls: MediaControls;
}

const AgentCard = ({ mediaControls }: AgentCardProps) => {
  const user = { name: "Nikhil Gautam" };

  return (
    <div className="bg-[#1A1F24] rounded-lg flex flex-col items-center aspect-video relative">
      {/** Show video if camera is on; otherwise display a placeholder */}
      {!mediaControls.cameraOff ? (
        <video
          ref={mediaControls.videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover rounded-md transform scale-x-[-1]"
        />
      ) : (
        <div className="w-full h-full bg-black flex items-center justify-center rounded-md">
          <FaVideoSlash size={50} />
        </div>
      )}

      {/** Agent details overlay */}
      <div className="absolute left-2 bottom-2 bg-gray-900/50 rounded px-4 py-1.5">
        <div className="font-medium text-md">{user.name}</div>
      </div>
    </div>
  );
};

export default AgentCard;
