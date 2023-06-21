import usePosts from "../hooks/usePosts";
import Spinner from "./Spinner";

function PostList() {
  const { data, error, isLoading } = usePosts();

  if (error) return <p className="text-danger">{error.message}</p>;
  return (
    <section className="my-3">
      <h3>Posts</h3>
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
