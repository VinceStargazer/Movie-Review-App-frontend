/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { TMDB_IMG_ORIGIN, TMDB_IMG_PATH } from "../../utils/config";
import GalleryBar from "../movie/GalleryBar";
import Pagination from "../Pagination";

export default function GallerySection({ images, type, imgPerPage = 20 }) {
  const [currPage, setCurrPage] = useState(0);
  const [imagesToShow, setImagesToShow] = useState([]);

  const pages = Math.floor((images.length + imgPerPage - 1) / imgPerPage);

  const handleBtnClick = (index) => {
    setCurrPage(index);
  };

  useEffect(() => {
    setImagesToShow(images?.slice(0, imgPerPage));
  }, [images]);

  useEffect(() => {
    setImagesToShow(
      images?.slice(currPage * imgPerPage, (currPage + 1) * imgPerPage)
    );
  }, [currPage]);

  return (
    <div>
      <GalleryBar>{images.length + " " + type}</GalleryBar>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-1 pb-10">
        {imagesToShow.map((img, index) => (
          <a
            href={TMDB_IMG_ORIGIN + img}
            key={index}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="aspect-auto object-cover"
              src={TMDB_IMG_PATH + img}
              alt=""
            />
          </a>
        ))}
      </div>
      <Pagination
        currPage={currPage}
        itemPerPage={imgPerPage}
        items={images}
        type={type?.toLowerCase()}
        onClick={handleBtnClick}
        onNext={() => setCurrPage((currPage + 1) % pages)}
      />
    </div>
  );
}
