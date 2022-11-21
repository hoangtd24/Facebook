import OnlyHeader from "../layout/OnlyHeader";
import Groups from "../pages/Groups/Groups";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Market from "../pages/Market/Market";
import Profile from "../pages/Profile/Profile";
import Watch from "../pages/Watch/Watch";

const publicRoutes = [
  { path: "/", component: Home, layout: OnlyHeader },
  { path: "/login", component: Login },
  { path: "/profile", component: Profile, layout: OnlyHeader },
  { path: "/groups", component: Groups, layout: OnlyHeader },
  { path: "/watch", component: Watch, layout: OnlyHeader },
  { path: "/market", component: Market, layout: OnlyHeader },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
