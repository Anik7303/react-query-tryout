import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

type TodoQuery = {
  page: number;
  pageSize: number;
  userId?: number;
};

const initialQueryData = {
  page: 1,
  pageSize: 10,
  userId: undefined,
};

function useTodos(query: TodoQuery = initialQueryData) {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
          userId: query.userId,
        },
      })
      .then((res) => res.data);

  return useQuery<Todo[], Error>({
    queryKey: ["todos", query],
    queryFn: fetchTodos,
    staleTime: 10_000, // 10s = 10 * 1000 ms = 10_000 ms
    keepPreviousData: false,
  });
}

export default useTodos;
