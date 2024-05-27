"use client";

import React from "react";
import { HomeUser, ProfileUser } from "@/model/AuthUser";
import useSWR from "swr";
import Button from "@/components/ui/Button";

type Props = {
  user: ProfileUser;
};

const FollowButton = ({ user: { username } }: Props) => {
  const { data: loggedInUser } = useSWR<HomeUser>("/api/me");

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
