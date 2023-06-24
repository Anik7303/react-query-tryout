import { useState } from "react";
import usePosts from "../hooks/usePosts";
import Spinner from "./Spinner";

function PostList() {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { data, error, isLoading } = usePosts({ userId });

  if (error) return <p className="text-danger">{error.message}</p>;
  return (
    <section className="my-3">
      <h3>Posts</h3>
      <select
        className="form-select"
        value={userId}
        onChange={({ target: { value } }) => {
          setUserId(value ? parseInt(value) : undefined);
        }}
      >
        <option value="">All</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group my-3">
        {isLoading ? (
          <Spinner />
        ) : (
          data?.map((post) => (
            <li key={post.id} className="list-group-item">
              <h5 className="mb-2">{post.title}</h5>
              <p>{post.body}</p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default PostList;
