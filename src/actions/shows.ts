"use server";

import { TvShowListing } from "@/app/types";
import { tmdbClient } from "@/tmbd-client";

export const searchShows = async (query: string) => {
  "use server";

  const { data } = await tmdbClient.GET("/3/search/tv", {
    params: { query: { query } },
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });

  const filterEmptyShows = (tvShow: TvShowListing) => {
    // Remove if no poster image and also no overview
    return !(!tvShow.poster_path && !tvShow.overview);
  };

  const sortByPopularity = (a: TvShowListing, b: TvShowListing) =>
    b.popularity - a.popularity;

  return {
    ...data,
    results: data?.results?.filter(filterEmptyShows).sort(sortByPopularity),
  };
};

export const getStreamingServices = async (id: number) => {
  const { data } = await tmdbClient.GET("/3/tv/{series_id}/watch/providers", {
    params: { path: { series_id: id } },
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });

  // TODO Get language from a users preferences
  return data?.results?.SE?.flatrate;
};

export const getShowDetails = async (id: number) => {
  const { data } = await tmdbClient.GET("/3/tv/{series_id}", {
    params: { path: { series_id: id } },
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });

  if (!data) {
    throw new Error("Show not found");
  }
  return data;
};
