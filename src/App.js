import React from "react";
import Navbar from "./components/user/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import NotFound from "./components/NotFound";
import { useAuth } from "./hooks";
import AdminNavigator from "./components/admin/AdminNavigator";
import SingleMovie from "./components/movie/SingleMovie";
import MovieReviewPage from "./components/review/MovieReviewPage";
import MovieCreditsPage from "./components/credits/MovieCreditsPage";
import PersonPage from "./components/people/PersonPage";
import MovieVideosPage from "./components/videos/MovieVideosPage";
import MovieImagesPage from "./components/images/MovieImagesPage";
import PersonImagesPage from "./components/images/PersonImagesPage";
import Watchlist from "./components/user/Watchlist";
import Watched from "./components/user/Watched";
import SearchResults from "./components/search/SearchResults";

export default function App() {
  const { authInfo } = useAuth();
  const isAdmin = authInfo.profile?.role === "admin";
  if (isAdmin) return <AdminNavigator />;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verify-email" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/movie/:movieId" element={<SingleMovie />} />
        <Route path="/movie/:movieId/reviews" element={<MovieReviewPage />} />
        <Route path="/movie/:movieId/credits" element={<MovieCreditsPage />} />
        <Route path="/movie/:movieId/videos" element={<MovieVideosPage />} />
        <Route path="/movie/:movieId/images" element={<MovieImagesPage />} />
        <Route path="/person/:personId" element={<PersonPage />} />
        <Route path="/person/:personId/images" element={<PersonImagesPage />} />
        <Route path="/user/watchlist" element={<Watchlist />} />
        <Route path="/user/watched" element={<Watched />} />
        <Route path="/user/search" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
