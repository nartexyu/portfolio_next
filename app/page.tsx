'use client'

import React, { useState, useEffect } from "react";

// Import components
import ChannelGrid from "./components/ChannelGrid";
import ChannelViewer from "./components/ChannelViewer";
import ContactModal from "./components/ContactModal";
import AboutModal from "./components/AboutModal";
import NavigationArrow from "./components/NavigationArrow";
import Footer from "./components/Footer";
import Mobile from "./components/Mobile";
import WelcomeScreen from "./components/Welcome";

// ChannelBg Videos
const Video1 = "/assets/Video1.mp4";

// ChannelBg Components
import Disc from "./components/ChannelBgs/Disc";

// Define the type for a single channel
type Channel = {
  title: string;
  complete: boolean;
  component?:  React.ComponentType<Record<string, never>>;
  link?: string;
  channelBg?: string;
  isVideo?: boolean;
};

// Define the channels object type
type Channels = {
  [key: number]: Channel;
};

const webChannels: Channels = {
  1: {
    title: "Hello!",
    complete: false,
    component: Disc,
  },
  2: {
    title: "Project 1",
    complete: true,
    link: "https://www.google.com",
    channelBg: Video1,
    isVideo: true,
  },
};

type ChannelState = {
  active: boolean;
  complete: boolean;
  channelNum: number | null;
  channelComponent:  React.ComponentType<Record<string, never>> | null;
  channelLink: string | null; 
  channelBg?: string;
  isVideo?: boolean;
};


function Home() {
  const [page, setPage] = useState<number>(0);
  const [arrow, setArrow] = useState<boolean>(false);
  const [channelState, setChannelState] = useState<ChannelState>({
    active: false,
    complete: false,
    channelNum: null,
    channelComponent: null,
    channelLink: null,
  });
  const [openContact, setOpenContact] = useState<boolean>(false);
  const [openAbout, setOpenAbout] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [mainContentVisible, setMainContentVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!showWelcome) {
      setMainContentVisible(true);
    }
  }, [showWelcome]);

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
    setArrow(!arrow);
  };

  const viewChannel = (channelNum: number) => {
    setChannelState((prevState) => ({
      active: !prevState.active,
      channelNum,
      complete: webChannels[channelNum].complete,
      channelComponent: webChannels[channelNum].component || null,
      channelLink: webChannels[channelNum].link || null,
      channelBg: webChannels[channelNum].channelBg,
      isVideo: webChannels[channelNum].isVideo,
    }));
  };

  const changeChannel = (next: boolean = true) => {
    const channelNumbers = Object.keys(webChannels)
      .map(Number)
      .sort((a, b) => a - b);
    const currentIndex = channelNumbers.indexOf(channelState.channelNum!);
    let nextIndex = next ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= channelNumbers.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = channelNumbers.length - 1;
    }
    const nextChannelNum = channelNumbers[nextIndex];
    setChannelState({
      ...channelState,
      channelNum: nextChannelNum,
      complete: webChannels[nextChannelNum].complete,
      channelComponent: webChannels[nextChannelNum].component || null,
      channelLink: webChannels[nextChannelNum].link || null,
      channelBg: webChannels[nextChannelNum].channelBg,
      isVideo: webChannels[nextChannelNum].isVideo,
    });
  };

  useEffect(() => {
    console.log("Current channel state: ", channelState);
  }, [channelState]);

  const resetChannel = () => {
    setChannelState({
      active: false,
      complete: false,
      channelNum: null,
      channelComponent: null,
      channelLink: null,
    });
  };

  const closeContact = () => {
    setOpenContact(false);
  };

  const closeAbout = () => {
    setOpenAbout(false);
  };

  return (
    <div>
      <Mobile />
      {showWelcome ? (
        <WelcomeScreen onContinue={() => setShowWelcome(false)} />
      ) : (
        <div
          className={`transition-opacity duration-100 ${
            mainContentVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`h-screen overflow-hidden ${
              !channelState.active && !openContact && !openAbout
                ? "transition-all ease-in-out opacity-100 duration-500 z-0 scale-100"
                : "transition-all ease-in-out delay-100 opacity-0 duration-300 -z-20 scale-150"
            }`}
          >
            <div className="flex place-items-center relative h-4/5 w-10/12 m-auto">
              <div
                className={`absolute ${
                  !page
                    ? "transition-all duration-1000 left-[0%] w-[100%] z-0"
                    : "transition-all duration-1000 left-[-100%] w-[100%] -z-10"
                }`}
              >
                <ChannelGrid
                  channels={webChannels}
                  channelLength={Object.keys(webChannels).length}
                  viewChannel={viewChannel}
                />
              </div>
              <div
                className={`absolute ${
                  page === 0
                    ? "transition-all duration-1000 right-[-100%] w-[100%] -z-10"
                    : "transition-all duration-1000 right-[0%] w-[100%] z-0"
                }`}
              >
                <ChannelGrid channels={{}} viewChannel={() => {}} />
              </div>
              <NavigationArrow
                direction="right"
                onClick={() => goToPage(1)}
                hidden={arrow}
              />
              <NavigationArrow
                direction="left"
                onClick={() => goToPage(0)}
                hidden={!arrow}
              />
            </div>
            <Footer openContact={setOpenContact} openAbout={setOpenAbout} />
          </div>
          <ChannelViewer
            channelState={channelState}
            changeChannel={changeChannel}
            resetChannel={resetChannel}
          />
          <ContactModal openContact={openContact} closeContact={closeContact} />
          <AboutModal openAbout={openAbout} closeAbout={closeAbout} />
          <div
            className={`${
              !channelState.active
                ? "crt opacity-100 transition-all ease-in-out duration-500"
                : "opacity-0 transition-all ease-in-out duration-500"
            }`}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Home;
