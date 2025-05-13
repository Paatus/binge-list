import type { paths } from "../tmdb.d.ts";
import { ImageSizes, ImageType } from "./app/types";

import createClient from "openapi-fetch";

export const tmdbClient = createClient<paths>({
  baseUrl: "https://api.themoviedb.org",
});

export const getImageUrl = <Type extends ImageType>(
  path: string | undefined,
  _imageType: Type,
  size: ImageSizes[Type],
): string => {
  const fallbackSvg = "/empty-image.svg";
  if (!path) return fallbackSvg;

  const base_url = "https://image.tmdb.org/t/p/";

  return `${base_url}${size}${path}`;
};
