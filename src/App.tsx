import PostList from "./components/PostList";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="container">
      <h1>Tryout: React Query</h1>
      <TodoList />
      <PostList />
    </div>
  );
}

export default App;
