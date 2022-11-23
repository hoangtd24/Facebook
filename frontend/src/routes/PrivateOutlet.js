import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login/Login";

function PrivateOutlet({ children }) {
  const { user } = useSelector((state) => state.auth);
  return Object.keys(user).length > 0 ? children : <Navigate to="/login" />;
}

export default PrivateOutlet;
