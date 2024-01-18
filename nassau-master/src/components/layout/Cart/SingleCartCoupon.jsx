import { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCartContext } from "@/context/cartContext";
import { UserAuth } from "@/context/AuthContext";
import {
  PromoCodeValidation,
  addToReadyToUse,
  Discount,
} from "@/functions/functions.js";
function SingleCartCoupon({ originalPrice }) {
  const { user } = UserAuth();
  const [isClicked, setIsClicked] = useState(false);
  const [code, setCode] = useState();
  const [isCodeValid, setIsCodeValid] = useState();
  const [discountPrice, setDiscountPrice] = useState(originalPrice);

  const { promo, userData, coupons } = useCartContext();

  const [feedback, setFeedback] = useState({
    icon: "add",
    field: true,
    error: "",
    info: "",
  });
  useEffect(() => {
    // console.log("<--- running the useEffect -->");
    if (!!isCodeValid) {
      //  console.log(isCodeValid);
      return setDiscountPrice(Discount(isCodeValid, originalPrice));
    }
  }, [isCodeValid]);

  //  console.log("coupon-->", [code, isCodeValid, discountPrice]);

  if (isClicked && !!!feedback.error) {
    setTimeout(() => {
      setIsClicked(false);
    }, 5000);
  }

  async function validateCoupon() {
    setFeedback((pre) => ({
      ...pre,
      icon: "loading",
      field: false,
      error: "",
    }));
    let response = await PromoCodeValidation(coupons, promo, userData, code);

    if (typeof response === "string") {
      return setFeedback((pre) => ({
        ...pre,
        icon: "error",
        error: response,
        field: true,
      }));
    }

    const msg = await addToReadyToUse(user.uid);
    if (msg.valid) {
      const promoOrCoupon = response.promoCode ? "promo" : "coupon";
      const { discountInfo } = response;

      setFeedback((pre) => ({
        error: "",
        icon: "yes",
        field: false,
        info: `get ${
          promoOrCoupon === "promo"
            ? discountInfo.discountPercentage
            : discountInfo.amount
        }${
          promoOrCoupon === "promo"
            ? "%"
            : discountInfo.type === "amount"
            ? "$"
            : "%"
        } ${
          discountInfo.maxDiscountAmount
            ? `up to ${discountInfo.maxDiscountAmount}$ `
            : ""
        }`,
      }));
      //  console.log("--> reaching the the setting of the isCodeValid");
      setIsCodeValid(discountInfo);
      return;
    }
    return setFeedback((pre) => ({
      ...pre,
      icon: "error",
      error: "please check your conection and try again",
      field: true,
    }));
  }
  function reset() {
    setFeedback({ icon: "add", field: true, error: "", info: "" });
    setCode("");
    setIsCodeValid(null);
    setDiscountPrice(originalPrice);
  }
  return (
    <>
      {!!coupons || !!promo ? (
        <div className='flex gap-2 flex-wrap'>
          <div className='pr-3 relative'>
            <input
              type='text'
              onChange={(e) => setCode(e.target.value)}
              placeholder='Enter coupon here'
              className={`input w-full max-w-[170px] focus:outline-secondary-alt disabled:bg-primary-alt disabled:shadow-md text-sm border border-solid ${
                feedback.error && "border-red-600"
              } input-primary bg-inherit rounded `}
              disabled={!!isCodeValid}
              value={code}
            />
            <TiDeleteOutline
              onClick={reset}
              className={`absolute  ${
                !!isCodeValid ? "block" : "hidden"
              } -top-1 z-10 cursor-pointer right-1 w-5 h-5 text-primary`}
            />
          </div>
          <button
            disabled={!!!code}
            onClick={() => setIsClicked(true)}
            className='cursor-pointer'
          >
            {!!!isCodeValid && !isClicked && (
              <AiOutlinePlusCircle
                onClick={validateCoupon}
                className='w-6 h-6'
              />
            )}
            {feedback.icon === "loading" && (
              <span className='animate-spin block h-6 w-6'>
                <AiOutlineLoading3Quarters className='w-full h-full' />
              </span>
            )}
          </button>
          <span className='w-full capitalize text-xs text-red-600'>
            {feedback.error}
          </span>
          {discountPrice && isCodeValid && (
            <span className='mt-2 text-xs  capitalize'>
              the price after discount: {discountPrice}$
            </span>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SingleCartCoupon;
