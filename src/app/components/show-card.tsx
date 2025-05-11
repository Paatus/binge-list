"use client";

import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";
import { TvShowListing } from "../types";
import { useFavouriteStore } from "../hooks/use-favourite-store";
import { IoStar, IoStarOutline } from "react-icons/io5";

interface Props {
  show: TvShowListing;
}

export const ShowCard = ({ show }: Props) => {
  const [isFavourite, toggleFavourite] = useFavouriteStore();

  return (
    <Link href={`/details/${show.id}`} key={show.id}>
      <div
        className={`rounded-md px-2 py-2 flex shadow hover:shadow-blue-500 bg-gray-900`}
        key={show.id}
      >
        <div className="relative min-w-[93px]">
          <ViewTransition name={`poster_image-${show.id}`}>
            <Image
              src={show.poster_path || "/empty-image.svg"}
              alt="poster"
              width={93}
              height={135}
              className="rounded-md"
            />
            <div className="absolute right-0 top-0">
              <button
                className="bg-gray-900 p-2 m-1 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavourite(show);
                }}
              >
                {isFavourite(show.id) ? (
                  <IoStar className="text-amber-400" />
                ) : (
                  <IoStarOutline />
                )}
              </button>
            </div>
          </ViewTransition>
        </div>
        <div className="flex flex-col p-2">
          <ViewTransition name={`title-${show.id}`}>
            <b>{show.name}</b>
          </ViewTransition>
          <ViewTransition name={`overview-${show.id}`}>
            <p className="line-clamp-2 text-gray-600 dark:text-stone-300">
              {show.overview}
            </p>
          </ViewTransition>
        </div>
      </div>
    </Link>
  );
};
