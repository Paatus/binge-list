"use client";

import { TvShowDetails } from "@/app/types";
import { isAfter, parse, subDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  favourites: TvShowDetails[];
}

const useShowsWithRecentEpisodes = (favourites: TvShowDetails[]) => {
  return favourites.filter((show) => {
    const dateStr = show.last_air_date;
    if (!dateStr) return null;
    const date = parse(dateStr, "yyyy-MM-dd", new Date());
    return isAfter(date, subDays(new Date(), 7));
  });
};

export const RecentEpisodesPopups = ({ favourites }: Props) => {
  const showsWithNewEpisodes = useShowsWithRecentEpisodes(favourites);
  const navigation = useRouter();

  useEffect(() => {
    showsWithNewEpisodes.forEach((show) =>
      toast(`${show.name} recently had new episodes`, {
        action: {
          label: "Go to show page",
          onClick: () => {
            navigation.push(`/details/${show.id}`);
          },
        },
      }),
    );
  }, [navigation, showsWithNewEpisodes]);

  return null;
};
