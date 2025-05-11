"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Header = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("searchTerm", searchTerm);
    } else {
      params.delete("searchTerm");
    }
    const paramString = params.toString();

    replace(`${pathname}${paramString ? `?${paramString}` : ""}`);
  };

  return (
    <div>
      <div className="max-sm:w-full sm:flex-1">
        <h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
          Events
        </h1>
        <div className="mt-4 flex gap-4">
          <div className="flex-1 pb-2">
            <input
              placeholder="Search for your favourite show"
              className="relative block w-full appearance-none rounded-lg px-3 py-2 text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20 bg-transparent dark:bg-white/5 focus:outline-hidden data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-500 dark:data-invalid:data-hover:border-red-500 data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/[2.5%] dark:data-hover:data-disabled:border-white/15 dark:scheme-dark"
              onChange={(e) => updateSearchParams(e.target.value)}
              defaultValue={searchParams.get("searchTerm")?.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
