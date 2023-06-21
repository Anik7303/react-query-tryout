import { ChangeEventHandler, useState } from "react";
import usePosts from "../hooks/usePosts";
import Spinner from "./Spinner";

function PostList() {
  const [userId, setUserId] = useState<number | undefined>();
  const { data: posts, error, isLoading } = usePosts(userId);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;
    if (value) setUserId(parseInt(event.target.value));
    else setUserId(undefined);
  };

  if (error) return <p className="text-danger">{error.message}</p>;
  return (
    <section className="my-3">
      <h3 className="mb-3">Posts</h3>
      <select
        className="form-select mb-3"
        value={userId}
        onChange={handleChange}
      >
        <option value="">All users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {isLoading ? (
          <Spinner />
        ) : (
          posts?.map((post) => (
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
