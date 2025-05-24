import { operations } from "../../tmdb";

export interface Show {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

export type ConfigurationDetails =
  operations["configuration-details"]["responses"][200]["content"]["application/json"];
export type TvSearchResults =
  operations["search-tv"]["responses"][200]["content"]["application/json"];
export type TvShowListing = Exclude<
  TvSearchResults["results"],
  undefined
>[number];
export type TvShowDetails = Exclude<
  operations["tv-series-details"]["responses"][200]["content"]["application/json"],
  undefined
>;
export type Episode = Exclude<
  operations["tv-season-details"]["responses"][200]["content"]["application/json"]["episodes"],
  undefined
>[number];
export type Genre = Exclude<TvShowDetails["genres"], undefined>[number];

export interface Filters {
  genre: Genre[];
}

export type ActiveFilters = {
  [K in keyof Filters]: string[];
};

export type ImageType = "backdrop" | "poster" | "profile" | "still";

export type ImageSizes = {
  backdrop: "w300" | "w780" | "w1280" | "original";
  logo: "w45" | "w92" | "w154" | "w185" | "w300" | "w500" | "original";
  poster: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";
  profile: "w45" | "w185" | "h632" | "original";
  still: "w92" | "w185" | "w300" | "original";
};
