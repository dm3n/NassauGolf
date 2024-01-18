// import React from "react";
// import Breadcrumb from "../layout/Breadcrumb";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";
import { useState } from "react";
import { RiTShirtLine } from "react-icons/ri";
import { BiSearchAlt2 } from "react-icons/bi";
import {client } from "@/lib/client"
const ProductCard = dynamic(() =>
  import("@/components/layout/products/ProductCard")
);
const sizes = [
  { title: "extra Small", value: "XS" },
  { title: "Small", value: "SM" },
  { title: "Medium", value: "M" },
  { title: "Large", value: "L" },
  { title: "Extra Large", value: "XL" },
  { title: "Double Extra Large", value: "XXL" },
];

function ProductsContainer({ products, categories }) {
  const [onSale, setOnSale] = useState(false);
  const [category, setCategory] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [startSearch, setStartSearch] = useState("");
  const [sizesCheked, setSizesCheked] = useState([]);
  const [priceMinMax, setPriceMinMax] = useState({
    min: 0,
    max: 1000000,
  });
  const GetData = async () => {
    const QueryFc = () => {
      const q = sizesCheked.map(
        (query, i) =>
          `"${query}" in sizes ${i + 1 !== sizesCheked.length ? "|| " : ""}`
      );
      return q.join("");
    };
    const categoryQuery = category ? " && category._ref == $category" : "";
    const onSaleQuery = onSale ? " && onSale.isOnSale == true" : "";
    const sizeQuery = sizesCheked.length > 0 ? ` && (${QueryFc()})` : "";
    const { min, max } = priceMinMax;
    const searchQuery = startSearch ? " && title match $searchStr " : "";
    const data = await client.fetch(
      `*[_type in ["product", "trending"]${categoryQuery} && price >= $min && price <= $max${onSaleQuery}${searchQuery}${sizeQuery}][0...30]`,
      { category, onSale, searchStr, sizesCheked, min, max }
    );
    console.log(data, sizeQuery, "the data query");
    return data;
  };
  const { data, isLoading, isError } = useQuery(
    ["getProducts", category, onSale, priceMinMax, sizesCheked, startSearch],
    GetData,
    {
      refetchOnWindowFocus: false,
      cachTime: 300000,
      refetchOnMount: false,
      initialData: products,
    }
  );
  const FcSizes = (e) => {
    const findSize = sizesCheked.find((size) => size === e.target.value);
    if (findSize) {
      const removeSize = sizesCheked.filter((size) => size !== e.target.value);
      setSizesCheked(removeSize);
    } else {
      setSizesCheked((pre) => [...pre, e.target.value]);
    }
  };

  return (
    <>
      <section className="mt-[150px]">
        <h3 className="container_title uppercase flex justify-center flex-wrap items-center gap-2 text-center text-3xl xs:text-4xl mb-16">
          <span>Products</span>
          <RiTShirtLine className="w-8 mb-[3px] h-8" />
        </h3>

        <div className="search flex items-center gap-3 gap-y-6 justify-between  flex-wrap">
          <div className=" flex items-center gap-4  flex-wrap">
            <select
              className="select-primary focus:outline-secondary-alt select border-2 border-solid border-primary py-1 px-8 w-full max-w-fit capitalize"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={""}>All</option>
              {categories.map((ct, i) => (
                <option
                  key={i + 12121 + "rr"}
                  className=" capitalize "
                  value={ct._id}
                >
                  {ct.category_name}
                </option>
              ))}
            </select>
            <div className="w-fit whitespace-nowrap flex items-center gap-3 btn">
              <label htmlFor="Sale" className="capitalize">
                on Sale only
              </label>
              <input
                id="Sale"
                type="checkbox"
                className="toggle toggle-secondary checked:border-solid checked:border-secondary-alt checked:bg-secondary-alt"
                checked={onSale}
                onChange={() => setOnSale((pre) => !pre)}
              />
            </div>
            <div className="range-search flex items-center ">
              <input
                type="number"
                min={"0"}
                max={"1000000"}
                placeholder="min"
                className="input w-full max-w-[90px] focus:outline-secondary-alt rounded-lg border border-solid border-black input-primary rounded-sm "
                onChange={(e) =>
                  setPriceMinMax((pre) => ({
                    ...pre,
                    min: +e.target.value,
                  }))
                }
              />
              <div className="h-1 max-w-[15px] w-full bg-black"></div>
              <input
                type="number"
                min={"5"}
                max={"1000000"}
                placeholder="max"
                className="input w-full max-w-[90px] focus:outline-secondary-alt rounded-lg border border-solid border-black input-primary rounded-sm  "
                onChange={(e) =>
                  setPriceMinMax((pre) => ({
                    ...pre,
                    max: e.target.value ? +e.target.value : 1000000,
                  }))
                }
              />
            </div>
          </div>
          <div className=" flex items-center gap-2 self-end ">
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs focus:outline-secondary-alt border border-solid border-black input-primary rounded-sm "
              onChange={(e) => setSearchStr(`${e.target.value}*`)}
            />
            <BiSearchAlt2
              className="w-7 h-7 cursor-pointer"
              onClick={() => setStartSearch(searchStr)}
            />
          </div>

          {(products[0].sizes || products[1].sizes || products[2].sizes) && (
            <div className="sizes w-full mb-12 flex items-center gap-y-2 gap-3 flex-wrap">
              <p className="w-full capitalize">choose Size:</p>
              {sizes.map((size) => (
                <div className="form-control" key={size.value + size.title}>
                  <label className="label cursor-pointer flex items-center gap-2">
                    <span className="label-text uppercase">{size.value}</span>
                    <input
                      type="checkbox"
                      checked={sizes.find((size) => size === size.value)}
                      className={`checkbox checked:outline-secondary-alt  border-2 checkbox-accent`}
                      value={size.value}
                      onClick={FcSizes}
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <main className="relative grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 items-center justify-center gap-1 xs:gap-2 lg:gap-3 xl:gap-8 flex-wrap mb-32">
          {!isLoading &&
            !isError &&
            data &&
            data.map((p, i) => (
              <div key={p.title + i} className="w-full h-full">
                <ProductCard product_data={p} />
              </div>
            ))}
        </main>
      </section>
    </>
  );
}

export default ProductsContainer;
