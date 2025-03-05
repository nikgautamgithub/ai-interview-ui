"use client";
import React, { useState } from "react";
import AgentStatus from "./AgentStatus";

type AgentStatusType = "thinking" | "speaking";

interface Question {
  id: number;
  title: string;
  text: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "Question 1",
    text: "Could you tell me a little bit about yourself and your experience in project management?",
  },
  {
    id: 2,
    title: "Question 2",
    text: "How do you prioritize tasks and manage deadlines in a project with multiple stakeholders and changing requirements?",
  },
];

export default function QuestionsTab() {
  const [agentStatus, setAgentStatus] = useState<AgentStatusType>("thinking");

  const speakQuestion = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);

      const setVoiceAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          // You can choose a specific voice by filtering or just take the first one.
          utterance.voice = voices[0];
        }
        // Optionally adjust volume and rate
        utterance.volume = 1; // Range: 0 to 1
        utterance.rate = 1; // 1 is normal speed

        window.speechSynthesis.speak(utterance);
        setAgentStatus("speaking");

        utterance.onend = () => {
          setAgentStatus("thinking");
        };
      };

      // If voices are not loaded yet, wait for the voiceschanged event.
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener(
          "voiceschanged",
          setVoiceAndSpeak,
          { once: true }
        );
      } else {
        setVoiceAndSpeak();
      }
    }
  };

  return (
    <div className="space-y-4">
      <AgentStatus status={agentStatus} />

      {/* Render each question */}
      {questions.map((question) => (
        <div key={question.id} className="border-b border-gray-700 pb-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{question.title}</p>
            <button
              onClick={() => speakQuestion(question.text)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs"
              title="Listen to question"
            >
              Speak
            </button>
          </div>
          <p className="text-sm text-gray-300">{question.text}</p>
        </div>
      ))}
    </div>
  );
}
