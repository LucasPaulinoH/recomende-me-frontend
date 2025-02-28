import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Recommendations from "../pages/Recommendations";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../utils/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const AppRoutes = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Home />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
