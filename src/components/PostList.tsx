import axios from "axios";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-danger">{error}</p>;
  return (
    <section className="my-3">
      <h3>Posts</h3>
      <ul className="list-group my-3">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            <h5 className="mb-2">{post.title}</h5>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PostList;
