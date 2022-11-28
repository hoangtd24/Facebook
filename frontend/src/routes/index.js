import OnlyHeader from "../layout/OnlyHeader";
import Groups from "../pages/Groups/Groups";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Market from "../pages/Market/Market";
import Profile from "../pages/Profile/Profile";
import ForgetPassWord from "../pages/ResetPassword/forget/ForgetPassword";
import ResetPassword from "../pages/ResetPassword/reset/ResetPassword";
import CodeVerification from "../pages/ResetPassword/verify/CodeVerification";
import Watch from "../pages/Watch/Watch";

const publicRoutes = [
  { path: "/", component: Home, layout: OnlyHeader },
  { path: "/profile", component: Profile, layout: OnlyHeader },
  { path: "/groups", component: Groups, layout: OnlyHeader },
  { path: "/watch", component: Watch, layout: OnlyHeader },
  { path: "/market", component: Market, layout: OnlyHeader },
];

const privateRoutes = [
  { path: "/login", component: Login },
  { path: "/forget", component: ForgetPassWord },
  { path: "/verify", component: CodeVerification },
];

export { publicRoutes, privateRoutes };
