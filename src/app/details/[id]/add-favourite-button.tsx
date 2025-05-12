"use client";

import type { TvShowListing } from "@/app/types";
import { useFavouriteStore } from "@/app/hooks/use-favourite-store";
import { Button } from "@/components/ui/button";

interface Props {
  show: TvShowListing;
}

export const FavouriteButton = ({ show }: Props) => {
  const [isFavourite, toggleFavourite] = useFavouriteStore();

  return (
    <Button
      onClick={() => {
        toggleFavourite(show);
      }}
    >
      {isFavourite(show.id) ? "Remove from favourites" : "Add to favourites"}
    </Button>
  );
};
