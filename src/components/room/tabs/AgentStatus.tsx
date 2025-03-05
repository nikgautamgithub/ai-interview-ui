"use client";
import React from "react";
import Thinking1 from "@/assets/icons/thinking1.svg";
import Thinking2 from "@/assets/icons/thinking1.svg";
import Thinking3 from "@/assets/icons/thinking1.svg";
import Image from "next/image";

interface AgentStatusProps {
  status: "thinking" | "speaking";
}

const AgentStatus = ({ status }: AgentStatusProps) => {
  return (
    <div className="p-3 bg-white/10 border-l-white border-l-2 rounded-md flex items-center gap-2">
      {status === "thinking" && (
        <>
          <span className="text-white">Bella is thinking</span>
          <div className="flex items-center gap-1">
            <div className="thinking-icon dot1">
              <Image src={Thinking1} alt="thinking-dot-1" />
            </div>
            <div className="thinking-icon dot2">
              <Image src={Thinking2} alt="thinking-dot-2" />
            </div>
            <div className="thinking-icon dot3">
              <Image src={Thinking3} alt="thinking-dot-3" />
            </div>
          </div>
        </>
      )}

      {status === "speaking" && (
        <>
          <span>Bella is speaking</span>
          {/* Speaking wave animation */}
          <div className="speaking-wave">
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
        </>
      )}
    </div>
  );
};

export default AgentStatus;
