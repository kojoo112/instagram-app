"use client";

import React from "react";
import PostListCard from "@/components/PostListCard";
import GridSpinner from "@/components/GridSpinner";
import usePosts from "@/hooks/posts";

const PostList = () => {
  const { posts, isLoading: loading } = usePosts();

  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GridSpinner color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PostList;
