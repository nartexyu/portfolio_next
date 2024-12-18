import React, { useState } from "react";

// Define the type for props
interface ChannelProps {
  title: string; // Title of the channel
  onClick: () => void; // Click handler for the channel
  hasProject: boolean; // Whether the channel has a project
  complete?: boolean;
  bgImg?: string; // Optional background image
  component?:  React.ComponentType<Record<string, never>>; // Optional React component to render
}

const Channel: React.FC<ChannelProps> = ({
  title,
  onClick,
  hasProject,
  bgImg,
  component: Component,
}) => {
  const [project] = useState<boolean>(hasProject);

  return (
    <>
      <div
        onClick={onClick}
        className={`relative scroll-snap-center rounded-lg flex items-center justify-center text-sm shadow-sm border-4 border-zinc-400 group/channel ${
          project
            ? "z-0 hover:z-10 hover:border-sky-300 transform hover:scale-105 transition duration-300 ease-in-out"
            : "-z-10"
        }`}
        style={{
          width: "100%",
          paddingBottom: "50%",
          borderRadius: "1.5rem",
          backgroundImage: project && bgImg ? `url(${bgImg})` : "",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        {!project && <div className="staticEffect" />}
        <div className="absolute inset-0 flex items-center justify-center -z-10 text-3xl text-neutral-300 font-light">
          {!project && title}
        </div>

        <div
          className={`absolute bottom-[-30%] z-10 rounded-full bg-neutral-50 px-8 py-1 text-3xl font-light text-center text-neutral-500 shadow-sm border-2 border-neutral-400 transition-all delay-0 duration-300 scale-100 pointer-events-none ${
            project
              ? "opacity-0 group-hover/channel:opacity-100 transition-all group-hover/channel:delay-300 group-hover/channel:duration-300 group-hover/channel:scale-105"
              : "hidden"
          }`}
        >
          {title}
        </div>
        {project && Component && (
          <div className="absolute inset-0">
            <Component />
          </div>
        )}
      </div>
    </>
  );
};

export default Channel;
