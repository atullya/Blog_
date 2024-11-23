import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Auth from "./Component/Auth";
import Home from "./Page/Home";
import AdminHome from "./Page/AdminHome";
import AdminNavbar from "./Page/Admin/AdminNavbar";
import AdminLogout from "./Page/Admin/AdminLogout";
import ListAllImage from "./Page/Admin/ListAllImage";
import ListAllUser from "./Page/Admin/ListAllUser";
import Setting from "./Component/Setting";

export const URL = "http://localhost:3000";
const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "admin",
    element: <AdminHome />,
  },
  {
    path: "adminNav",
    element: <AdminNavbar />,
  },
  {
    path: "/admin/list",
    element: <ListAllImage />,
  },

  {
    path: "/admin/alluser",
    element: <ListAllUser />,
  },
  {
    path: "/admin/logout",
    element: <AdminLogout />,
  },
  {
    path: "/user/setting",
    element: <Setting />,
  },
]);
function App() {
  return <RouterProvider router={allRoutes} />;
}

export default App;
