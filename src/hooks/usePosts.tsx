import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type PostQuery = {
  pageSize: number;
  userId?: number;
};

const initialQueryData: PostQuery = {
  pageSize: 10,
  userId: undefined,
};

const usePosts = (query: PostQuery = initialQueryData) =>
  useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
            userId: query.userId,
          },
        })
        .then((res) => res.data),
    staleTime: 60_000, // 1 min = 1 * 60 * 1000 ms = 60_000 ms
    keepPreviousData: true, // default: false
    getNextPageParam: (_lastPage, allPages) => {
      // return _lastPage.length > 0 ? ln + 1 : undefined;
      if (query.userId === undefined) {
        return allPages.length < 10 ? allPages.length + 1 : undefined;
      } else {
        return allPages.length < 2 ? allPages.length + 1 : undefined;
      }
    },
  });

export default usePosts;
