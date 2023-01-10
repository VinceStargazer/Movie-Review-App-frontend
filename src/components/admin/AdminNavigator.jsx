import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import Actors from "./Actors";
import ActorUpload from "./ActorUpload";
import Dashboard from "./Dashboard";
import Header from "./Header";
import Movies from "./Movies";
import MovieUpload from "./MovieUpload";
import Navbar from "./Navbar";

export default function AdminNavigator() {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);

  return (
    <div>
      <div className="flex dark:bg-primary bg-white">
        <Navbar />
        <div className="flex-1 p-2 max-w-screen-xl">
          <Header
            onAddMovieClick={() => {
              setShowMovieUploadModal(true);
            }}
            onAddActorClick={() => {
              setShowActorUploadModal(true);
            }}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <MovieUpload
        visible={showMovieUploadModal}
        onClose={() => setShowMovieUploadModal(false)}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={() => setShowActorUploadModal(false)}
      />
    </div>
  );
}
