import { useEffect, useState } from "react";
import Post from "./components/Post";
import "./App.css";
import { useAuth } from "./AuthContext";

function App() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout, user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.msg);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    console.log(user);
  }, []);

  if (loading) {
    return <h1>loading</h1>;
  }

  if (!user) {
    return (
      <>
        <div>
          <h1>
            <a href="/login">login</a> or <a href="/signup">sign up</a> to
            continue
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div id="postsContainer">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <button onClick={() => logout()}>LOG OUT</button>
    </>
  );
}

export default App;
