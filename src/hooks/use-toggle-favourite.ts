import { toggleFavourite } from "@/actions/favourites";
import { TvShowListing } from "@/app/types";
import { useRouter } from "next/navigation";
import { MouseEvent, useTransition } from "react";

export const useToggleFavourite = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggle =
    (show: TvShowListing) => async (e: MouseEvent<HTMLElement>) => {
      startTransition(async () => {
        e.preventDefault();
        await toggleFavourite(show.id);
        router.refresh();
      });
    };

  return [toggle, isPending] as const;
};
