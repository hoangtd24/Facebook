import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";

function PrivateOutlet({ children }) {
  const { user } = useSelector((state) => state.auth);
  return Object.keys(user).length > 0 ? children : <Navigate to="/login" />;
}

export default PrivateOutlet;
