import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Protected from "./Protected.jsx";
import Cart from "./Cart.jsx";
import Shop from "./Shop.jsx";
import AuthPage from "./AuthPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <Cart />
      </Protected>
    ),
  },
  {
    path: "/shop",
    element: <Shop />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
