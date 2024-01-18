import React from "react";
// import Button from "../Button";
import ProductModalCaller from "@/components/layout/ProductModalCaller";
import { urlFor } from "@/lib/client";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { useCartContext } from "@/context/cartContext";
import Image from "next/image";

function TrendingProduct({ product_data }) {
  const { setModal } = useCartContext();
  return (
    <>
      <article className=" card flex-grow  shadow-xl rounded-2xl overflow-hidden ">
        <figure className="w-full aspect-[.75] relative overflow-hidden group">
          {product_data.onSale && product_data.onSale.isOnSale && (
            <p className=" absolute top-12 text-black right-0 w-fit h-fit z-10 px-2 py-1 lg:px-4 lg:p-2">
              <TbShoppingCartDiscount className="w-7 h-7" />
            </p>
          )}
          <Image
            src={`${urlFor(product_data.varients[0].images[0].asset._ref)}`}
            alt="product image"
            fill
            sizes="360px"
            className="object-cover"
          />
          <div
            onClick={() => setModal(product_data)}
            className={`absolute bottom-3 xl:-bottom-14 transition-all ease-linear hover:bottom-3 duration-500 group-hover:bottom-3 left-0 translate-x-1/2 text-primary p-2 lg:p-3 cursor-pointer bg-white rounded-full shadow-xl `}
          >
            <ProductModalCaller />
          </div>
        </figure>
        <div className="info   bg-base-100 flex flex-col gap-4 card-body p-6">
          <p
            className=" capitalize  text-xs text-gray-950"
            title={product_data.title}
          >
            {product_data.title.length > 25
              ? `${product_data.title.slice(0, 25)}...`
              : product_data.title}
          </p>
          <p>
            <span
              className={`${
                product_data.onSale &&
                product_data.onSale.isOnSale &&
                "text-[10px] line-through text-gray-600"
              }`}
            >
              ${product_data.price}
              <span
                className={`${
                  product_data.onSale &&
                  product_data.onSale.isOnSale &&
                  "hidden"
                } text-xs ml-1 `}
              >
                CAD
              </span>
            </span>
            {product_data.onSale && product_data.onSale.isOnSale && (
              <span className="ml-2 text-xs ">
                ${product_data.onSale.salePrice} CAD
              </span>
            )}
          </p>{" "}
          {/*    <div onClick={() => setModal(product_data)}>
            <Button
              text="choose options"
              shouldLoad={true}
              className="h-[50px]"
              short={true}
            />
          </div>*/}
        </div>
      </article>
    </>
  );
}

export default TrendingProduct;
