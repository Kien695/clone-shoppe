import classNames from "classnames";
import { createSearchParams, Link } from "react-router-dom";

export default function Pagination({ queryConfig, pageSize }) {
  const page = Number(queryConfig.page);
  const RANGE = 2;
  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={index}
            className="bg-white cursor-pointer px-3 py-2 shadow-sm rounded mx-2 "
          >
            ...
          </span>
        );
      }
      return null;
    };
    const renderDotAlter = (index) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            key={index}
            className="bg-white cursor-pointer px-3 py-2 shadow-sm rounded mx-2 "
          >
            ...
          </span>
        );
      }
      return null;
    };
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAlter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            return renderDotAlter(index);
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }
        return (
          <Link
            to={{
              pathname: "/",
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString(),
              }).toString(),
            }}
            key={index}
            className={classNames(
              "bg-white cursor-pointer px-3 py-2 shadow-sm rounded mx-2 border",
              {
                "border-cyan-500": pageNumber === page,
                "border-transparent": pageNumber !== page,
              }
            )}
          >
            {pageNumber}
          </Link>
        );
      });
  };
  return (
    <div className="flex flex-wrap mt-6 justify-center">
      {page == 1 ? (
        <button className="bg-white/60 cursor-not-allowed px-3 py-2 shadow-sm rounded mx-2">
          Prev
        </button>
      ) : (
        <Link
          to={{
            pathname: "/",
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString(),
            }).toString(),
          }}
          className="bg-white cursor-pointer px-3 py-2 shadow-sm rounded mx-2"
        >
          Next
        </Link>
      )}

      {renderPagination()}
      {page == pageSize ? (
        <button className="bg-white/60 cursor-not-allowed px-3 py-2 shadow-sm rounded mx-2">
          Next
        </button>
      ) : (
        <Link
          to={{
            pathname: "/",
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString(),
            }).toString(),
          }}
          className="bg-white cursor-pointer px-3 py-2 shadow-sm rounded mx-2"
        >
          Prev
        </Link>
      )}
    </div>
  );
}
