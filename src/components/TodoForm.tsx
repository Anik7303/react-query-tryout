import { FormEventHandler, useRef } from "react";
import useAddTodo from "../hooks/useAddTodo";

function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);

  const addTodo = useAddTodo({
    onAdd: () => {
      if (ref.current) ref.current.value = "";
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (ref.current && ref.current.value) {
      addTodo.mutate({
        id: 0,
        title: ref.current.value,
        completed: false,
        userId: 1,
      });
    }
  };

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger my-3">{addTodo.error.message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input ref={ref} type="text" className="form-control" />
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            Add Todo
          </button>
        </div>
      </form>
    </>
  );
}

export default TodoForm;
