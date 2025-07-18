import { Link } from "react-router-dom";

export default function Product() {
  return (
    <Link to="">
      <div className="bg-white shadow rounded-sm hover:translate-y-[-0.05rem] hover:shadow-md duration-100 transition-transform overflow-hidden relative">
        <div className="absolute top-0 right-0 bg-pink-200/80 z-10 text-xs py-0.5 px-1 text-orange-500">
          -50%
        </div>
        <div className="w-full pt-[100%] relative">
          <img
            src="https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mbsw1g13h8cudd_tn.webp"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover bg-white"
          />
        </div>
        <div className="p-2 overflow-hidden">
          <div className="min-h-[2rem] line-clamp-2 text-xs">
            Bộ Đồ Nam Nữ Unisex Mùa Hè Ngắn Tay Cổ Tròn Họa Tiết Loang Vẩy Sơn
            Hot Trend Thời Trang Zenkonu QA NAM 104
          </div>
          <button className=" mt-1 h-4 border border-orange-500 text-orange-500 rounded-sm py-0.5 px-1 flex text-[0.645rem] align-center">
            Rẻ vô địch
          </button>
          <div className="flex items-center mt-2">
            <div className="line-through m-w-[50%] text-gray-500 truncate">
              <span className="text-xs">đ</span>
              <span>62.000</span>
            </div>
            <div className="m-w-[50%] text-red-500 truncate ml-2">
              <span className="text-xs">đ</span>
              <span>55.000</span>
            </div>
          </div>
          <div className="flex mt-1 items-center justify-end text-xs">
            <span>5.66k</span>
            <span className="ml-1">Đã bán</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
