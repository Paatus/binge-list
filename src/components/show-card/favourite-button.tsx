"use client";

import { TvShowListing } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useToggleFavourite } from "@/hooks/use-toggle-favourite";
import { LoaderCircle, Star } from "lucide-react";

interface Props {
  show: TvShowListing;
  isFavourite: boolean;
}

interface IconProps {
  isFavourite: boolean;
  isPending: boolean;
}

const Icon = ({ isFavourite, isPending }: IconProps) => {
  if (isPending) {
    return <LoaderCircle className="animate-spin" />;
  }
  if (isFavourite) {
    return <Star className="text-amber-400" fill="currentColor" />;
  }

  return <Star />;
};

export const FavouriteButton = ({ show, isFavourite }: Props) => {
  const [toggle, isPending] = useToggleFavourite();

  return (
    <Button
      className="shrink-0 -mr-2"
      variant={"ghost"}
      size={"icon"}
      onClick={void toggle(show)}
      disabled={isPending}
    >
      <Icon isFavourite={isFavourite} isPending={isPending} />
    </Button>
  );
};
