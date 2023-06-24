import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import axios from "axios";

type AddTodoContext = {
  previousTodos: Todo[];
};

type Props = {
  onAdd: () => void;
};

const useAddTodo = ({ onAdd }: Props) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),

    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData<Todo[]>(["todos"], (todos = []) => [
        newTodo,
        ...todos,
      ]);

      onAdd();

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo.id === newTodo.id ? savedTodo : todo))
      );
    },

    onError: (_error, _newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },
  });
};

export default useAddTodo;
