import React from "react";
import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};

const SearchPage = () => {
  return <UserSearch />;
};

export default SearchPage;
