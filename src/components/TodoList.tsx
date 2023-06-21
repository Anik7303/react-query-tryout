import { useEffect, useState } from "react";
import axios from "axios";

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-danger">{error}</p>;
  return (
    <section className="my-3">
      <h3>Todos</h3>
      <ul className="list-group my-3">
        {todos.map((todo) => (
          <li
            className={`list-group-item ${todo.completed ? "disabled" : ""}`}
            key={todo.id}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
