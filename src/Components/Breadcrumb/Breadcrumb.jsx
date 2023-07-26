import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Check if the last element is "uid" or "id"
  const lastElement = pathnames[pathnames.length - 1];
  if (lastElement === "uid" || lastElement === "id") {
    return null;
  }

  return (
    <nav className="flex pl-5 py-2 bg-[#AA6FFF]" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-white hover:text-blue-600 dark:text-white dark:hover:text-white"
          >
            <svg
              className="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Landing
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            // Check if the current name is "uid" or "id" and return null to skip rendering
            (name.length > 20 ) ? null : (
              <li key={name}>
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-white mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  {isLast ? (
                    <Link to={name}>
                      <span className="ml-1 text-sm font-medium text-white md:ml-2 dark:text-white">
                        {name}
                      </span>
                    </Link>
                  ) : (
                    <Link
                      to={routeTo}
                      className="ml-1 text-sm font-medium text-white hover:text-blue-600 md:ml-2 dark:text-white dark:hover:text-white"
                    >
                      {name}
                    </Link>
                  )}
                </div>
              </li>
            )
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
