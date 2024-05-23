import React from "react";
import Avatar from "@/components/ui/Avatar";
import { User } from "@/model/User";

type Props = {
  user: User;
};

const SideBar = ({ user: { name, username, image } }: Props) => {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} size="normal" />}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg text-neutral-500">{name}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">About .... Language</p>
      <p className="font-bold text-sm text-gray-700">
        @Copyright INSTAGRAM from METAL
      </p>
    </>
  );
};

export default SideBar;
