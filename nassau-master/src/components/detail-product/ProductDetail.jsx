import { useCartContext } from "@/context/cartContext";
import { client, urlFor } from "@/lib/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  AiFillExclamationCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";
import { useQuery } from "react-query";
// import ImageShowCase from '@/components/layout/ImageShowCase';
const ImageShowCase = dynamic(() =>
  import("@/components/layout/ImageShowCase")
);
import getStripe from "@/lib/getStripe";
const SingleCartCoupon = dynamic(() =>
  import("@/components/layout/Cart/SingleCartCoupon")
);
import Button from "@/components/layout/Button";

function ProductDetail({ product }) {
  const {
    decQty,
    incQty,
    qty,
    onAdd,
    isCodeValid,
    userData,
    code,
    shippingInfo,
  } = useCartContext();
  const [size, setSize] = useState("");
  const [buyGetFreeData, setBuyGetFreeData] = useState(null);
  const [activeVariant, setActiveVariant] = useState(0);
  // this state take the varients
  const FetchGetFree = async () => {
    if (product.buyGetFree && product.buyGetFree.isGetFree) {
      const query = product.buyGetFree.freeProduct._ref;
      await client.fetch(`*[_type == "product" && _id == "${query}"][0]`, {
        query,
      });
      return data;
    }
    return null;
  };
  const { data, isLoading, isError } = useQuery(
    ["isGetFree", product],
    FetchGetFree,
    {
      refetchOnWindowFocus: false,
      cachTime: 300000,
    }
  );

  useEffect(() => {
    if (!isLoading && !isError) {
      setBuyGetFreeData(data);
    }
    if (product?.sizes) {
      setSize(product.sizes[0]);
    } else {
      setSize("");
    }
  }, [isLoading, isError, product, data]);

  const handelCheckout = async () => {
    toast.loading("Redirecting...");
    let coupon = {};
    if (!!isCodeValid && !!code && !!userData && userData.id) {
      coupon = { ...isCodeValid, code, userId: userData.id };
    }
    let Data = {
      ...product,
      quantity: qty,
      selectedSize: size,
      varient: activeVariant,
    };
    if (product?.buyGetFree) {
      if (product?.buyGetFree.isGetFree) {
        const calcQty =
          (product.buyGetFree.freeQuantity / product.buyGetFree.buyQuantity) *
          qty;

        Data = {
          ...Data,
          freeProduct: {
            ...buyGetFreeData,
            quantity: calcQty,
          },
        };
      }
    }
    try {
      const stripe = await getStripe();
      const response = await fetch(
        "https://nessau-stripe-031v.onrender.com/api/payment_stripe",
        {
          // changes this with url to were you deploy server
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: [Data],
            coupon,
            shippingInfo,
          }),
        }
      );
      if (!response.ok) {
        // Handle the error here
        toast.dismiss();
        const error = await response.json();
        toast.error(error.message, { duration: 20000 });
        return;
      }
      const data = await response.json();
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      toast.dismiss();
      console.log(err);
      toast.error("something went wrong");
    }
  };

  const onAddFc = async () => {
    const Data = { ...product, selectedSize: size, varient: activeVariant };
    if (product?.buyGetFree) {
      if (product.buyGetFree.isGetFree) {
        const calcQty =
          (product.buyGetFree?.freeQuantity / product.buyGetFree.buyQuantity) *
          qty;
        return onAdd(
          {
            ...Data,
            freeProduct: {
              ...buyGetFreeData,
              quantity: calcQty,
            },
          },
          qty,
          true,
          activeVariant
        );
      }
    }

    return onAdd(Data, qty, false, activeVariant);
  };

  return (
    <div className="card rounded-none bg-white sm:card-side w-full mb-12">
      <figure className="max-w-[50%] min-w-[280px] self-center  relative w-full aspect-[.8]">
        <ImageShowCase images={product?.varients[activeVariant].images} />
      </figure>
      <div className="card-body p-4 sm:p-6 flex-col flex gap-y-6 ">
        <p className="flex items-center gap-3 max-h-4">
          <AiFillExclamationCircle className="w-4 h-4 text-yellow-600" />
          <span className="text-xs capitalize">
            zoom In & zoom out with the wheel in the mouse
          </span>
        </p>
        <p className="text-xs sm:text-sm   max-h-4">#Nassau</p>
        <h1 className=" container_title  text-4xl">{product.price}$</h1>
        <h2 className="card-title text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl capitalize">
          {product.title}
        </h2>
        {product?.sizes && (
          <select
            onChange={(e) => setSize(e.target.value)}
            className="select select-primary w-full max-w-[90px]"
          >
            {product.sizes &&
              product.sizes.map((s, i) => (
                <option key={i + "brad"} value={s}>
                  {s}
                </option>
              ))}
          </select>
        )}
        {product.varients.length > 1 && (
          <div className="flex items-center gap-3 flex-wrap">
            {product.varients.map((v, i) => (
              <div
                className=" flex items-center w-fit shadow-md px-4 py-2 border border-solid rounded cursor-pointer"
                key={i + v.hex_color + v.color_name}
                onClick={() => setActiveVariant(i)}
              >
                <div
                  className={`w-2 h-2 rounded-full p-1 md:p-3 shadow-md`}
                  style={{
                    backgroundColor: `${v.hex_color}`,
                  }}
                ></div>
                <p className="text-[10px] sm:text-xs font-bold capitalize ml-2">
                  {v.color_name}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4 mt-1">
          <p onClick={decQty} className=" max-w-fit ">
            <AiFillMinusCircle className=" w-4 h-4 md:w-5 md:h-5 lg:w-8 lg:h-8 cursor-pointer" />
          </p>
          <p className=" max-w-fit text-base md:text-xl lg:text-2xl">{qty}</p>
          <p className=" max-w-fit" onClick={incQty}>
            <AiFillPlusCircle className="w-4 h-4 md:w-5 md:h-5 lg:w-8 lg:h-8 cursor-pointer" />
          </p>
        </div>
        {!!data && (
          <div className=" w-full flex  gap-4 mt-2">
            <img
              src={urlFor(data.varients[0].images[0].asset._ref)}
              alt="free product image"
              className=" object-contain h-[50px] md:h-[90px] xl:h-[130px] rounded"
            />
            <div>
              {!!product.buyGetFree && (
                <p className=" text-[10px] xs:text-xs capitalize md:text-sm xl:text-base">
                  buy {product.buyGetFree.buyQuantity} of the current item and
                  get {product.buyGetFree.freeQuantity}
                </p>
              )}
              <p className="capitalize text-xs xs:text-sm md:text-base xl:text-lg">
                {data.title}
              </p>
            </div>
          </div>
        )}
        <div className=" text-[10px] xs:text-xs md:text-sm xl:text-base capitalize">
          <h4 className="text-sm lg:text-lg capitalize">description:</h4>
          <p className="text-xs lg:text-sm">{product.description}</p>
        </div>
        <div className="couponsEnter">
          <SingleCartCoupon originalPrice={product.price} />
        </div>
        <div className=" flex-col gap-3 flex-grow flex  ">
          <div onClick={handelCheckout} className="  flex">
            <Button
              shouldLoad={true}
              text="Pay Now  $"
              className="h-[48px] font-bold duration-200 max-w-xl"
            />
          </div>
          <div className="flex items-center w-full" onClick={onAddFc}>
            <button className="btn slide duration-300 max-w-xl transition-all ease-linear btn-primary flex items-center gap-2 w-full">
              <span>Add to Cart</span>
              <BsBagCheckFill className="w-4 h-4 mb-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
