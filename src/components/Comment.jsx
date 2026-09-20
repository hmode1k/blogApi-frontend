function Comment({
  comment: { user_id, post_id, username, comment, commented_at },
}) {
  return (
    <>
      <div className="comment">
        <div className="flex">
          <h1>{user_id}</h1>
          <h2>{commented_at}</h2>
        </div>
        <div>
          <p>{comment}</p>
        </div>
      </div>
    </>
  );
}

export default Comment;
