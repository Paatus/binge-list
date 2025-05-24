"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ActiveFilters, Filters as FiltersType } from "@/app/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  filters: FiltersType;
  activeFilters: ActiveFilters;
  numItems: number;
  numHits: number;
}

const GenreFilter = ({
  options,
  active,
}: {
  options: FiltersType["genre"];
  active: ActiveFilters["genre"];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const activeGenreFilters = new Set(active);

  const setGenre = (selectedGenres: string[]) => {
    console.log({ selectedGenres });
    const params = new URLSearchParams(searchParams);
    if (selectedGenres.length === 0) {
      params.delete("genre");
    }
    selectedGenres.forEach((genre, i) => {
      if (i === 0) {
        params.set("genre", genre);
      } else {
        params.append("genre", genre);
      }
    });
    const paramString = params.toString();

    replace(`${pathname}${paramString ? `?${paramString}` : ""}`);
  };

  const buttonText =
    activeGenreFilters.size > 0
      ? `Genre (${activeGenreFilters.size})`
      : "Genre";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{buttonText}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Genre</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((g) => (
          <DropdownMenuCheckboxItem
            key={g.id}
            checked={activeGenreFilters.has(g.name || "")}
            onClick={(e) => {
              e.preventDefault();
              if (activeGenreFilters.has(g.name || "")) {
                activeGenreFilters.delete(g.name || "");
                setGenre([...activeGenreFilters]);
              } else {
                const allGenres = [...activeGenreFilters.add(g.name || "")];
                setGenre(allGenres);
              }
            }}
          >
            {g.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Filters = ({
  filters,
  activeFilters,
  numHits,
  numItems,
}: Props) => {
  const hasFiltered = numHits != numItems;

  return (
    <div className="border-b-gray-200 border-0 border-b-1 pb-2 flex justify-between items-end mb-2">
      <GenreFilter options={filters.genre} active={activeFilters.genre} />
      {hasFiltered ? (
        <p>
          {numHits} of {numItems} shown
        </p>
      ) : null}
    </div>
  );
};
