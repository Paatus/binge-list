"use client";

import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import { TvShowListing } from "../types";
import { useFavouriteStore } from "../hooks/use-favourite-store";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Props {
  show: TvShowListing;
}

export const ShowCard = ({ show }: Props) => {
  const [isFavourite, toggleFavourite] = useFavouriteStore();

  return (
    <Link href={`/details/${show.id}`} key={show.id}>
      <Card className="min-h-[132px]">
        <CardHeader>
          <ViewTransition name={`title-${show.id}`}>
            <CardTitle className="flex flex-row gap-4 items-center -mt-2">
              <div className="grow line-clamp-1 ">{show.name}</div>
              <Button
                className="shrink-0 -mr-2"
                variant={"ghost"}
                size={"icon"}
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavourite(show);
                }}
              >
                {isFavourite(show.id) ? (
                  <Star className="text-amber-400" fill="currentColor" />
                ) : (
                  <Star />
                )}
              </Button>
            </CardTitle>
          </ViewTransition>
          <ViewTransition name={`overview-${show.id}`}>
            <CardDescription className="line-clamp-2">
              {show.overview}
            </CardDescription>
          </ViewTransition>
        </CardHeader>
      </Card>
    </Link>
  );
};
