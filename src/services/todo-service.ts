import APIClient from "./api-client";

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

export default new APIClient<Todo>("/todos");
