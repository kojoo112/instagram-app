import { assetsURL, client, urlFor } from "@/service/sanity";
import { SimplePost } from "@/model/Post";

const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    "text": comments[0].comment,
    "comments": count(comments),
    "id": _id,
    "createdAt": _createdAt
`;

export const getFollowingPostListOf = async (username: string) => {
  return await client
    .fetch(
      `
    *[_type == "post" && author->username == "${username}" 
    || author._ref in *[_type=="user" && username=="${username}"].following[]._ref ]
    | order(_createdAt desc){
    ${simplePostProjection}
    }
`,
    )
    .then(mapPosts);
};

export const getPost = async (id: string) => {
  return await client
    .fetch(
      `
    *[_type == "post" && _id == "${id}"][0]{
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    comments[]{comment, "username": author->username, "image": author->image},
    "id": _id,
    "createdAt": _createdAt
    }`,
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
};

export const getPostOf = async (username: string) => {
  return client
    .fetch(
      `
    *[_type == "post" && author->username == "${username}"]
    | order(_createdAt desc){
        ${simplePostProjection}
    }
    `,
      {},
      { cache: "no-cache" },
    )
    .then(mapPosts);
};

export const getLikedPostsOf = async (username: string) => {
  return client
    .fetch(
      `
    *[_type == "post" && "${username}" in likes[]->username]
    | order(_createdAt desc){
        ${simplePostProjection}
    }
    `,
      {},
      {
        cache: "no-cache",
      },
    )
    .then(mapPosts);
};

export const getSavedPostsOf = async (username: string) => {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`,
      {},
      {
        cache: "no-cache",
      },
    )
    .then(mapPosts);
};

const mapPosts = (posts: SimplePost[]) => {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
};

export const likePost = async (postId: string, userId: string) => {
  return await client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append("likes", [{ _ref: userId, _type: "reference" }])
    .commit({ autoGenerateArrayKeys: true });
};

export const dislikePost = async (postId: string, userId: string) => {
  return await client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
};

export const addComment = async (
  postId: string,
  userId: string,
  comment: string,
) => {
  return await client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        comment,
        author: { _ref: userId, _type: "reference" },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
};

export const createPost = async (userId: string, text: string, file: Blob) => {
  return fetch(assetsURL, {
    method: "POST",
    headers: {
      "content-type": file.type,
      authorization: `Bearer ${process.env.SANITY_TOKEN}`,
    },
    body: file,
  })
    .then((res) => res.json())
    .then((result) => {
      return client.create(
        {
          _type: "post",
          author: { _ref: userId },
          photo: { asset: { _ref: result.document._id } },
          comments: [
            {
              comment: text,
              author: { _ref: userId, _type: "reference" },
            },
          ],
          likes: [],
        },
        { autoGenerateArrayKeys: true },
      );
    });
};
