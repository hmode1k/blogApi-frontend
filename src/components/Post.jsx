import { useEffect, useState } from "react";
import Comment from "./Comment";

function Post({ post: { id, title, content, created_at } }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${id}/comments`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTc4OTk0NjE5Nn0.AE1UP8yntBwgetyOKsFdMmaNlAiL9mCwKAicq-DPciI`,
            },
          },
        );
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  if (loading) {
    return (
      <>
        <h1>loading</h1>
      </>
    );
  }

  return (
    <>
      <div className="post">
        <div className="flex">
          <h1>{id}</h1>
          <h1>{title}</h1>
          <h2>{created_at}</h2>
        </div>
        <div>
          <p>{content}</p>
        </div>
        <div className="commentsSection">
          {comments.map((comment) => (
            <Comment key="comment.id" comment={comment} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Post;
