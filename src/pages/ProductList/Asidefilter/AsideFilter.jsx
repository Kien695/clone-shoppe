import { createSearchParams, Link, useNavigate } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Rate } from "antd";
import { omit } from "lodash";
export default function AsideFilter({ queryConfig, categories }) {
  const { category } = queryConfig;
  // console.log(category, categories);
  const {
    control,
    handleSubmit,
    setFocus,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price_min: "",
      price_max: "",
    },
  });
  const valueForm = watch();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    if (data.price_min == "") {
      setError("price_min", {
        type: "manual",
        message: "Yêu cầu nhập giá",
      });
      setFocus("price_min");
      return;
    } else if (data.price_max == "") {
      setError("price_max", {
        type: "manual",
        message: "Yêu cầu nhập giá",
      });
      setFocus("price_max");
      return;
    } else if (Number(data.price_max) < Number(data.price_min)) {
      setError("price_max", {
        type: "manual",
        message: "Giá tối đa phải lớn hơn hoặc bằng giá tối thiểu",
      });
      setFocus("price_max");
      return;
    }
    // Xử lý tiếp khi hợp lệ
    else {
      navigate({
        pathname: "",
        search: createSearchParams({
          ...queryConfig,
          price_max: data.price_max * 1000,
          price_min: data.price_min * 1000,
        }).toString(),
      });
    }
  });
  useEffect(() => {
    if (queryConfig.price_min) {
      setValue("price_min", Number(queryConfig.price_min) / 1000);
    }
    if (queryConfig.price_max) {
      setValue("price_max", Number(queryConfig.price_max) / 1000);
    }
  }, [queryConfig.price_min, queryConfig.price_max, setValue]);
  const handleClick = (number) => {
    navigate({
      pathname: "",
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(number),
      }).toString(),
    });
  };
  const handleRemoveAll = () => {
    navigate({
      pathname: "",
      search: createSearchParams(
        omit(queryConfig, [
          "category",
          "price_min",
          "price_max",
          "rating_filter",
        ])
      ).toString(),
    });
  };
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
        <form className="mt-3 " onSubmit={onSubmit}>
          <div className="flex items-start ">
            <Controller
              control={control}
              name="price_min"
              render={({ field }) => {
                return (
                  <input
                    type="number"
                    className="p-3 border border-gray-300 outline-none w-full rounded-sm focus:border-gray-500 focus:shadow-sm"
                    placeholder="k Từ"
                    onChange={field.onChange}
                    value={field.value ?? ""}
                    ref={field.ref}
                  />
                );
              }}
            />

            <div className="mx-2 mt-2 shrink-0">_</div>
            <Controller
              control={control}
              name="price_max"
              render={({ field }) => {
                return (
                  <input
                    type="number"
                    className="p-3 border border-gray-300 outline-none w-full rounded-sm focus:border-gray-500 focus:shadow-sm"
                    placeholder="k Đến"
                    onChange={field.onChange}
                    value={field.value ?? ""}
                    ref={field.ref}
                  />
                );
              }}
            />
          </div>
          {(errors.price_min || errors.price_max) && (
            <div className="text-red-500 text-sm mt-1 text-center">
              {errors.price_min?.message || errors.price_max?.message}
            </div>
          )}
          <Button
            type="submit"
            className="mt-3 flex w-full items-center justify-center bg-red-500 py-2 px-2 text-sm uppercase text-white hover:bg-red-600"
          >
            Áp dụng
          </Button>
        </form>
      </div>
      <div className="h-[1px] bg-gray-300 my-4"></div>
      <div className="my-5">
        <div>Đánh giá</div>
        <div className="flex flex-col my-3">
          <div className="p-1 ">
            <Rate
              style={{ fontSize: 14 }}
              defaultValue={5}
              disabled
              onClick={() => handleClick(5)}
            />
          </div>
          <div className="p-1 flex text-center">
            <Rate
              style={{ fontSize: 14 }}
              defaultValue={4}
              disabled
              onClick={() => handleClick(4)}
            />
            <div className="text-sm ml-2">Trở lên</div>
          </div>
          <div className="p-1 flex text-center">
            <Rate
              style={{ fontSize: 14 }}
              defaultValue={3}
              disabled
              onClick={() => handleClick(3)}
            />
            <div className="text-sm ml-2">Trở lên</div>
          </div>
          <div className="p-1 flex text-center">
            <Rate
              style={{ fontSize: 14 }}
              defaultValue={2}
              disabled
              onClick={() => handleClick(2)}
            />
            <div className="text-sm ml-2">Trở lên</div>
          </div>
          <div className="p-1 flex text-center">
            <Rate
              style={{ fontSize: 14 }}
              defaultValue={1}
              disabled
              onClick={() => handleClick(1)}
            />
            <div className="text-sm ml-2">Trở lên</div>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-gray-300 my-4"></div>
      <div className="my-5">
        <Button
          type="submit"
          className="mt-3 flex w-full items-center justify-center bg-red-500 py-2 px-2 text-sm uppercase text-white hover:bg-red-600"
          onClick={handleRemoveAll}
        >
          Xóa tất cả
        </Button>
      </div>
    </div>
  );
}
