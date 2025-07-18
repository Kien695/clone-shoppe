export default function SortProduct() {
  return (
    <div className=" bg-gray-300/40 px-3 py-4 ">
      <div className="flex flex-wrap items-center justify-between gap-2 ">
        <div className="flex items-center gap-2">
          <div>Sắp xếp theo</div>
          <button className="h-8 capitalize px-4 bg-orange-500 text-white text-sm hover:bg-orange-400 text-center">
            Phổ biến
          </button>
          <button className="h-8 capitalize px-4 bg-white text-sm text-center">
            Mới nhất
          </button>
          <button className="h-8 capitalize px-4 bg-white text-sm text-center">
            Bán chạy
          </button>
          <select
            name=""
            id=""
            defaultValue=""
            className="h-8 px-4 bg-white text-sm text-left outline-none"
          >
            <option value="" disabled>
              Giá
            </option>
            <option value="price-asc">Giá: Thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className="flex items-center">
          <span>1/2</span>
          <div className="ml-2">
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
            <button className="h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white hover:bg-slate-100">
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
          </div>
        </div>
      </div>
    </div>
  );
}
