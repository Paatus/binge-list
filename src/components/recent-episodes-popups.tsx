"use client";

import { TvShowDetails } from "@/app/types";
import { isAfter, isBefore, parse, subDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  favourites: TvShowDetails[];
}

const isRecent = (dateString: string | undefined): boolean => {
  if (!dateString) return false;
  const date = parse(dateString, "yyyy-MM-dd", new Date());
  const aWeekAgo = subDays(new Date(), 7);
  return isAfter(date, aWeekAgo) && isBefore(date, new Date());
};

const useShowsWithRecentEpisodes = (favourites: TvShowDetails[]) => {
  return favourites.filter((show) => {
    const dateStr = show.last_air_date;
    const dateStr2 = show.last_episode_to_air?.air_date;
    // TODO patch this in an API-layer instead
    const dateStr3 = (
      show.next_episode_to_air as typeof show.last_episode_to_air
    )?.air_date;

    return isRecent(dateStr) || isRecent(dateStr2) || isRecent(dateStr3);
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
