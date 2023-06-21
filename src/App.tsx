import PostList from "./components/PostList";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="container">
      <h1>Tryout: React Query</h1>
      <PostList />
      <TodoList />
    </div>
  );
}

export default App;
