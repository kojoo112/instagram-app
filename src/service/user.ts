import { client } from "./sanity";
import { ProfileUser, User } from "@/model/User";

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  username: string;
};

export const addUser = async ({
  id,
  username,
  email,
  name,
  image,
}: OAuthUser) => {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
};

export const getUserByUsername = async (username: string): Promise<User> => {
  return await client.fetch(`*[_type == "user" && username == "${username}"][0]{
  ...,
  "id": _id,
  following[] -> {username, image},
  followers[] -> {username, image},
  "bookmarks": bookmarks[] -> _id
  }
  `);
};

export const getUserByUsernameOrName = async (
  keyword: string | null,
): Promise<User> => {
  const query = keyword
    ? `&& (name match "${keyword}") || (username match "${keyword}")`
    : "";
  return await client
    .fetch(
      `*[_type == "user" ${query}]{
  ...,
  "following": count(following),
  "followers": count(followers),
  }
  `,
    )
    .then((users) =>
      users.map((user: ProfileUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      })),
    );
};
