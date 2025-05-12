"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const breadcrumbs = [
  { title: "Home", matcher: /\//, href: "/" },
  { title: "Find shows", matcher: /\/(find|details)/, href: "/find" },
  { title: "Show details", matcher: /\/details/, href: "#" },
];

export const Breadcrumbs = () => {
  const pathname = usePathname();

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
