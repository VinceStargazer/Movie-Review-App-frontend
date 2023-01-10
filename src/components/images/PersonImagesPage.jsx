/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPerson, getPersonImages } from "../../api/person";
import { useNotification } from "../../hooks";
import Container from "../Container";
import PersonPageHead from "../people/PersonPageHead";
import StdContainer from "../StdContainer";
import Loading from "../user/Loading";
import GallerySection from "./GallerySection";

export default function PersonImagesPage() {
  const { updateNotification } = useNotification();

  const [ready, setReady] = useState(false);
  const [person, setPerson] = useState({});
  const [images, setImages] = useState([]);

  const { personId } = useParams();

  const fetchPerson = async () => {
    const { error, person } = await getPerson(personId);
    if (error) return updateNotification("error", error);
    setPerson(person);
  };

  const fetchImages = async () => {
    const { error, images } = await getPersonImages(personId);
    if (error) return updateNotification("error", error);
    setReady(true);
    setImages(images);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (personId) {
      fetchPerson();
      fetchImages();
    }
  }, [personId]);

  if (!ready) return <Loading />;

  return (
    <StdContainer>
      <Container className="p-10 space-y-5">
        <PersonPageHead person={person} subtitle="Photo Gallery" />
        <GallerySection images={images} type="Photos" imgPerPage={15} />
      </Container>
    </StdContainer>
  );
}
