import React, { useEffect, useState } from "react";
import { BsChevronBarUp, BsChevronBarDown } from "react-icons/bs";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { useParams } from "react-router-dom";

import { getPerson } from "../../api/person";
import { useNotification } from "../../hooks";
import { TMDB_IMG_ORIGIN, TMDB_IMG_PATH } from "../../utils/config";
import { trimTitle } from "../../utils/helper";
import Container from "../Container";
import LibraryBlock from "../movie/LibraryBlock";
import Title from "../movie/Title";
import Loading from "../user/Loading";
import KnownForCard from "./KnownForCard";

const containerClass = "p-10 space-y-5";
const maxBioLen = 1340;
const btnClass = "absolute right-8 bottom-0 dark:text-highlight-dark text-highlight-deep";

export default function PersonPage() {
  const { updateNotification } = useNotification();

  const [ready, setReady] = useState(false);
  const [person, setPerson] = useState({});
  const [bioToShow, setBioToShow] = useState("");

  const { personId } = useParams();

  const fetchPerson = async () => {
    const { error, person } = await getPerson(personId);
    if (error) return updateNotification("error", error);
    setReady(true);
    setPerson(person);
    setBioToShow(trimTitle(person?.biography, maxBioLen));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (personId) fetchPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personId]);

  if (!ready) return <Loading />;

  const {
    name,
    birthday,
    deathday,
    biography,
    known_for_department,
    place_of_birth,
    profile_path,
    known_for,
  } = person;

  return (
    <div className="dark:bg-primary bg-white">
      <Container className="p-10 space-y-3">
        <div className="flex items-center space-x-3">
          <h1 className="text-5xl text-primary dark:text-white">{name}</h1>
          {deathday && (
            <h1 className="text-2xl text-fourth dark:text-light-fourth">
              {"(" +
                birthday.substring(0, 4) +
                "-" +
                deathday.substring(0, 4) +
                ")"}
            </h1>
          )}
        </div>
        <p className="text-md text-light-subtle dark:text-dark-subtle">
          {known_for_department}
        </p>

        <div className="w-full flex space-x-1">
          <div className="w-1/5">
            <a
              href={TMDB_IMG_ORIGIN + profile_path}
              target="_blank"
              rel="noreferrer"
              className="aspect-auto object-cover drop-shadow-lg"
            >
              <img
                src={TMDB_IMG_PATH + profile_path}
                alt=""
                title="Click to view the profile"
              />
            </a>
          </div>

          <div className="px-5 relative w-3/5 text-tertiary dark:text-gray">
            <p className="">{bioToShow}</p>
            {bioToShow.length < biography.length && (
              <button
                title="View All"
                onClick={() => setBioToShow(biography)}
                className={btnClass}
              >
                <BsChevronBarDown size={20} />
              </button>
            )}
            {bioToShow.length > maxBioLen + 3 && (
              <button
                title="Fold"
                onClick={() => setBioToShow(trimTitle(biography, maxBioLen))}
                className={btnClass}
              >
                <BsChevronBarUp size={20} />
              </button>
            )}
          </div>

          <div className="w-1/5">
            <LibraryBlock
              to={`/person/${personId}/images`}
              className="w-full aspect-square"
            >
              <MdOutlinePhotoLibrary className="text-5xl" />
              <h1 className="font-mono">MORE PHOTOS</h1>
            </LibraryBlock>

            <div className="flex flex-col justify-center px-2 pt-12">
              <PersonInfoRow title="Born" info={birthday} />
              <PersonInfoRow title="in" info={place_of_birth} />
              {deathday && <PersonInfoRow title="Died" info={deathday} />}
            </div>
          </div>
        </div>
      </Container>

      <Container className={containerClass}>
        <Title title="Photos" />
      </Container>

      <Container className={containerClass}>
        <Title title="Known for" />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {known_for.map((m, index) => (
            <KnownForCard movie={m} key={index} />
          ))}
        </div>
      </Container>
    </div>
  );
}

const PersonInfoRow = ({ title, info }) => {
  return (
    <div className="flex space-x-2 text-tertiary dark:text-gray">
      <p className="font-semibold">{title}</p>
      <p>{info}</p>
    </div>
  );
};
