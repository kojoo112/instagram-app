import React from "react";

type Props = {
  image?: string | null;
};

const ColorImage = ({ image }: Props) => {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-500 p-[0.15rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full p-[0.1rem]"
        src={image ?? undefined}
        alt={"user profile"}
      />
    </div>
  );
};

export default ColorImage;
