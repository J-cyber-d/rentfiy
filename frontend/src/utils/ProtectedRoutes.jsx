import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "../hooks/Context";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: null, // Initial state: unknown
    userData: null, // User data object
    error: null, // Any potential errors
  });
  const { setClientData } = useContext(UserContext);

  async function verifyUser() {
    try {
      // Simulate API call delay (can be removed in production)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await Axios.get(`api/users/data`);
      console.log(res.data.result.email);
      if (res.data.result) {
        setAuthState({
          isAuthenticated: true,
          userData: {
            email: res.data.result.email,
            userId: res.data.result._id,
          },
          error: null,
        });
        setClientData({
          isLoggedIn: true,
          userData: {
            email: res.data.result.email,
            userId: res.data.result._id,
          },
        });
      } else {
        setAuthState({ isAuthenticated: false, userData: null, error: null });
      }
    } catch (err) {
      setAuthState({ isAuthenticated: false, userData: null, error: err });
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);

  if (authState.isAuthenticated === null) {
    return "Loading";
  } else if (authState.isAuthenticated) {
    return <Outlet context={authState} />;
  } else {
    if (authState.error) {
      console.error("Authentication error:", authState.error);
    }
    return navigate("/");
  }
}
