import axios from "axios";
import { useState, useEffect } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return { posts, error };
}

export default usePosts;
