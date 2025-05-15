import { getImageUrl } from "@/tmbd-client";
import type { Episode } from "@/app/types";
import Image from "next/image";

interface EpisodeProps {
  episode: Episode;
}

const getEpisodeIdentifier = (episode: Episode): string => {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return `S${pad(episode.season_number)}E${pad(episode.episode_number)}`;
};

export const EpisodeItem = ({ episode }: EpisodeProps) => {
  return (
    <div className="sm:flex py-4">
      <div className="mb-4 shrink-0 sm:mr-4 sm:mb-0">
        <Image
          src={getImageUrl(episode.still_path, "still", "w185")}
          alt={"image"}
          width={185}
          height={104}
          className="rounded-md w-[185px] h-[104px] bg-gray-300"
        />
      </div>
      <div>
        <div className="flex gap-2">
          <h4 className="text-lg font-bold">{episode.name}</h4>
          <span className="inline-flex items-center rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600">
            {getEpisodeIdentifier(episode)}
          </span>
        </div>
        <p className="mt-1 line-clamp-3">
          {episode.overview || "No description available"}
        </p>
      </div>
    </div>
  );
};
