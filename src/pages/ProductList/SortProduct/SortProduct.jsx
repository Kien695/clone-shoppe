import classNames from "classnames";
import { sortBy, Order } from "../../../Constants/product";
import { Link, useNavigate } from "react-router-dom";
import { createSearchParams } from "react-router-dom";
import { omit } from "lodash";
export default function SortProduct({ queryConfig, pageSize }) {
  const page = Number(queryConfig.page);
  const { sort_by = sortBy.createdAt, order } = queryConfig;
  const navigate = useNavigate();
  const isActiveSortBy = (sortByValue) => {
    return sort_by == sortByValue;
  };
  const handleSort = (sortByValue) => {
    navigate({
      pathname: "/",
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue,
          },
          ["order"]
        )
      ).toString(),
    });
  };
  const handlePriceOrder = (orderValue) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue,
      }).toString(),
    });
  };
  return (
    <div className=" bg-gray-300/40 px-3 py-4 ">
      <div className="flex flex-wrap items-center justify-between gap-2 ">
        <div className="flex items-center gap-2">
          <div>Sắp xếp theo</div>
          <button
            className={classNames(
              "h-8 capitalize px-4   text-sm  text-center",
              {
                "text-white hover:bg-orange-400 bg-orange-500": isActiveSortBy(
                  sortBy.view
                ),
                "bg-white text-black hover:bg-slate-100 ": !isActiveSortBy(
                  sortBy.view
                ),
              }
            )}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames(
              "h-8 capitalize px-4   text-sm  text-center",
              {
                "text-white hover:bg-orange-400 bg-orange-500": isActiveSortBy(
                  sortBy.createdAt
                ),
                "bg-white text-black hover:bg-slate-100 ": !isActiveSortBy(
                  sortBy.createdAt
                ),
              }
            )}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames(
              "h-8 capitalize px-4   text-sm  text-center",
              {
                "text-white hover:bg-orange-400 bg-orange-500": isActiveSortBy(
                  sortBy.sold
                ),
                "bg-white text-black hover:bg-slate-100 ": !isActiveSortBy(
                  sortBy.sold
                ),
              }
            )}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames(
              "h-8 px-4 bg-white  text-sm text-left outline-none",
              {
                "text-blue-500  hover:bg-orange-400 hover:text-white bg-orange-500 ":
                  isActiveSortBy(sortBy.price),
                "bg-white text-black hover:bg-slate-100 ": !isActiveSortBy(
                  sortBy.price
                ),
              }
            )}
            value={order || "defaul"}
            onChange={(event) => handlePriceOrder(event.target.value)}
          >
            <option value="" disabled className="bg-white text-black">
              Giá
            </option>
            <option value={Order.asc} className="bg-white text-black">
              Giá: Thấp đến cao
            </option>
            <option value={Order.desc} className="bg-white text-black">
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
        <div className="flex items-center">
          <div>
            <span className="text-orange">{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className="ml-2">
            {page == 1 ? (
              <button className="h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100"
                onClick={() => {
                  navigate({
                    pathname: "/",
                    search: createSearchParams({
                      ...queryConfig,
                      page: (page - 1).toString(),
                    }).toString(),
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}
            {page == pageSize ? (
              <button className="h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100"
                onClick={() => {
                  navigate({
                    pathname: "/",
                    search: createSearchParams({
                      ...queryConfig,
                      page: (page + 1).toString(),
                    }).toString(),
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
