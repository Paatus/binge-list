import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export const Breadcrumbs = ({
  breadcrumbs,
}: {
  breadcrumbs: { title: string; url: string }[];
}) => {
  return (
    <div>
      <nav aria-label="Back" className="sm:hidden py-4">
        <a
          href="#"
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <IoChevronBack
            aria-hidden="true"
            className="mr-1 -ml-1 size-5 shrink-0 text-gray-400"
          />
          Back
        </a>
      </nav>
      <nav aria-label="Breadcrumb" className="hidden sm:flex">
        <ol role="list" className="flex items-center space-x-4 py-4">
          {breadcrumbs.map((b, i) => (
            <li key={b.title}>
              <div className="flex items-center">
                {i > 0 && (
                  <IoChevronForward
                    aria-hidden="true"
                    className="size-5 shrink-0 text-gray-400"
                  />
                )}
                <a
                  href={b.url}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {b.title}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
