export const claimPromo = async (id) => {
  try {
    const use = await fetch(
      `https://nessau-stripe-031v.onrender.com/claim/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await use.json();
  } catch (err) {
    console.log(err.message);
  }
};

export function Discount(discount, price) {
  const typeOfDiscount = discount.type;
  let discountPrice = price;
  switch (typeOfDiscount) {
    case "fixed":
      discountPrice = price - discount.amount;
      break;
    case "percentage":
      const amountAfterApplyDiscount = price * (discount.amount / 100);

      Math.ceil((discountPrice = price - amountAfterApplyDiscount));
      break;
  }
  if (discountPrice < 1) {
    return "FREE";
  }
  return discountPrice;
}

export function PromoCodeValidation(
  CouponsArray,
  BannerPromo,
  userData,
  enterdCode
) {
  let validateCoupon =
    CouponsArray && CouponsArray.filter((e) => e.code === enterdCode);
  const validatePromoCode =
    BannerPromo &&
    BannerPromo[0].code === enterdCode &&
    userData.firstTimePromo;
  if (!!validatePromoCode || !!validateCoupon) {
    const isUsed = userData.used.includes(enterdCode);
    if (!isUsed) {
      let code = {};
      switch (true) {
        case !!validateCoupon.length:
          code.couponCode = enterdCode;
          code.discountInfo = {
            ...validateCoupon[0].discount,
            promoOrCoupon: "coupon",
          };
          break;
        case validatePromoCode:
          code.promoCode = enterdCode;
          code.discountInfo = {
            ...BannerPromo[0],
            promoOrCoupon: "promo",
          };
          break;
        default:
          return "something went wrong please try again ";
          break;
      }
      return code;
    }
    return "this code has been used";
  }
  return "the coupon is not valid or has been used";
}

export async function addToReadyToUse(id, code) {
  try {
    const addToReadyToUse = await fetch(
      `https://nessau-stripe-031v.onrender.com/readyToUse/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ coupon: code }),
      }
    );
    const response = await addToReadyToUse.json();

    return response;
  } catch (err) {
    console.log(err.message);
  }
}
