import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import SingleBook from "../pages/SingleBook";
import PrivateRoute from "./privateRoute";
import Orders from "../components/Orders";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DahboardLayout from "../pages/Dashboard/DahboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageBooks from "../pages/Dashboard/ManageBooks";
import AddBook from "../pages/Dashboard/addBook/AddBook";
import UpdateBook from "../pages/Dashboard/UpdateBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },

      {
        path: "/products",
        element: <h1>Products</h1>,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DahboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <AdminRoute>
            <div>
              <Dashboard />
            </div>
            ,
          </AdminRoute>
        ),
      },
      {
        path: "add-new-book",
        element: (
          <AdminRoute>
            {" "}
            <AddBook />
          </AdminRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <AdminRoute>
            <UpdateBook />
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
