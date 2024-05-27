"use client";

import React from "react";
import { ProfileUser } from "@/model/AuthUser";
import Button from "@/components/ui/Button";
import useMe from "@/hooks/me";

type Props = {
  user: ProfileUser;
};

const FollowButton = ({ user: { username } }: Props) => {
  const { user: loggedInUser } = useMe();

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const text = following ? "UnFollow" : "Follow";

  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === "UnFollow"} />
      )}
    </>
  );
};

export default FollowButton;
