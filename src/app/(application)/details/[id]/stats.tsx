import { isFavourite } from "@/actions/favourites";
import { Episode, TvShowDetails } from "@/app/types";
import { FavouriteButton } from "./add-favourite-button";
import { getStreamingServices } from "@/actions/shows";
import Image from "next/image";
import { getImageUrl } from "@/tmbd-client";
import { Suspense } from "react";

const formatDateDistance = (release_date: string) => {
  const autoUS = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  const release = Date.parse(release_date);
  const diffMs = release - new Date().getTime();
  const diffDays = Math.floor(diffMs / 86400000); // days
  if (diffDays < 7) {
    return autoUS.format(diffDays, "days");
  }
  const weeks = Math.floor(diffDays / 7);
  if (weeks < 10) {
    return autoUS.format(weeks, "weeks");
  }
  const months = Math.floor(weeks / 4);
  return autoUS.format(months, "months");
};

const StatusBadge = ({ status }: { status: string }) => {
  const colorMap: Record<typeof status, string> = {
    Ended: "bg-red-100 text-red-700",
    Canceled: "bg-gray-100 text-gray-600",
    "Returning Series": "bg-green-100 text-green-700",
  };
  const colors = colorMap[status] ?? colorMap["Canceled"];
  return (
    <span
      className={`inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-xs font-medium ${colors}`}
    >
      {status}
    </span>
  );
};

const FavouriteButtonBoundary = async ({ show }: { show: TvShowDetails }) => {
  const isFav = await isFavourite(show.id);

  return <FavouriteButton show={show} isFavourite={isFav} />;
};

const StreamingServices = async ({ show }: { show: TvShowDetails }) => {
  const streamingServices = await getStreamingServices(show.id);

  return (
    <div className="flex flex-col sm:flex-row md:flex-col">
      {streamingServices?.map((provider) => (
        <div
          className="flex flex-row items-center mb-1 mr-4"
          key={provider.provider_id}
        >
          <Image
            src={getImageUrl(provider.logo_path, "profile", "w45")}
            alt="logo"
            width={32}
            height={32}
            className="rounded-md"
          />
          <div className="pl-4">Available on {provider.provider_name}</div>
        </div>
      ))}
    </div>
  );
};

export const ShowStats = ({ show }: { show: TvShowDetails }) => {
  return (
    <div className="mt-4 md:row-span-3 md:mt-0 md:border-l md:border-gray-200 md:pl-8 md:-ml-8 md:pb-24">
      <Suspense fallback={"loading"}>
        <StreamingServices show={show} />
      </Suspense>
      {show.next_episode_to_air ? (
        <span className="mt-4 -ml-1.5 inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
          {`Next episode ${formatDateDistance(
            (show.next_episode_to_air as Episode).air_date || "",
          )}`}
        </span>
      ) : null}

      {/* Stats */}
      <div className="">
        <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5">
          {show.genres && show.genres.length ? (
            <div className="flex flex-wrap items-baseline justify-between bg-white gap-y-0.5 py-2">
              <dt className="text-sm/6 font-medium text-gray-500">
                {show.genres.length > 1 ? "Genres" : "Genre"}
              </dt>
              <dd className="w-full flex-none text-md font-medium tracking-tight text-gray-900 gap-1 flex py-1">
                {show.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {genre.name}
                  </span>
                ))}
              </dd>
            </div>
          ) : null}
          {show.status ? (
            <div className="flex flex-wrap items-baseline justify-between bg-white gap-y-0.5 py-2">
              <dt className="text-sm/6 font-medium text-gray-500">Status</dt>
              <dd className="w-full flex-none text-lg font-medium tracking-tight text-gray-900">
                <StatusBadge status={show.status} />
              </dd>
            </div>
          ) : null}
        </dl>
      </div>

      <Suspense
        fallback={<FavouriteButton show={show} loading isFavourite={false} />}
      >
        <FavouriteButtonBoundary show={show} />
      </Suspense>
    </div>
  );
};
