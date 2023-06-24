import React from "react";
import useTodos from "../hooks/useTodos";
import Spinner from "./Spinner";
import TodoForm from "./TodoForm";

function TodoList() {
  const pageSize = 10;
  const { data, error, isLoading, isFetchingNextPage, fetchNextPage } =
    useTodos({ pageSize });

  if (error) return <p className="text-danger">{error.message}</p>;
  return (
    <section className="my-3">
      <h3>Todos</h3>
      <TodoForm
        onAdd={(text) => {
          console.log(text);
        }}
      />
      <ul className="list-group my-3">
        {isLoading ? (
          <Spinner />
        ) : (
          data.pages.map((page, index) => (
            <React.Fragment key={`todo-page-#${index}`}>
              {page.map((todo) => (
                <li
                  className={`list-group-item ${
                    todo.completed ? "disabled" : ""
                  }`}
                  key={todo.id}
                >
                  {todo.title}
                </li>
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      <button
        className="btn btn-primary"
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        More
      </button>
    </section>
  );
}

export default TodoList;
