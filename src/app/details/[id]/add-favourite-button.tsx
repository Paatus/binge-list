"use client";

import type { TvShowListing } from "@/app/types";
import { useFavouriteStore } from "@/app/hooks/use-favourite-store";

interface Props {
  show: TvShowListing;
}

export const FavouriteButton = ({ show }: Props) => {
  const [isFavourite, toggleFavourite] = useFavouriteStore();

  return (
    <button
      type="button"
      className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => {
        toggleFavourite(show);
      }}
    >
      {isFavourite(show.id) ? "Remove from favourites" : "Add to favourites"}
    </button>
  );
};
