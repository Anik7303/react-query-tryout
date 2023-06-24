import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type PostQuery = {
  userId?: number;
  page: number;
  pageSize: number;
};

const initialQueryData: PostQuery = { page: 1, pageSize: 10 };

const usePosts = (query: PostQuery = initialQueryData) =>
  useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize,
            userId: query.userId,
          },
        })
        .then((res) => res.data),
    staleTime: 60_000, // 60s = 60 * 1000 ms
    keepPreviousData: false,
  });

export default usePosts;
