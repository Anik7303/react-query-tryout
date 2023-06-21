import { ChangeEventHandler, useState } from "react";
import usePosts from "../hooks/usePosts";
import Spinner from "./Spinner";

function PostList() {
  const pageSize = 5;
  const [page, setPage] = useState<number>(1);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { data, error, isLoading } = usePosts({ page, pageSize, userId });

  const changePageNumber = (operation: "increment" | "decrement") => {
    if (operation === "increment") setPage((state) => state + 1);
    else setPage((state) => (state > 1 ? state - 1 : 1));
  };

  const handleUserIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;
    if (value) setUserId(parseInt(value));
    else setUserId(undefined);
    setPage(1);
  };

  if (error) return <p className="text-danger">{error.message}</p>;
  return (
    <section className="my-3">
      <h3 className="mb-3">Posts</h3>
      <select
        className="form-select mb-3"
        value={userId}
        onChange={handleUserIdChange}
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
          data?.map((post) => (
            <li key={post.id} className="list-group-item">
              <h5 className="mb-2">{post.title}</h5>
              <p>{post.body}</p>
            </li>
          ))
        )}
      </ul>
      <div className="d-flex justify-content-center align-items-center my-3">
        <button
          className="btn btn-primary me-2"
          disabled={page <= 1}
          onClick={() => changePageNumber("decrement")}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => changePageNumber("increment")}
          disabled={userId === undefined ? page >= 10 : page >= 2}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default PostList;
