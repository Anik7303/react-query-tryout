import axios from "axios";
import { useState, useEffect } from "react";

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return { todos, error };
}

export default useTodos;
