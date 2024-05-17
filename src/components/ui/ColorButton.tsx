import React from "react";

type Props = {
  text: string;
  onClick: () => void;
};

const ColorButton = ({ text, onClick }: Props) => {
  return (
    <div className="rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-500 p-[0.15rem]">
      <button
        className="bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default ColorButton;
