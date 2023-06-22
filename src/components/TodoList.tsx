import { ChangeEventHandler, useState } from "react";
import useTodos from "../hooks/useTodos";
import Spinner from "./Spinner";

function TodoList() {
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { data, error, isLoading } = useTodos({ page, pageSize, userId });

  const handleUserIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;
    if (value) setUserId(parseInt(value));
    else setUserId(undefined);
    setPage(1);
  };

  const changePageNumber = (operation: "increment" | "decrement") => {
    if (operation === "increment")
      setPage((page) => (page < 10 ? page + 1 : page));
    else setPage((page) => (page > 1 ? page - 1 : page));
  };

  if (error) return <p className="text-danger">{error.message}</p>;
  return (
    <section className="my-3">
      <h3>Todos</h3>
      <select
        className="form-select my-3"
        value={userId}
        onChange={handleUserIdChange}
      >
        <option value="">All users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
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
      <section className="d-flex justify-content-center align-items-center">
        <button
          className="btn btn-primary me-1"
          onClick={() => changePageNumber("decrement")}
          disabled={page < 2}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => changePageNumber("increment")}
          disabled={userId === undefined ? page >= 10 : page >= 2}
        >
          Next
        </button>
      </section>
    </section>
  );
}

export default TodoList;
