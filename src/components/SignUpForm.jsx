import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function SignUpForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(result.message);
      }

      const result = await response.json();

      login(result.user, result.token);
      navigate("/");
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1>Sign Up</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" />
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" />
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" />
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input type="password" name="confirmpassword" />
          <button type="submit">Sign Up</button>
        </form>
        <h6>
          Already Have An Account? <a href="/login">Log In</a>
        </h6>
      </div>
    </>
  );
}

export default SignUpForm;
