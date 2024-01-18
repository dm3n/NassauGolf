import React, { useState } from "react";
// import Button from '../Button';
import ProductModalCaller from "@/components/layout/ProductModalCaller";
import { urlFor } from "@/lib/client";
import HoverImageShowCase from "@/components/layout/HoverImageShowCase";
import { useCartContext } from "@/context/cartContext";
import { TbShoppingCartDiscount } from "react-icons/tb";

function ProductCard({ product_data }) {
  // const [isClicked, setIsClicked] = useState(false);
  const { setModal } = useCartContext();
  // if (isClicked) {
  //   setTimeout(() => {
  //     setIsClicked(false);
  //   }, 500);
  // }
  // const BtnClicked = () => {
  //   setIsClicked(true);
  //   setModal(product_data);
  // };
  return (
    <div className='card  bg-base-100 shadow-xl rounded-2xl overflow-hidden relative'>
      <figure className=' aspect-[.75] relative w-full group'>
        {product_data.onSale && product_data.onSale.isOnSale && (
          <p className=' absolute top-4 text-black right-3 w-fit h-fit z-10 px-2 py-1 lg:px-4 lg:p-2'>
            <TbShoppingCartDiscount className='w-7 h-7' />
          </p>
        )}
        {product_data.varients.length > 1 ? (
          <HoverImageShowCase
            variants={{
              main_image: product_data.varients[0].images[0],
              alt_image: product_data.varients[1].images[0],
            }}
          />
        ) : (
          <img
            src={urlFor(product_data.varients[0].images[0].asset._ref).url()}
            alt='product image'
            className=' absolute top-0 left-0 w-full h-full object-cover'
          />
        )}
        <div
          onClick={() => setModal(product_data)}
          className={`absolute bottom-3 xl:-bottom-14 transition-all ease-linear hover:bottom-3 duration-500 group-hover:bottom-3 left-0 translate-x-1/2 text-primary p-2 lg:p-3 cursor-pointer bg-white rounded-full shadow-xl `}
        >
          <ProductModalCaller />
        </div>
      </figure>

      <div className='info  bg-base-100 flex flex-col gap-4 card-body p-6'>
        <p
          className=' capitalize  text-xs text-gray-950'
          title={product_data.title}
        >
          {product_data.title.length > 25
            ? `${product_data.title.slice(0, 25)}...`
            : product_data.title}
        </p>
        <p>
          <span
            className={`${
              product_data?.onSale &&
              product_data?.onSale.isOnSale &&
              "text-[10px] line-through text-gray-600"
            }`}
          >
            ${product_data.price}
            <span
              className={`${
                product_data.onSale && product_data.onSale.isOnSale && "hidden"
              } text-xs ml-1 `}
            >
              CAD
            </span>
          </span>
          {product_data?.onSale && product_data.onSale.isOnSale && (
            <span className='ml-2 text-xs '>
              ${product_data.onSale.salePrice} CAD
            </span>
          )}
        </p>

        {/*  <button
          onClick={BtnClicked}
          className={` h-fit btn-primary border-0 p-3 md:py-4 md:px-6 font-normal w-full capitalize duration-500 ease-linear transition-all slide text-[10px] xs:text-xs sm:text-sm md:text-base ${
            isClicked && 'loading'
          }`}
          disabled={isClicked}
        >
          choose options
        </button>*/}
      </div>
    </div>
  );
}

export default ProductCard;
