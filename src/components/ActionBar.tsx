import React from "react";
import { HeartIcon } from "@sanity/icons";
import { RiBookMarkedLine } from "react-icons/ri";
import { parseDate } from "@/util/data";

type Props = {
  likes: string[];
  username: string;
  text: string;
  createdAt: string;
};

const ActionBar = ({ likes, username, text, createdAt }: Props) => {
  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <HeartIcon />
        <RiBookMarkedLine />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        <p>
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
};

export default ActionBar;
