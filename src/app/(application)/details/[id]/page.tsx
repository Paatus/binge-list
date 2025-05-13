import { getImageUrl, getShowDetails } from "@/tmbd-client";
import {
  cache,
  Suspense,
  unstable_ViewTransition as ViewTransition,
} from "react";
import { FavouriteButton } from "./add-favourite-button";
import { isFavourite } from "@/actions/favourites";
import { TvShowDetails } from "@/app/types";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const cachedShowDetails = cache(getShowDetails);

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
  const showData = await cachedShowDetails(id);

  return (
    <div>
      {showData.backdrop_path ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={getImageUrl(showData.backdrop_path, "backdrop", "w1280")}
          alt="backdrop image"
          className="rounded-lg"
        />
      ) : null}
      <ViewTransition name={`title-${showData.id}`}>
        <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl dark:text-white">
          {showData?.name}
        </h1>
      </ViewTransition>
      <h2 className="text-xl tracking-tight text-pretty text-gray-700 mb-4">
        {showData?.tagline}
      </h2>
      <div className="gap-2 flex">
        <span className="text-sm font-medium text-gray-500">
          {showData?.genres?.map((g) => g.name).join(" / ")}
        </span>
        <span className="text-sm font-medium text-gray-500">|</span>
        <span className="text-sm font-medium text-gray-500">
          {showData?.number_of_seasons} Seasons
        </span>
        <span className="text-sm font-medium text-gray-500">|</span>
        <span className="text-sm font-medium text-gray-500">
          {showData?.status}
        </span>
      </div>

      <div className="pb-5">
        <h3 className="font-semibold text-gray-700 pt-10">Plot summary</h3>
        <ViewTransition name={`overview-${showData.id}`}>
          <p>{showData.overview}</p>
        </ViewTransition>
      </div>

      <Suspense
        fallback={
          <Button disabled>
            <LoaderCircle className="animate-spin" />
            Loading
          </Button>
        }
      >
        <FavouriteButtonBoundary show={showData} />
      </Suspense>
    </div>
  );
};

export default DetailsPage;
