import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

function useTodos() {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
}

export default useTodos;
