import { useQuery } from "@tanstack/react-query";
import AsideFilter from "./Asidefilter";
import Product from "./Product/Product";
import SortProduct from "./SortProduct";

import { getProduct } from "../../apis/product.api";
import useQueryParams from "../../hooks/useQueryParams";
import Pagination from "../../Components/Pagination";
import { useState } from "react";
import { isUndefined, omitBy } from "lodash";
import { getCategory } from "../../apis/category";

export default function ProductList() {
  const queryPrams = useQueryParams();
  const queryConfig = omitBy(
    {
      page: queryPrams.page || "1",
      limit: queryPrams.limit,
      sort_by: queryPrams.sort_by,
      exclude: queryPrams.exclude,
      name: queryPrams.name,
      order: queryPrams.order,
      price_max: queryPrams.price_max,
      price_min: queryPrams.price_min,
      rate_filter: queryPrams.rate_filter,
      category: queryPrams.category,
    },
    isUndefined
  );
  const [page, setPage] = useState(1);

  const { data: productData } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => {
      return getProduct(queryConfig);
    },
    keepPreviousData: true,
  });
  // console.log(data);
  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return getCategory();
    },
  });

  return (
    <div className="bg-gray-200 py-6">
      <div className="container mx-auto px-4">
        {productData && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-2">
              <AsideFilter
                queryConfig={queryConfig}
                categories={categoryData?.data.data || []}
              />
            </div>
            <div className="col-span-10">
              <SortProduct
                queryConfig={queryConfig}
                pageSize={productData.data.data.pagination.page_size}
              />
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {productData.data.data.products.map((product) => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination
                queryConfig={queryConfig}
                pageSize={productData.data.data.pagination.page_size}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
