import { FormEventHandler, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "../hooks/useTodos";

function TodoForm() {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),

    onSuccess: (savedTodo, _newTodo) => {
      // Approach 1: invalidate cache
      // queryClient.invalidateQueries({queryKey: ['todos']}); // This doesn't work with jsonplaceholder api

      // Approach 2: manually update cache
      queryClient.setQueryData<Todo[]>(["todos"], (todos = []) => [
        savedTodo,
        ...todos,
      ]);
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (ref.current && ref.current.value) {
      addTodo.mutate({
        id: 0,
        title: ref.current.value,
        completed: false,
        userId: 1,
      });
      ref.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input ref={ref} type="text" className="form-control" />
        <button className="btn btn-primary">Add Todo</button>
      </div>
    </form>
  );
}

export default TodoForm;
