import { ShowCard } from "@/components/show-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, StarOff } from "lucide-react";
import { getFavourites } from "@/actions/favourites";
import { CardList } from "@/components/card-list";
import { Filters } from "@/components/filters";
import { ActiveFilters, Genre } from "../types";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const p = await searchParams;
  const selectedFilters: ActiveFilters = {
    genre: typeof p.genre === "string" ? [p.genre] : p.genre || [],
  };
  return (
    <div className="h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
          Favourites
        </h1>
        <Link href="/find">
          <Button>
            <Search />
            Find shows
          </Button>
        </Link>
      </div>
      <div className="max-sm:w-full sm:flex-1 h-full mt-4">
        <FavouritesArea selectedFilters={selectedFilters} />
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center h-full">
      <div className="justify-center items-center flex h-full">
        <StarOff className="size-32" />
      </div>
      <h3 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
        No favourites, yet
      </h3>
      <p className="mt-1 text-gray-500">
        Get started by marking your favourite shows as favourites
      </p>
      <div className="mt-6">
        <Link href="/find">
          <Button>
            <Search />
            Find shows
          </Button>
        </Link>
      </div>
    </div>
  );
};

function indexBy<T extends object>(list: T[], iteratee: keyof T) {
  return list.reduce((map, obj) => {
    const key = obj[iteratee];
    // @ts-expect-error blablablabla
    map[key] = obj;
    return map;
  }, {});
}

const FavouritesArea = async ({
  selectedFilters,
}: {
  selectedFilters: ActiveFilters;
}) => {
  const favourites = await getFavourites();

  if (!favourites.length) {
    <EmptyState />;
  }
  const filtered = favourites.filter((f) => {
    if (selectedFilters.genre.length === 0) {
      return true;
    }
    return f.genres?.find((g) => selectedFilters.genre.includes(g.name || ""));
  });

  const genres: Genre[] = Object.values(
    indexBy(
      favourites.flatMap((f) => f.genres).filter((g) => !!g),
      "id",
    ),
  );

  const filteredAmount = filtered.length;
  const favouritesAmount = favourites.length;

  return (
    <>
      <Filters
        filters={{ genre: genres }}
        activeFilters={selectedFilters}
        numItems={favouritesAmount}
        numHits={filteredAmount}
      />
      <CardList>
        {filtered.map((favourite) => (
          <ShowCard show={favourite} isFavourite={true} key={favourite.id} />
        ))}
      </CardList>
    </>
  );
};

export default Page;
