"use server";

import { ConfigurationDetails, TvShowListing } from "@/app/types";
import { tmdbClient } from "@/tmbd-client";

const mapImages =
  (config: ConfigurationDetails | undefined) =>
  (tvShow: TvShowListing): TvShowListing => {
    const fallbackSvg = "empty-image.svg";
    const useFallback = (path: string | undefined): boolean => !config || !path;
    return {
      ...tvShow,
      backdrop_path: useFallback(tvShow.backdrop_path)
        ? fallbackSvg
        : `${config?.images?.secure_base_url}${config?.images?.backdrop_sizes?.[3]}${tvShow.backdrop_path}`,
      poster_path: useFallback(tvShow.poster_path)
        ? fallbackSvg
        : `${config?.images?.secure_base_url}${config?.images?.poster_sizes?.[0]}${tvShow.poster_path}`,
    };
  };

const getConfig = async () => {
  "use server";

  const { data } = await tmdbClient.GET("/3/configuration", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });

  return data;
};
export const searchShows = async (query: string) => {
  "use server";

  const searchShows = tmdbClient.GET("/3/search/tv", {
    params: { query: { query } },
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });
  const [config, { data }] = await Promise.all([getConfig(), searchShows]);

  const filterEmptyShows = (tvShow: TvShowListing) => {
    // Remove if no poster image and also no overview
    return !(!tvShow.poster_path && !tvShow.overview);
  };

  const sortByPopularity = (a: TvShowListing, b: TvShowListing) =>
    b.popularity - a.popularity;

  return {
    ...data,
    results: data?.results
      ?.filter(filterEmptyShows)
      .sort(sortByPopularity)
      .map(mapImages(config)),
  };
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
