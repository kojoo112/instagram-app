"use client";

import React, { useState, useTransition } from "react";
import { ProfileUser } from "@/model/AuthUser";
import Button from "@/components/ui/Button";
import useMe from "@/hooks/me";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";

type Props = {
  user: ProfileUser;
};

const FollowButton = ({ user }: Props) => {
  const { username, id } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const text = following ? "UnFollow" : "Follow";

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text === "UnFollow"}
          />
        </div>
      )}
    </>
  );
};

export default FollowButton;
