import { searchShows } from "@/tmbd-client";
import { Header } from "../components/header";
import { Breadcrumbs } from "../components/breadcrumbs";
import { ShowCard } from "../components/show-card";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const p = await searchParams;
  const searchTerm = p.searchTerm as string;
  const searchResults = await searchShows(searchTerm);

  const shows = searchResults?.results;

  const breadcrumbs = [
    { title: "Home", url: "/" },
    { title: "Find Shows", url: "#" },
  ];

  return (
    <div className="max-sm:w-full sm:flex-1">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Header />
      <div>
        <div className={`gap-2 grid grid-cols-2`}>
          {shows?.map((show) => <ShowCard show={show} key={show.id} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
