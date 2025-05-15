"use client";

import type { TvShowListing } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useToggleFavourite } from "@/hooks/use-toggle-favourite";
import { LoaderCircle } from "lucide-react";

interface Props {
  show: TvShowListing;
  isFavourite: boolean;
  loading?: boolean;
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

const LoadingContents = () => {
  return (
    <>
      <LoaderCircle className="animate-spin" />
      {"Loading"}
    </>
  );
};
export const FavouriteButton = ({ show, isFavourite, loading }: Props) => {
  const [toggle, isPending] = useToggleFavourite();

  return (
    <Button
      disabled={isPending || loading}
      onClick={toggle(show)}
      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-10 py-6 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
    >
      {loading ? (
        <LoadingContents />
      ) : (
        <ButtonContents isFavourite={isFavourite} isPending={isPending} />
      )}
    </Button>
  );
};
