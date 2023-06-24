import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

type TodoQuery = {
  pageSize: number;
};

const initialQueryData: TodoQuery = { pageSize: 10 };

const useTodos = (query: TodoQuery = initialQueryData) =>
  useInfiniteQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 10_000, // 10s = 10 * 1000 ms
    getNextPageParam: (lastPage = [], allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

export default useTodos;
