import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TvShowListing } from "@/app/types";
import { FavouriteButton } from "./favourite-button";

interface Props {
  show: TvShowListing;
  isFavourite: boolean;
}

export const ShowCard = ({ show, isFavourite }: Props) => {
  return (
    <Link href={`/details/${show.id}`} key={show.id}>
      <Card className="min-h-[132px]">
        <CardHeader>
          <ViewTransition name={`title-${show.id}`}>
            <CardTitle className="flex flex-row gap-4 items-center -mt-2">
              <div className="grow line-clamp-1 ">{show.name}</div>
              <FavouriteButton show={show} isFavourite={isFavourite} />
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
