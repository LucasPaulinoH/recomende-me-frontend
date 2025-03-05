import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Recommendations from "../pages/Recommendations";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../utils/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import AddRecommendation from "../pages/AddRecommendation";
import MyRecommendations from "@/pages/MyRecommendations";
import Register from "@/pages/Register";

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
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Home />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route
              path="/recommendations/add"
              element={<AddRecommendation />}
            />
            <Route path="/recommendations/my" element={<MyRecommendations />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
