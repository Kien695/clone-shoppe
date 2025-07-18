import { useQuery } from "@tanstack/react-query";
import AsideFilter from "./Asidefilter";
import Product from "./Product/Product";
import SortProduct from "./SortProduct";

import { getProduct } from "../../apis/product.api";
import useQueryParams from "../../hooks/useQueryParams";

export default function ProductList() {
  const queryPrams = useQueryParams();
  const { data } = useQuery({
    queryKey: ["products", queryPrams],
    queryFn: () => {
      return getProduct(queryPrams);
    },
  });
  console.log(data);
  return (
    <div className="bg-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2">
            <AsideFilter />
          </div>
          <div className="col-span-10">
            <SortProduct />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {data &&
                data.data.data.products.map((product) => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
