"use client";

import React, { useState } from "react";
import { parseDate } from "@/util/data";
import BookmarkIcon from "@/components/ui/icons/BookmarkIcon";
import HeartIcon from "@/components/ui/icons/HeartIcon";
import HeartFillIcon from "@/components/ui/icons/HeartFillIcon";
import BookmarkFillIcon from "@/components/ui/icons/BookmarkFillIcon";
import ToggleButton from "@/components/ui/icons/ToggleButton";
import { SimplePost } from "@/model/Post";
import { useSession } from "next-auth/react";
import usePosts from "@/hooks/posts";

type Props = {
  post: SimplePost;
};

const ActionBar = ({ post }: Props) => {
  const { id, likes, text, username, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;

  const liked = user ? likes.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState(false);

  const { setLike } = usePosts();
  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        {text && (
          <p>
            <span className="font-bold mr-1">{username}</span>
            {text}
          </p>
        )}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
};

export default ActionBar;
