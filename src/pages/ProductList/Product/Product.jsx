import { Link } from "react-router-dom";
import {
  formatCurrenCy,
  formatNumberToSocialStyle,
} from "../../../utils/until";
import { Rate } from "antd";

export default function Product({ product }) {
  return (
    <Link to="">
      <div className="bg-white shadow rounded-sm hover:translate-y-[-0.05rem] hover:shadow-md duration-100 transition-transform overflow-hidden relative">
        <div className="absolute top-0 right-0 bg-pink-200/80 z-10 text-xs py-0.5 px-1 text-orange-500">
          -50%
        </div>
        <div className="w-full pt-[100%] relative">
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover bg-white"
          />
        </div>
        <div className="p-2 overflow-hidden">
          <div className="min-h-[2rem] line-clamp-2 text-xs">
            {product.name}
          </div>
          <button className=" mt-1 h-4 border border-orange-500 text-orange-500 rounded-sm py-0.5 px-1 flex text-[0.645rem] align-center">
            Rẻ vô địch
          </button>
          <div className="flex items-center mt-2 ">
            <div className="line-through m-w-[50%] text-gray-500 truncate">
              <span className="text-xs">đ</span>
              <span>{formatCurrenCy(product.price_before_discount)}</span>
            </div>
            <div className="m-w-[50%] text-red-500 truncate ml-2">
              <span className="text-xs">đ</span>
              <span>{formatCurrenCy(product.price)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Rate
              style={{ fontSize: 10 }}
              allowHalf
              defaultValue={product.rating}
            />
            <div className="flex mt-1 items-center justify-end text-xs">
              <span>Đã bán</span>
              <span className="ml-1">
                {formatNumberToSocialStyle(product.sold)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
