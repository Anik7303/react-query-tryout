import { useQuery } from "@tanstack/react-query";
import todoService, { Todo } from "../services/todo-service";

const useTodos = () =>
  useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: todoService.get,
    staleTime: 10_000, // 10s = 10 * 1000 ms = 10_000 ms
    keepPreviousData: false,
  });

export default useTodos;
