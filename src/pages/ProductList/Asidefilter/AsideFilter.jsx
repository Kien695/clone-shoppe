import { createSearchParams, Link } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import classNames from "classnames";
export default function AsideFilter({ queryConfig, categories }) {
  const { category } = queryConfig;
  // console.log(category, categories);
  return (
    <div className="py-4">
      <Link to="" className="flex items-center font-bold">
        <svg viewBox="0 0 12 10" className="w-4 h-3 fill-current mr-3">
          <g fillRule="evenodd" stroke="none" strokeWidth="1">
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path>
                  <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path>
                  <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className="h-[1px] bg-gray-300 my-4"></div>
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id;
          return (
            <li className="py-2 pl-2" key={categoryItem._id}>
              <Link
                to={{
                  pathname: "/",
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id,
                  }).toString(),
                }}
                className={classNames("relative px-2 ", {
                  "text-orange-500 font-semibold": isActive,
                })}
              >
                {isActive && (
                  <svg
                    viewBox="0 0 4 7"
                    className="fill-orange-500 h-2 w-2 absolute top-1 left-[-10px]"
                  >
                    <polygon points="4 3.5 0 0 0 7"></polygon>
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          );
        })}

        {/* <li className="py-2 pl-2">
          <Link to="" className="relative px-2">
            Áo khoác
          </Link>
        </li>
        <li className="py-2 pl-2">
          <Link to="" className="relative px-2">
            Điện thoại
          </Link>
        </li> */}
      </ul>
      <div className="flex items-center font-bold uppercase mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        Bộ lọc tìm kiếm
      </div>
      <div className="h-[1px] bg-gray-300 my-4"></div>
      <div className="my-5">
        <div>Khoản giá</div>
        <div className="flex items-start mt-3">
          <input
            type="text"
            className="p-3 border border-gray-300 outline-none w-full rounded-sm focus:border-gray-500 focus:shadow-sm"
            placeholder="đ Từ"
          />
          <div className="mx-2 mt-2 shrink-0">_</div>
          <input
            type="text"
            className="p-3 border border-gray-300 outline-none w-full rounded-sm focus:border-gray-500 focus:shadow-sm"
            placeholder="đ Đến"
          />
        </div>
        <Button
          type="submit"
          className="mt-3 flex w-full items-center justify-center bg-red-500 py-2 px-2 text-sm uppercase text-white hover:bg-red-600"
        >
          Áp dụng
        </Button>
      </div>
      <div className="h-[1px] bg-gray-300 my-4"></div>
      <div className="my-5">
        <div>Đánh giá</div>
      </div>
      <div className="h-[1px] bg-gray-300 my-4"></div>
      <div className="my-5">
        <Button
          type="submit"
          className="mt-3 flex w-full items-center justify-center bg-red-500 py-2 px-2 text-sm uppercase text-white hover:bg-red-600"
        >
          Xóa tất cả
        </Button>
      </div>
    </div>
  );
}
