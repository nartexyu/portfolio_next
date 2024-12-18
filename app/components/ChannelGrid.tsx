import React from "react";
import Channel from "./Channel";

const ClickSfx = "/assets/click.mp3";

// Define the type for an individual channel
interface Channel {
  complete: boolean;
  title: string;
  component?: React.ComponentType<Record<string, never>>;
}

// Define the props type for ChannelGrid
interface ChannelGridProps {
  channels: Record<number, Channel>;
  viewChannel: (channelNum: number) => void;
  channelLength?: number;
}

const ChannelGrid: React.FC<ChannelGridProps> = ({ channels, viewChannel }) => {
  const channelKeys = Object.keys(channels);
  const totalChannels = 12;
  const wipChannelsCount = totalChannels - channelKeys.length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 m-auto z-0">
      {/* Render active channels */}
      {channelKeys.map((key) => (
        <Channel
          key={key}
          hasProject={true}
          complete={channels[parseInt(key)].complete}
          title={channels[parseInt(key)].title}
          component={channels[parseInt(key)].component}
          onClick={() => {
            const audio = new Audio(ClickSfx);
            audio.play();
            viewChannel(parseInt(key));
          }}
        />
      ))}

      {/* Render WIP channels */}
      {[...Array(wipChannelsCount)].map((_, index) => (
        <Channel
          key={index + channelKeys.length}
          title={"WIP"}
          hasProject={false}
          onClick={() => {
            // Optional: Handle WIP click (can be empty)
            console.log("WIP channel clicked!");
          }}
        />
      ))}
    </div>
  );
};

export default ChannelGrid;
