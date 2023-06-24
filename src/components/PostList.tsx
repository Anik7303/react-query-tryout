import { useState } from "react";
import usePosts from "../hooks/usePosts";
import Spinner from "./Spinner";

function PostList() {
  const pageSize = 5;
  const [page, setPage] = useState<number>(1);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { data, error, isLoading } = usePosts({ page, pageSize, userId });

  const changePageNumber = (op: "increment" | "decrement"): void => {
    if (op === "decrement") setPage((page) => (page > 1 ? page - 1 : page));
    else if (op === "increment")
      setPage((page) => {
        if (userId) {
          if (page < 2) return page + 1;
          return page;
        }
        if (page < 10) return page + 1;
        return page;
      });
  };

  if (error) return <p className="text-danger">{error.message}</p>;
  return (
    <section className="my-3 d-flex flex-column align-items-center">
      <h3 className="align-self-start">Posts</h3>
      <select
        className="form-select"
        value={userId}
        onChange={({ target: { value } }) => {
          setUserId(value ? parseInt(value) : undefined);
          setPage(1);
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
      <div className="d-flex justify-content-center align-items-center my-3">
        <button
          className="btn btn-primary me-1"
          onClick={() => changePageNumber("decrement")}
          disabled={page <= 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => changePageNumber("increment")}
          disabled={!userId ? page >= 10 : page >= 2}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default PostList;
