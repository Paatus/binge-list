import { getImageUrl } from "@/tmbd-client";
import { cache, unstable_ViewTransition as ViewTransition } from "react";
import { FavouriteButton } from "./add-favourite-button";
import { isFavourite } from "@/actions/favourites";
import { Episode, TvShowDetails } from "@/app/types";
import { getShowDetails, getStreamingServices } from "@/actions/shows";
import Image from "next/image";
import { EpisodeItem } from "./episode";

const cachedShowDetails = cache(getShowDetails);

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

const FavouriteButtonBoundary = async ({
  show: showData,
}: {
  show: TvShowDetails;
}) => {
  const isFav = await isFavourite(showData.id);

  return <FavouriteButton show={showData} isFavourite={isFav} />;
};

const DetailsPage = async ({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id: idParam } = await params;
  const id = parseInt(idParam as string);
  const [show, streamingServices] = await Promise.all([
    cachedShowDetails(id),
    getStreamingServices(id),
  ]);

  return (
    <div className="">
      <div className="">
        {show.backdrop_path ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getImageUrl(show.backdrop_path, "backdrop", "w1280")}
            alt="backdrop image"
            className="rounded-lg"
          />
        ) : null}
        {/* Show info */}
        <div className="mx-auto px-4 pt-10 sm:px-6 md:grid md:grid-cols-3 md:grid-rows-[auto_auto_1fr] md:gap-x-8">
          <div className="md:col-span-2">
            <ViewTransition name={`title-${show.id}`}>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {show.name}
              </h1>
            </ViewTransition>
            <span className="text-gray-600">{show.tagline}</span>
          </div>

          {/* Show data */}
          <div className="mt-4 md:row-span-3 md:mt-0 md:border-l md:border-gray-200 md:pl-8 md:-ml-8 md:pb-24">
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
                  <div className="pl-4">
                    Available on {provider.provider_name}
                  </div>
                </div>
              ))}
            </div>
            {show.next_episode_to_air ? (
              <span className="mt-4 -ml-1.5 inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
                {`Next episode ${formatDateDistance(
                  (show.next_episode_to_air as typeof show.last_episode_to_air)
                    ?.air_date || "",
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
                    <dt className="text-sm/6 font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="w-full flex-none text-lg font-medium tracking-tight text-gray-900">
                      <StatusBadge status={show.status} />
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <FavouriteButtonBoundary show={show} />
          </div>

          <div className="py-10 md:col-span-2 md:col-start-1 md:pt-6 md:pr-8 md:pb-16">
            {/* Description */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <ViewTransition name={`overview-${show.id}`}>
                  <p className="text-base text-gray-900">{show.overview}</p>
                </ViewTransition>
              </div>
            </div>

            {show.last_episode_to_air ? (
              <div className="pt-10">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Latest episode
                </h2>
                <EpisodeItem episode={show.last_episode_to_air} />
              </div>
            ) : null}

            {show.next_episode_to_air ? (
              <div className="pt-10">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Upcoming episode
                </h2>
                <EpisodeItem episode={show.next_episode_to_air as Episode} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
