"use client";

import { TvShowDetails } from "@/app/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface Props {
  show?: TvShowDetails;
}

export const Breadcrumbs = ({ show }: Props) => {
  const pathname = usePathname();

  const breadcrumbs = [
    { title: "Home", matcher: /\//, href: "/" },
    { title: "Find shows", matcher: /\/(find|details)/, href: "/find" },
    { title: show?.name ?? "Show details", matcher: /\/details/, href: "#" },
  ];

  const applicableBreadcrumbs = breadcrumbs.filter((b) =>
    pathname.match(b.matcher),
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {applicableBreadcrumbs.map((b, i) => (
          <Fragment key={b.href}>
            {i > 0 && <BreadcrumbSeparator className="hidden md:block" />}
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={b.href}>{b.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
