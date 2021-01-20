import { useParams } from "react-router";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isPending, error } = useFetch(
    "http://localhost:8000/blogs/" + id
  );

  return (
    <div className="blog-details">
      {error && <div>{error}</div>}
      {isPending && <div>Loading.......</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <small>
            Written by <b>{blog.author}</b>
          </small>
          <div>{blog.body}</div>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
