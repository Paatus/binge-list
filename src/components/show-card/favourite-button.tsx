"use client";

import { TvShowListing } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useToggleFavourite } from "@/hooks/use-toggle-favourite";
import { LoaderCircle, Star } from "lucide-react";
import { MouseEvent } from "react";

interface Props {
  show: TvShowListing;
  isFavourite: boolean;
  className?: string;
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

export const FavouriteButton = ({ show, isFavourite, className }: Props) => {
  const [toggle, isPending] = useToggleFavourite();

  const onClick = (show: Props["show"]) => (e: MouseEvent<HTMLElement>) => {
    if (!isPending) {
      toggle(show)(e);
    }
  };

  return (
    <Button
      className={`shrink-0 -mr-2 ${className ? className : ""} ${isPending ? "bg-white" : "bg-white/85"}`}
      variant={"ghost"}
      size={"icon"}
      onClick={onClick(show)}
    >
      <Icon isFavourite={isFavourite} isPending={isPending} />
    </Button>
  );
};
