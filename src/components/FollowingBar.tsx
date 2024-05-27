"use client";

import React from "react";
import { PropagateLoader } from "react-spinners";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";
import ScrollableBar from "@/components/ui/ScrollableBar";
import useMe from "@/hooks/me";

const FollowingBar = () => {
  const { user, isLoading: loading, error } = useMe();
  const users = user?.following;

  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
      {loading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ username, image }) => (
            <Link
              key={username}
              href={`/user/${username}`}
              className="flex flex-col items-center w-20"
            >
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
};

export default FollowingBar;
