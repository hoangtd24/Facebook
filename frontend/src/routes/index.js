import OnlyHeader from "../layout/OnlyHeader";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";

const publicRoutes = [
  { path: "/", component: Home, layout: OnlyHeader},
  { path: "/login", component: Login },
  { path: "/profile", component: Profile, layout: OnlyHeader},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
