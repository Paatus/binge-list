import { getImageUrl, getShowDetails } from "@/tmbd-client";
import { unstable_ViewTransition as ViewTransition } from "react";
import { FavouriteButton } from "./add-favourite-button";
import { getFavourites } from "@/actions/favourites";

const DetailsPage = async ({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  const showData = await getShowDetails(parseInt(id as string));
  const favourites = await getFavourites();

  const isFavourite = !!favourites.find((f) => f.id === showData.id);

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

      <FavouriteButton show={showData} isFavourite={isFavourite} />
    </div>
  );
};

export default DetailsPage;
