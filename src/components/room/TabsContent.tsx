"use client";
import React, { useState } from "react";
import { MediaControls } from "@/utils/hooks/useMediaControls";
import QuestionsTab from "@/components/room/tabs/QuestionTab";
import ResumeTab from "@/components/room/tabs/ResumeTab";
import JobDescriptionTab from "@/components/room/tabs/JobDescriptionTab";

interface TabsContentProps {
  mediaControls: MediaControls;
}

const TabsContent = ({ mediaControls }: TabsContentProps) => {
  const [activeTab, setActiveTab] = useState<"questions" | "resume" | "job">(
    "questions"
  );

  const handleTabClick = (tab: "questions" | "resume" | "job") => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-[#2F3134] rounded-lg p-4 border-t-[#4B4B4B] border-t">
      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-700 pb-2 mb-4">
        <button
          onClick={() => handleTabClick("questions")}
          className={`text-sm font-medium border-b-2 ${
            activeTab === "questions"
              ? "border-white"
              : "border-transparent hover:border-white"
          }`}
        >
          Questions
        </button>
        <button
          onClick={() => handleTabClick("resume")}
          className={`text-sm font-medium border-b-2 ${
            activeTab === "resume"
              ? "border-white"
              : "border-transparent hover:border-white"
          }`}
        >
          Resume
        </button>
        <button
          onClick={() => handleTabClick("job")}
          className={`text-sm font-medium border-b-2 ${
            activeTab === "job"
              ? "border-white"
              : "border-transparent hover:border-white"
          }`}
        >
          Job Description
        </button>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {activeTab === "questions" && <QuestionsTab />}
        {activeTab === "resume" && <ResumeTab />}
        {activeTab === "job" && <JobDescriptionTab />}
      </div>
    </div>
  );
};

export default TabsContent;
