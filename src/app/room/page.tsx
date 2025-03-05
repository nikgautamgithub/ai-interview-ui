"use client";

import AgentCard from "@/components/room/AgentCard";
import ControlBar from "@/components/room/ControlBar";
import TabsContent from "@/components/room/TabsContent";
import Title from "@/components/room/Title";
import UserCard from "@/components/room/UserCard";
import useMediaControls from "@/utils/hooks/useMediaControls";

const Room = () => {
  const mediaControls = useMediaControls();

  return (
    <div className="bg-[#1A1F24] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        <Title />

        <div className="grid grid-cols-2 gap-4 mb-6">
          <AgentCard />

          <UserCard mediaControls={mediaControls}/>
        </div>

        <ControlBar mediaControls={mediaControls} totalDuration={1800}/>

        <TabsContent mediaControls={mediaControls} />
      </div>
    </div>
  );
};

export default Room;
