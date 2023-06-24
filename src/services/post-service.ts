import APIClient from "./api-client";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default new APIClient<Post>("/posts");
