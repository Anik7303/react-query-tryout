import useTodos from "../hooks/useTodos";
import Spinner from "./Spinner";

function TodoList() {
  const { data, error, isLoading } = useTodos();

  if (error) return <p className="text-danger">{error.message}</p>;
  return (
    <section className="my-3">
      <h3>Todos</h3>
      <ul className="list-group my-3">
        {isLoading ? (
          <Spinner />
        ) : (
          data?.map((todo) => (
            <li
              className={`list-group-item ${todo.completed ? "disabled" : ""}`}
              key={todo.id}
            >
              {todo.title}
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default TodoList;
