import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const usePosts = () =>
  useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: () =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.data),
    staleTime: 60_000, // 60s = 60 * 1000 ms
  });

export default usePosts;