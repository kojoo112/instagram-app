import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";
import { redirect } from "next/navigation";
import NewPost from "@/components/NewPost";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new post",
};

const NewPostPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/sign-in");
  }

  return <NewPost user={session.user} />;
};

export default NewPostPage;
