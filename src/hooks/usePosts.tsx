import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const usePosts = (userId: number | undefined) =>
  useQuery<Post[], Error>({
    queryKey: userId ? ["users", userId, "posts"] : ["posts"],
    queryFn: () =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: { userId },
        })
        .then((res) => res.data),
    staleTime: 60_000, // 1 min = 1 * 60 * 1000 ms = 60_000 ms
    keepPreviousData: false, // default: false
  });

export default usePosts;
