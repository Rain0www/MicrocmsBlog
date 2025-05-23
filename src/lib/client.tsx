import { createClient } from "microcms-js-sdk";

export type Post = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
};

export type PostsResponse = {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
};

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? "",
  apiKey: process.env.MICROCMS_API_KEY ?? "",
});

export const getPosts = async (): Promise<PostsResponse> => {
  return await client.get<PostsResponse>({ endpoint: "blogs" });
};

export const getPost = async (id: string): Promise<Post> => {
  return await client.get<Post>({ endpoint: "blogs", contentId: id });
};

export const getCategory = async () => {
  return await client.get({ endpoint: "categories" });
};
