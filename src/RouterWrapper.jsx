import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import App from "./App";
import LogInForm from "./components/LogInForm";

function RouterWrapper() {
  const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/signup", element: <SignUpForm /> },
    { path: "/login", element: <LogInForm /> },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterWrapper;
