import { useState, useEffect } from "react";
import { urlFor, client } from "@/lib/client";
import getStripe from "@/lib/getStripe";
import { useQuery } from "react-query";
import { useCartContext } from "@/context/cartContext";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";
import { m } from "framer-motion";
import LazyMotions from "@/components/LazyMotions";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Button from "@/components/layout/Button";
import ImageShowCase from "@/components/layout/ImageShowCase";
const ProductModal = ({ modal }) => {
  const {
    decQty,
    incQty,
    qty,
    onAdd,
    setModal,
    shippingInfo,
    code,
    isCodeValid,
    userData,
  } = useCartContext();
  const [size, setSize] = useState("");
  const [buyGetFreeData, setBuyGetFreeData] = useState(null);
  const [activeVariant, setActiveVariant] = useState(0);
  // this state take the varients
  const FetchGetFree = async () => {
    if (modal.buyGetFree && modal.buyGetFree.isGetFree) {
      const query = modal.buyGetFree.freeProduct._ref;
      const data = await client.fetch(
        `*[_type == "product" && _id == "${query}"][0]`,
        { query }
      );
      return data;
    }
    return null;
  };
  const { data, isLoading, isError } = useQuery(
    ["isGetFree", modal],
    FetchGetFree,
    {
      refetchOnWindowFocus: false,
      cachTime: 300000,
    }
  );

  useEffect(() => {
    if ((!isLoading, !isError)) {
      setBuyGetFreeData(data);
    }
    if (modal.sizes) {
      setSize(modal.sizes[0]);
    } else {
      setSize("");
    }
  }, [isLoading, isError, modal]);

  const handelCheckout = async () => {
    toast.loading("Redirecting...");
    let coupon = {};
    if ((!!isCodeValid, !!code, !!userData && userData.id)) {
      coupon = { ...isCodeValid, code, userId: userData.id };
    }
    let Data = {
      ...modal,
      quantity: qty,
      selectedSize: size,
      varient: activeVariant,
    };
    if (modal.buyGetFree) {
      if (modal.buyGetFree.isGetFree) {
        const calcQty =
          (modal.buyGetFree.freeQuantity / modal.buyGetFree.buyQuantity) * qty;

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
      // console.log(shippingInfo, "shipping info");
      const stripe = await getStripe();
      const response = await fetch(
        "https://nessau-stripe-031v.onrender.com/api/payment_stripe",
        {
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
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      toast.dismiss();
      return toast.error("something went wrong");
    }
  };

  const onAddFc = async () => {
    setModal(null);
    const Data = { ...modal, selectedSize: size, varient: activeVariant };
    if (modal.buyGetFree) {
      if (modal.buyGetFree.isGetFree) {
        const calcQty =
          (modal.buyGetFree.freeQuantity / modal.buyGetFree.buyQuantity) * qty;
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

  // images

  return (
    <LazyMotions>
      {modal && (
        <m.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.3,
            type: "spring",
          }}
          exit={{ opacity: 0 }}
          className={`z-[1000] duration-500 ease-in-out transition-all`}
        >
          <div className="card  sm:card-side bg-base-100 flex items-center justify-center flex-col sm:flex-row ">
            <figure className="min-w-[80px] relative w-full max-w-[300px] aspect-[.9] sm:max-w-[250px] md:max-w-[300px] ">
              <ImageShowCase images={modal.varients[activeVariant].images} />
            </figure>
            <div className="card-body p-4 flex-grow">
              <h1 className=" text-[10px] md:text-sm text-gray-700">#Nassau</h1>
              <h2 className="md:card-title text-base font-bold capitalize">
                {modal.title}
              </h2>
              <p className="max-h-[30px]">
                <span
                  className={`${
                    modal.onSale &&
                    modal.onSale.isOnSale &&
                    "text-[10px] line-through text-gray-600"
                  }`}
                >
                  ${modal.price}
                  <span
                    className={`${
                      modal.onSale && modal.onSale.isOnSale && "hidden"
                    } text-xs sm:text-sm md:text-base`}
                  >
                    <span className="ml-[2px]">CAD</span>
                  </span>
                </span>
                {modal.onSale && modal.onSale.isOnSale && (
                  <span className="ml-2 text-xs sm:text-sm md:text-base">
                    ${modal.onSale.salePrice}
                  </span>
                )}
              </p>
              <div className="flex items-center gap-4 mt-1">
                <p onClick={decQty} className=" max-w-fit ">
                  <AiFillMinusCircle className=" w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                </p>
                <p className=" max-w-fit text-base md:text-xl">{qty}</p>
                <p className=" max-w-fit" onClick={incQty}>
                  <AiFillPlusCircle className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                </p>
              </div>
              {modal.sizes && (
                <select
                  className="select-primary select text-start border-2 border-solid border-primary py-1 mt-1 w-full max-w-[90px] capitalize"
                  onChange={(e) => setSize(e.target.value)}
                >
                  {modal.sizes.map((s, i) => (
                    <option
                      key={i + 12121 + "rllr"}
                      className=" capitalize"
                      value={s}
                    >
                      {s}
                    </option>
                  ))}
                </select>
              )}
              {modal.varients.length > 1 && (
                <div className=" flex items-center flex-wrap gap-3  cursor-pointer">
                  {modal.varients.map((v, i) => (
                    <div
                      className=" flex items-center w-fit px-4 py-2 border border-solid rounded"
                      key={i + v.hex_color + v.color_name}
                      onClick={() => setActiveVariant(i)}
                    >
                      <div
                        className={`w-2 h-2 rounded-full p-1 sm:p-3 shadow-md`}
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
              {!!data && (
                <div className=" w-full flex items-center gap-4 mt-2">
                  <img
                    src={urlFor(data.varients[0].images[0].asset._ref)}
                    alt="free product image"
                    className=" object-contain h-[50px] rounded"
                  />
                  <div>
                    {!!modal.buyGetFree && (
                      <p className=" text-[10px] xs:text-xs">
                        buy {modal.buyGetFree.buyQuantity} from this item and
                        get {modal.buyGetFree.freeQuantity}{" "}
                      </p>
                    )}
                    <p className=" text-xs xs:text-sm">{data.title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="card-actions mt-4 flex items-center gap-2">
            <div
              className="w-full flex justify-center"
              onClick={handelCheckout}
            >
              <Button
                className=" btn btn-primary w-full max-w-xl h-[35px] text-xs slide border-0 duration-500 ease-linear cursor-pointer"
                text="Buy Now $"
                shouldLoad={true}
              />
            </div>

            <button
              onClick={onAddFc}
              className=" btn btn-primary w-full mx-auto max-w-xl h-[35px] text-xs slide border-0 duration-500 ease-linear cursor-pointer"
            >
              add to cart
              <span>
                <BsBagCheckFill className="w-4 h-4 mb-1 ml-1" />
              </span>
            </button>
          </div>
          <div className=" max-w-xl mx-auto flex items-center justify-center mt-2">
            <Link
              href={`/detail/${modal._id}?name=${modal.title}`}
              onClick={() => setModal(null)}
              className="capitalize text-xs"
            >
              {` >> `} view more {` >> `}
            </Link>
          </div>
        </m.section>
      )}
    </LazyMotions>
  );
};

export default ProductModal;
