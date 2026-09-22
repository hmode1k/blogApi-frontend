import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useState } from "react";

function LogInForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error();
      }

      const result = await response.json();

      login(result.user, result.token);

      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <h1>loading</h1>
      </>
    );
  }

  return (
    <>
      <div>
        <h1>Log In</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" />
          <button type="submit">Log In</button>
        </form>
        <h6>
          Don't Have An Account? <a href="/signup">Register Now</a>
        </h6>
      </div>
    </>
  );
}

export default LogInForm;
