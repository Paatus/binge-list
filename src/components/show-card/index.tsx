import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TvShowDetails, TvShowListing } from "@/app/types";
import { FavouriteButton } from "./favourite-button";
import { getImageUrl } from "@/tmbd-client";
import { getShowDetails } from "@/actions/shows";

interface Props {
  show: TvShowListing | TvShowDetails;
  isFavourite: boolean;
}

const getShowSummary = (show: TvShowListing | TvShowDetails) => {
  if (show.overview) return show.overview;
  if ("tagline" in show && show.tagline) return show.overview;
  return "No description available";
};

export const ShowCard = ({ show, isFavourite }: Props) => {
  return (
    <Link href={`/details/${show.id}`} key={show.id}>
      <Card className="min-h-[132px]">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="-mt-6 rounded-xl rounded-b-none aspect-[190/285] min-h-[190px]"
            src={
              show.poster_path
                ? getImageUrl(show.poster_path, "poster", "w342")
                : "/empty-image-2.svg"
            }
            alt="show poster"
          />
          <FavouriteButton
            show={show}
            isFavourite={isFavourite}
            className="absolute right-4 top-2 -mt-6"
          />
        </div>
        <CardHeader>
          <CardTitle className="">
            <div className="flex flex-row gap-4 items-center -mt-2">
              <ViewTransition name={`title-${show.id}`}>
                <div className="grow line-clamp-1 ">{show.name}</div>
              </ViewTransition>
            </div>
          </CardTitle>
          <ViewTransition name={`overview-${show.id}`}>
            <CardDescription className="line-clamp-3 min-h-[3lh]">
              {getShowSummary(show)}
            </CardDescription>
          </ViewTransition>
        </CardHeader>
      </Card>
    </Link>
  );
};
