"use client";

import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import { SearchUser } from "@/model/AuthUser";
import GridSpinner from "@/components/GridSpinner";
import UserCard from "@/components/UserCard";
import useDebounce from "@/hooks/debounce";

const UserSearch = () => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/users?keyword=${debouncedKeyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form onSubmit={onSubmit} className="w-full mb-4">
        <input
          className="w-full text-xl p-3 outline-none border border-gray-400"
          type="text"
          placeholder="Search for a username or name"
          autoFocus
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>뭔가 뭔가임</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 ? (
        <p>찾는 사용자가 없음</p>
      ) : (
        <ul className="w-full p-4">
          {users &&
            users.map((user) => (
              <li key={user.username}>
                <UserCard user={user}></UserCard>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
};

export default UserSearch;
