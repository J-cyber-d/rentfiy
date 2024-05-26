import { Fragment, useState, useEffect } from "react";
import "./App.css";
import RootLayout from "./layouts/Root";
import { Route, Routes } from "react-router-dom";
import ContentPage from "./pages/Content";
import HelpPage from "./pages/Help";
import SignUpPage from "./pages/Register";
import Axios from "axios";
import { LoadingContext, UserContext } from "./hooks/Context";
import BuyCardList from "./pages/Buy";
import SellCardList from "./pages/Sell";
import PropertyView from "./pages/PropertyView";

function App() {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [authState, setAuthState] = useState({
    isAuthenticated: false, // Initial state: unknown
    userData: null, // User data object
    error: null, // Any potential errors
  });

  async function verifyUser() {
    try {
      // Simulate API call delay (can be removed in production)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await Axios.get(`api/users/data`);
      if (res.data.result) {
        setAuthState({
          isAuthenticated: true,
          userData: {
            email: res.data.result.email,
            firstName: res.data.result.firstName,
            lastName: res.data.result.lastName,
            userId: res.data.result._id,
          },
          error: null,
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
  }, [refresh]);

  return (
    <UserContext.Provider value={{ authState, setAuthState }}>
      <LoadingContext.Provider
        value={{ loading, setLoading, refresh, setRefresh }}>
        <Fragment>
          <RootLayout>
            <Routes>
              <Route path="/" element={<BuyCardList />} />
              <Route path="/:propertyId" element={<PropertyView />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/sell" element={<SellCardList />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </RootLayout>
        </Fragment>
      </LoadingContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
