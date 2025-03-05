const AgentCard = () => {
  const agent = { name: "Bella" };

  return (
    <div className="bg-[#1A1F24] rounded-lg flex flex-col items-center aspect-video relative">
      <video
        autoPlay
        loop
        playsInline
        muted
        className="w-full h-full object-cover rounded-md"
      >
        <source src="/video/bella.mp4" type="video/mp4" />
      </video>

      {/* Agent details */}
      <div className="text-center absolute flex bg-gray-900/50 rounded px-4 py-1.5 left-2 bottom-2">
        <div className="font-medium text-md">{agent.name} (AI Interviewer)</div>
      </div>
    </div>
  );
};

export default AgentCard;
