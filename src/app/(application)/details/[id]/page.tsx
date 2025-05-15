import { getImageUrl } from "@/tmbd-client";
import { cache } from "react";
import { getShowDetails } from "@/actions/shows";
import { RecentEpisodes } from "./episodes";
import { ShowStats } from "./stats";
import { ShowSummaryArea } from "./summary";
import Image from "next/image";

const cachedShowDetails = cache(getShowDetails);

const DetailsPage = async ({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id: idParam } = await params;
  const id = parseInt(idParam as string);
  const show = await cachedShowDetails(id);

  return (
    <div>
      {show.backdrop_path ? (
        <Image
          src={getImageUrl(show.backdrop_path, "backdrop", "w1280")}
          alt="backdrop image"
          className="rounded-lg"
          width={998}
          height={558}
          priority
          loading="eager"
        />
      ) : null}
      <div className="mx-auto px-4 pt-10 sm:px-6 md:grid md:grid-cols-3 md:grid-rows-[auto_auto_1fr] md:gap-x-8">
        <ShowSummaryArea show={show} />

        <ShowStats show={show} />

        <RecentEpisodes show={show} />
      </div>
    </div>
  );
};

export default DetailsPage;
