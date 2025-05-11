import { useSyncExternalStore } from "react";
import { TvShowListing } from "../types";

const STORAGE_KEY = "binge-list-favourites";

type StoredType = Record<number, TvShowListing>;

const getFavouritesFromLocalStorage = (): string => {
  return localStorage.getItem(STORAGE_KEY) || "{}";
};

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
};

const getServerSnapshot = () => "{}";

export const useFavouriteStore = () => {
  const serializedFavourites = useSyncExternalStore(
    subscribe,
    getFavouritesFromLocalStorage,
    getServerSnapshot,
  );
  const favourites: StoredType = JSON.parse(serializedFavourites);

  const updateStorage = (value: StoredType) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
  };

  const toggleFavourite = (show: TvShowListing) => {
    const existingFavourite = favourites[show.id];
    if (existingFavourite) {
      const newState = { ...favourites };
      delete newState[show.id];
      updateStorage(newState);
    } else {
      updateStorage({ ...favourites, [show.id]: show });
    }
  };

  const isFavourite = (id: number): boolean => {
    return !!favourites[id];
  };

  return [isFavourite, toggleFavourite, Object.values(favourites)] as const;
};
