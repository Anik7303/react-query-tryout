import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEventHandler, useRef } from "react";
import todoService, { Todo } from "../services/todo-service";

type AddTodoContext = {
  previousTodos: Todo[];
};

function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,

    onMutate: (todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData<Todo[]>(["todos"], (todos = []) => [
        todo,
        ...todos,
      ]);

      if (ref.current) ref.current.value = "";

      return { previousTodos };
    },

    onSuccess: (data, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos = []) =>
        todos.map((todo) => (todo.id === newTodo.id ? data : todo))
      );
    },

    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
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
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input ref={ref} type="text" className="form-control" />
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            Add
          </button>
        </div>
      </form>
    </>
  );
}

export default TodoForm;
