import { ChangeEventHandler, useState } from "react";
import usePosts from "../hooks/usePosts";
import Spinner from "./Spinner";
import React from "react";

function PostList() {
  const pageSize = 5;
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePosts({
      pageSize,
      userId,
    });

  const handleUserIdChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;
    if (value) setUserId(parseInt(value));
    else setUserId(undefined);
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
          data.pages.map((page, index) => (
            <React.Fragment key={`page#${index}`}>
              {page.map((post) => (
                <li key={post.id} className="list-group-item">
                  <h5 className="mb-2">{post.title}</h5>
                  <p>{post.body}</p>
                </li>
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      <div className="d-flex justify-content-center align-items-center my-3">
        <button
          className="btn btn-primary"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      </div>
    </section>
  );
}

export default PostList;
