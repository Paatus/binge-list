import { getFavourites } from "@/actions/favourites";
import { searchShows } from "@/actions/shows";
import { TvShowListing } from "@/app/types";
import { CardList } from "@/components/card-list";
import { Header } from "@/components/header";
import { ShowCard } from "@/components/show-card";
import { ScanSearch } from "lucide-react";

interface ResultsAreaProps {
  searchTerm: string;
  shows: TvShowListing[];
}

const NoResults = ({ searchTerm }: { searchTerm: string }) => {
  return (
    <div className="text-center h-full py-32">
      <div className="justify-center items-center flex h-full">
        <ScanSearch className="size-32" />
      </div>
      <h3 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
        There&apos;s nothing here
      </h3>
      <p className="mt-1 text-gray-500">
        We couldn&apos;t find any shows for the term &quot;{searchTerm}&quot;
      </p>
    </div>
  );
};

const ResultsArea = async ({ shows, searchTerm }: ResultsAreaProps) => {
  if (shows.length === 0 && searchTerm.length > 0) {
    return <NoResults searchTerm={searchTerm} />;
  }

  const favourites = await getFavourites();
  return (
    <CardList>
      {shows.map((show) => (
        <ShowCard
          show={show}
          isFavourite={!!favourites.find((f) => f.id === show.id)}
          key={show.id}
        />
      ))}
    </CardList>
  );
};

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const searchTerm = (params.searchTerm || "") as string;
  const searchResults = await searchShows(searchTerm);

  const shows = searchResults.results;

  return (
    <div className="max-sm:w-full sm:flex-1">
      <Header />
      <div>
        <ResultsArea shows={shows || []} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Home;
