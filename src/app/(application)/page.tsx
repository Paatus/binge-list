import { ShowCard } from "@/components/show-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, StarOff } from "lucide-react";
import { getFavourites } from "@/actions/favourites";

const Page = () => {
  return (
    <div className="h-full">
      <div className="flex justify-between py-2">
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
      <div className="max-sm:w-full sm:flex-1 h-full ">
        <FavouritesArea />
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

const FavouritesArea = async () => {
  const favourites = await getFavourites();

  if (!favourites.length) {
    <EmptyState />;
  }

  return (
    <div className={`gap-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`}>
      {favourites?.map((favourite) => (
        <ShowCard show={favourite} isFavourite={true} key={favourite.id} />
      ))}
    </div>
  );
};

export default Page;
