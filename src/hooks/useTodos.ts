import { useQuery } from "@tanstack/react-query";
import todoService, { Todo } from "../services/todo-service";

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

const useTodos = (query: TodoQuery = initialQueryData) =>
  useQuery<Todo[], Error>({
    queryKey: ["todos", query],
    queryFn: () =>
      todoService.get({
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
          userId: query.userId,
        },
      }),
    staleTime: 10_000, // 10s = 10 * 1000 ms = 10_000 ms
    keepPreviousData: false,
  });

export default useTodos;
