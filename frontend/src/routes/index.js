import OnlyHeader from "../layout/OnlyHeader";
import Friends from "../pages/Friends/Friends";
import Groups from "../pages/Groups/Groups";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Market from "../pages/Market/Market";
import PostDetail from "../pages/Post/PostDetail";
import Profile from "../pages/Profile/Profile";
import ForgetPassWord from "../pages/ResetPassword/forget/ForgetPassword";
import Watch from "../pages/Watch/Watch";

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/forget", component: ForgetPassWord },
];

const privateRoutes = [
  { path: "/", component: Home, layout: OnlyHeader },
  { path: "/profile/:idUser", component: Profile, layout: OnlyHeader },
  { path: "/groups", component: Groups, layout: OnlyHeader },
  { path: "/watch", component: Watch, layout: OnlyHeader },
  { path: "/market", component: Market, layout: OnlyHeader },
  { path: "/market", component: Market, layout: OnlyHeader },
  { path: "/friends", component: Friends, layout: OnlyHeader },
  { path: "/friends/:name", component: Friends, layout: OnlyHeader },
  { path: "/post/:id", component: PostDetail },
];

export { publicRoutes, privateRoutes };
