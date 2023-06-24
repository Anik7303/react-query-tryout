import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Todo>("/todos");

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

const useTodos = () =>
  useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: apiClient.getAll,
    staleTime: 10_000, // 10s = 10 * 1000 ms
  });

export default useTodos;
