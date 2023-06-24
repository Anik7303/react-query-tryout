import { useQuery } from "@tanstack/react-query";
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
    queryKey: ["todos"],
    queryFn: apiClient.getAll,
    staleTime: 10_000, // 10s = 10 * 1000 ms
  });

export default useTodos;
