import { PropsWithChildren } from "react";

export const CardList = ({ children }: PropsWithChildren) => {
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
};
