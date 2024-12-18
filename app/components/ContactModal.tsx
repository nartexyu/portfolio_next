import React from "react";
import Contact from "./Contact";

const BackSfx = "/assets/back.mp3";

// Define the type for props
interface ContactModalProps {
  openContact: boolean; // Whether the modal is open
  closeContact: () => void; // Function to close the modal
}

const ContactModal: React.FC<ContactModalProps> = ({ openContact, closeContact }) => (
  <div
    className={`${
      !openContact
        ? "absolute top-0 left-0 opacity-0 -z-20"
        : "absolute top-0 left-0 z-0 h-screen w-screen bg-neutral-200 transition-all ease-in-out delay-300 opacity-100 duration-300"
    }`}
  >
    <div className="flex items-center justify-center h-full ">
      <div
        className={`flex bg-neutral-200 text-3xl items-center justify-center ${
          !openContact
            ? "opacity-0 transition-all ease-in-out duration-200"
            : "opacity-100 transition-all delay-700 ease-in-out duration-500"
        }`}
      >
        <Contact />
      </div>
    </div>
    <div
      className={`absolute overflow-hidden bottom-0 inset-x-0 h-1/5 transition-all ease-in-out ${
        !openContact
          ? "opacity-0 transition-all ease-in-out duration-200"
          : "opacity-100 transition-all delay-700 ease-in-out duration-500"
      }`}
    >
      <div className="grid grid-cols-4 items-stretch h-full">
        <div className="col-start-4 col-end-5 flex items-center justify-end">
          <button
            type="button"
            className="relative right-[-25%] rounded-full bg-gradient-to-r from-zinc-200 to-zinc-300 bg-zinc-300 shadow-lg ring-4 ring-inset-8 ring-neutral-400 size-3/4"
            aria-hidden="true"
          ></button>
          <button
            type="button"
            className="absolute right-[4%] rounded-full bg-zinc-300 transform hover:scale-110 transition duration-300 ease-in-out text-gray-600 shadow-lg border-4 border-cyan-400"
          >
            <div className="h-32 w-32 flex justify-center items-center">
              <svg
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                className="w-2/3 h-2/3"
                aria-labelledby="returnIconTitle"
                stroke="#525252"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                color="#525252"
                onClick={() => {
                  const audio = new Audio(BackSfx);
                  audio.play();
                  closeContact();
                }}
              >
                <path d="M19,8 L19,11 C19,12.1045695 18.1045695,13 17,13 L6,13" />
                <polyline points="8 16 5 13 8 10" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ContactModal;
