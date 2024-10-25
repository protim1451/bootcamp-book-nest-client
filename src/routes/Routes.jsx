import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import AddBook from "../pages/AddBook/AddBook";
import PrivateRoute from "./PrivateRoute";
import AllBooks from "../pages/AllBooks/AllBooks";
import MyAddedBooks from "../pages/AllBooks/MyAddedBooks";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import BookDetail from "../pages/BookDetail/BookDetail";
import UpdateBookForm from "../pages/AllBooks/UpdateBookForm";
import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: 'addbooks',
        element: <PrivateRoute>
          <AddBook></AddBook>
        </PrivateRoute>,
      },
      {
        path: '/allbooks',
        element: <PrivateRoute><AllBooks></AllBooks></PrivateRoute>,
      },
      {
        path: '/myaddedbooks',
        element: <PrivateRoute>
          <MyAddedBooks></MyAddedBooks>
        </PrivateRoute>,
      },
      {
        path: '/category/:category',
        element: <CategoryPage></CategoryPage>,
        //loader: ({ params }) => fetch(`https://b9a11-server-side-protim1451.vercel.app/books/category/${params.category}`),
        loader: ({ params }) => fetch(`http://localhost:3000/books/category/${params.category}`),
      },
      {
        path: "/book/:id",
        element: <PrivateRoute>
          <BookDetail></BookDetail>
        </PrivateRoute>,
      },
      {
        path: '/update-book/:bookId',
        element: <PrivateRoute>
          <UpdateBookForm></UpdateBookForm>
        </PrivateRoute>,
      },
      {
        path: '/borrowedbooks',
        element: <PrivateRoute>
          <BorrowedBooks></BorrowedBooks>
        </PrivateRoute>,
      },
    ],
  },
]);

export default router;