import useTodos from "../hooks/useTodos";

function TodoList() {
  const { todos, error } = useTodos();

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
