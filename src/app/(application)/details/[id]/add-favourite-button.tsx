"use client";

import type { TvShowListing } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useToggleFavourite } from "@/hooks/use-toggle-favourite";
import { LoaderCircle } from "lucide-react";

interface Props {
  show: TvShowListing;
  isFavourite: boolean;
}

interface ButtonContentsProps {
  isPending: boolean;
  isFavourite: boolean;
}

const ButtonContents = ({ isPending, isFavourite }: ButtonContentsProps) => {
  if (isPending) {
    return (
      <>
        <LoaderCircle className="animate-spin" />
        {isFavourite ? "Removing favourite" : "Adding favourite"}
      </>
    );
  }
  return isFavourite ? "Remove from favourites" : "Add to favourites";
};

export const FavouriteButton = ({ show, isFavourite }: Props) => {
  const [toggle, isPending] = useToggleFavourite();

  return (
    <Button disabled={isPending} onClick={toggle(show)}>
      <ButtonContents isFavourite={isFavourite} isPending={isPending} />
    </Button>
  );
};
