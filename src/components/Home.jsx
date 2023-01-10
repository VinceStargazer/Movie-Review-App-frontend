import React from "react";
import Container from "./Container";
import SlideShow from "./movie/SlideShow";
import NotVerified from "./user/NotVerified";
import Trending from "./movie/Trending";

export default function Home() {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className="px-2 xl:p-0 ">
        <NotVerified />
        <SlideShow />
        <div className="space-y-10 py-8">
          <Trending type="movie" />
          <Trending type="tv" />
        </div>
      </Container>
    </div>
  );
}
