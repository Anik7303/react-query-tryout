import { useMutation, useQueryClient } from "@tanstack/react-query";
import todoService, { Todo } from "../services/todo-service";

type Props = {
  onAdd: () => void;
};

type AddTodoContext = {
  previousTodos: Todo[];
};

const useAddTodo = ({ onAdd }: Props) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,
    onMutate: (todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (todos = []) => [
        todo,
        ...todos,
      ]);

      onAdd();
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
};

export default useAddTodo;
