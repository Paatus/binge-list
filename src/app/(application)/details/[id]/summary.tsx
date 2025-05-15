import { TvShowDetails } from "@/app/types";
import { unstable_ViewTransition as ViewTransition } from "react";

export const ShowSummaryArea = ({ show }: { show: TvShowDetails }) => {
  return (
    <div className="md:col-span-2">
      <ViewTransition name={`title-${show.id}`}>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {show.name}
        </h1>
      </ViewTransition>
      <span className="text-gray-600">{show.tagline}</span>

      <div className="mt-4">
        <h3 className="sr-only">Description</h3>

        <div className="mt-6 pr-8">
          <ViewTransition name={`overview-${show.id}`}>
            <p className="text-base text-gray-900">{show.overview}</p>
          </ViewTransition>
        </div>
      </div>
    </div>
  );
};
