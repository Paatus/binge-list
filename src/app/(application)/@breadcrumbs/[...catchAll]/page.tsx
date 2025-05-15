import { getShowDetails } from "@/actions/shows";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface Props {
  params: Promise<{
    catchAll: string[];
  }>;
}

const BreadcrumbsSlot = async ({ params }: Props) => {
  const { catchAll: pathSegments } = await params;
  const isDetailView = pathSegments.findIndex((s) => s === "details") !== -1;
  if (isDetailView && pathSegments[1]) {
    const showId = parseInt(pathSegments[1], 10);
    const show = await getShowDetails(showId);
    return <Breadcrumbs show={show} />;
  }
  return <Breadcrumbs />;
};

export default BreadcrumbsSlot;
