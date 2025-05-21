import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const useAuth = () => {
  const auth = useContext(AppContext);
  return auth;
};

export default useAuth;
