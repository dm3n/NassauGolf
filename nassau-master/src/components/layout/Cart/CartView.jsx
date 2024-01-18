import dynamic from "next/dynamic";
import Image from "next/image";
import {
  AiOutlineLeft,
  AiOutlineShopping,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { useRouter } from "next/router";
import CartCoupon from "./CartCoupon";
import { m } from "framer-motion";
const LazyMotions = dynamic(() => import("@/components/LazyMotions"));
import { TiDeleteOutline } from "react-icons/ti";
import getStripe from "@/lib/getStripe";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Button from "../Button";
import { urlFor } from "@/lib/client";
import { useCartContext } from "@/context/cartContext";
import { UserAuth } from "@/context/AuthContext";

function CartView() {
  const { user } = UserAuth();
  const {
    totalQuantities,
    cartItems,
    onRemove,
    totalPrice,
    toggleCartItemQuanitity,
    setShowCart,
    showCart,
    isCodeValid,
    totalPriceAfterCoupon,
    code,
    userData,
    shippingInfo,
  } = useCartContext();
  const { asPath } = useRouter();

  const handelCheckout = async () => {
    setShowCart(false);
    toast.loading("Redirecting...");
    let coupon = {};
    if ((!!isCodeValid, !!code, !!userData && userData.id)) {
      coupon = { ...isCodeValid, code, userId: userData.id };
    }
    try {
      const stripePromise = getStripe();
      const responsePromise = fetch(
        "https://nessau-stripe-031v.onrender.com/api/payment_stripe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            coupon,
            shippingInfo,
          }),
        }
      );
      const [stripe, response] = await Promise.all([
        stripePromise,
        responsePromise,
      ]);
      if (!response.ok) {
        // Handle the error here
        toast.dismiss();
        const error = await response.json();
        toast.error(error.message);
        return;
      }
      setShowCart(false);

      const data = await response.json();
      console.log("----- this is data ----");
      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      toast.dismiss();
      console.log(error.raw.message);
      return toast.error(error.raw.message);
    }
    setTimeout(() => {
      // Todo...
      toast.custom(
        <div className="text-orange-600 text-xs px-2 py-3 shadow-lg">
          checkout take more time due to slow connection
        </div>,
        {
          duration: 6000,
          position: "top-center",
        }
      );
    }, 6000);
  };

  const ToggelQtyFc = (item, method) => {
    if (item.freeProduct) {
      return toggleCartItemQuanitity(item, method, true);
    }
    return toggleCartItemQuanitity(item, method);
  };

  return (
    <LazyMotions>
      {showCart && (
        <div className=" fixed w-screen h-screen top-0 flex mx-auto items-center justify-center left-0 z-[90000]">
          <div
            className="absolute top-0 left-0 w-full h-full bg-gray-500 opacity-60"
            onClick={() => setShowCart(false)}
          ></div>

          <m.div className="bg-slate-200 min-w-[270px] w-full max-w-[480px]  rounded-xl px-5 py-6 aspect-[.75] z-[900000] py-4">
            <button
              type="button"
              className=" flex items-center gap-2 py-2 cursor-pointer"
              onClick={() => setShowCart(false)}
            >
              <AiOutlineLeft />
              <span className="">Your Cart</span>
              <span className="">({totalQuantities} items)</span>
            </button>

            {cartItems.length < 1 && (
              <m.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  type: "spring",
                }}
                exit={{ opacity: 0 }}
                className=" flex items-center justify-center  flex-col mt-16 gap-4"
              >
                <AiOutlineShopping className=" w-20 h-20 xs:w-32 xs:w-32" />
                <h3>Your shopping bag is empty</h3>
                <Link href={`${asPath}`}>
                  <button
                    type="button"
                    onClick={() => setShowCart(false)}
                    className="btn btn-primary slide duration-500 ease-linear transition-colors font-normal "
                  >
                    Continue Shopping
                  </button>
                </Link>
              </m.div>
            )}

            <div
              className={`py-6 h-[80%] style-2 w-full scrollbar px-3 flex flex-col gap-3 overflow-y-scroll overflow-x-hidden ${
                !!!cartItems.length && "hidden"
              }`}
            >
              {!!cartItems.length &&
                cartItems.map((item, i) => (
                  <m.div
                    key={i + "uuuguhguhuhuhuhh"}
                    className=""
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                      duration: 0.3,
                      type: "spring",
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-3">
                      {item && (
                        <div className="min-w-[80px] aspect-[.75] relative w-full max-w-[120px]">
                          <Image
                            src={urlFor(
                              item?.varients[item.varient].images[0].asset._ref
                            ).url()}
                            style={{
                              width: "100%",
                            }}
                            alt="product"
                            fill
                            sizes="120px"
                            onClick={() => setShowCart(false)}
                            className="rounded-xl object-cover"
                          />
                        </div>
                      )}
                      <div className="w-full">
                        <div className="text-xs md:text-base xl:text-base">
                          <div className="title_size mt-2">
                            <h5 className="">{item.title}</h5>
                            {item.selectedSize && (
                              <p className="mt-1">
                                <>size: </> <span>{item.selectedSize}</span>
                              </p>
                            )}
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <h4
                              className={`${
                                item.onSale &&
                                item.onSale.isOnSale &&
                                "line-through text-[10px]"
                              }`}
                            >
                              {item && `$${item.price} CAD`}
                            </h4>
                            <p className="text-xs md:text-base xl:text-base">
                              {item.onSale &&
                                item.onSale.isOnSale &&
                                `$${item.onSale.salePrice} CAD`}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="">
                            <p className="flex gap-3 items-center">
                              <span
                                className=""
                                onClick={() => ToggelQtyFc(item, "dec")}
                              >
                                <AiFillMinusCircle className="cursor-pointer w-4 h-4 md:w-6 md:h-6" />
                              </span>
                              <span className=" md:text-lg">
                                {item && item.quantity}
                              </span>
                              <span
                                className=""
                                onClick={() => ToggelQtyFc(item, "inc")}
                              >
                                <AiFillPlusCircle className=" cursor-pointer w-4 h-4 md:w-6 md:h-6" />
                              </span>
                            </p>
                          </div>
                          <button
                            type="button"
                            className=""
                            onClick={() => onRemove(item)}
                          >
                            <TiDeleteOutline className="w-4 h-4 md:w-6 md:h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {item.freeProduct && item.freeProduct.quantity >= 1 && (
                      <div className="text-[10px] md:text-xs xl:text-sm flex items-center gap-3 mt-2">
                        <div className="relative w-full aspect-[.85] max-w-[40px]">
                          {!!item.freeProduct.image && (
                            <Image
                              src={urlFor(
                                item?.freeProduct?.image[0].asset._ref
                              ).url()}
                              alt={item.freeProduct.title}
                              fill
                              sizes="40px"
                              className="absolute top-0 left-0 w-full h-full rounded-xl"
                            />
                          )}
                        </div>

                        <div className="text-[10px] md:text-xs xl:text-sm flex items-center gap-2 bg-black px-3 py-1 text-white rounded">
                          <span className="text-[10px] line-through text-gray-300">
                            ${item.freeProduct.price} CAD
                          </span>
                          <span className="now_its ">FREE</span>
                        </div>
                        <p className="text-[10px] md:text-xs xl:text-sm p-1 rounded-full bg-black text-white">
                          +{Math.floor(item.freeProduct.quantity)}
                        </p>
                      </div>
                    )}
                  </m.div>
                ))}
            </div>
            {!!cartItems.length && (
              <>
                {user ? <CartCoupon /> : <></>}
                <div>
                  <div className="flex items-center  flex-wrap justify-between py-2">
                    <h3>Subtotal:</h3>
                    <h3>${totalPrice}</h3>
                    {isCodeValid ? (
                      <span className="w-full capitalize text-end text-xs">
                        after applying coupon : ${totalPriceAfterCoupon}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div onClick={handelCheckout}>
                    <Button
                      text="PAY NOW $"
                      shouldLoad={true}
                      className=" uppercase font-bold"
                    />
                  </div>
                </div>
              </>
            )}
          </m.div>
        </div>
      )}
    </LazyMotions>
  );
}

export default CartView;
