import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEventHandler, useRef } from "react";
import todoService, { Todo } from "../services/todo-service";

function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: todoService.post,

    onSuccess: (data, _variables) => {
      // Approach 1: invalidate cache
      // queryClient.invalidateQueries({ queryKey: ["todos"] }); // This doesn't work with jsonplaceholder api

      // Approach 2: manuall update cache
      queryClient.setQueryData<Todo[]>(["todos"], (todos = []) => [
        data,
        ...todos,
      ]);
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
      ref.current.value = "";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input ref={ref} type="text" className="form-control" />
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
}

export default TodoForm;
