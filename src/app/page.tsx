"use client";

import { useFavouriteStore } from "./hooks/use-favourite-store";
import { ShowCard } from "./components/show-card";
import { WiStars } from "react-icons/wi";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Page = () => {
  return (
    <div className="pt-10">
      <div className="flex justify-between py-2">
        <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
          Favourites
        </h1>
        <Link href="/find">
          <button
            type="button"
            className="cursor-pointer gap-1 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <FaMagnifyingGlass />
            Find shows
          </button>
        </Link>
      </div>
      <div className="max-sm:w-full sm:flex-1">
        <FavouritesArea />
      </div>
    </div>
  );
};

const FavouritesArea = () => {
  const [, , favourites] = useFavouriteStore();

  if (!favourites.length) {
    return (
      <div className="text-center">
        <div className="justify-center flex">
          <WiStars className="text-[200px]" />
        </div>
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
          No projects
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by marking your favourite shows as favourites
        </p>
        <div className="mt-6">
          <Link href="/find">
            <button
              type="button"
              className="cursor-pointer gap-1 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <FaMagnifyingGlass />
              Find shows
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`gap-2 grid grid-cols-2`}>
      {favourites?.map((favourite) => (
        <ShowCard show={favourite} key={favourite.id} />
      ))}
    </div>
  );
};

export default Page;
