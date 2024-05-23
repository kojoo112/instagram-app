import React from "react";
import { BiSmile } from "react-icons/bi";

const CommentForm = () => {
  return (
    <form className="flex items-center border-t border-neutral-300 px-3">
      <BiSmile />
      <input
        className="w-full ml-2 border-none outline-none p-3"
        type="text"
        placeholder="Add a comment..."
      />
      <button className="font-bold text-sky-500 ml-2">Post</button>
    </form>
  );
};

export default CommentForm;
