import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { UserAuth } from "@/context/AuthContext";
import { client } from "@/lib/client";
import { useQuery } from "react-query";
import { Discount } from "@/functions/functions.js";

const cartContext = createContext();
const shopFromLocalStorage =
  typeof window === "object" &&
  JSON.parse(localStorage.getItem("cart") || "[]");
const totalQty =
  typeof window === "object" && localStorage.getItem("total_Qty" || 0);
const TotalP =
  typeof window === "object" && localStorage.getItem("total_Price" || 0);

export default function Context({ children }) {
  const [showCart, setShowCart] = useState(false);
  const { user } = UserAuth();
  const [cartItems, setCartItems] = useState(shopFromLocalStorage);
  const [totalPrice, setTotalPrice] = useState(+TotalP);
  const [totalQuantities, setTotalQuantities] = useState(+totalQty);
  const [qty, setQty] = useState(1);
  const [modal, setModal] = useState(null);
  const [isBanner, setIsBanner] = useState(false);
  const [userData, setUserData] = useState(null);
  const [promo, setPromo] = useState(null);
  const [coupons, setCoupons] = useState(null);
  const [code, setCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [totalPriceAfterCoupon, setTotalPriceAterCoupon] = useState(totalPrice);
  const [isFirstPromoClaimed, setIsFirstPromoClaimed] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(null);

  let foundProduct;
  let index;
  let id = user ? user.uid : null;

  const getPromos = async () => {
    console.log(id, "see the id");
    const shippingTax = await client.fetch(
      '*[_type == "shipping_information"][0]'
    );
    const { shipping_time, shipping_rates } = shippingTax;
    setShippingInfo({ shipping_time, shipping_rates });
    if (id) {
      const checkUser = await fetch(
        `https://nessau-stripe-031v.onrender.com/getUser/${id}`
      );
      const coupons = await client.fetch('*[_type == "coupon"]');
      const promo = await client.fetch('*[_type == "bannerPromo"]');

      const data = {
        userPromos: await checkUser.json(),
        coupons,
        promo,
        shippingTax: { shipping_time, shipping_rates },
      };
      setUserData(data.userPromos);
      setCoupons(data.coupons);
      setPromo(data.promo);

      return data;
    }

    return null;
  };

  const { data } = useQuery(
    ["fetchAllDAata", user, isFirstPromoClaimed],
    getPromos,
    {
      refetchOnWindowFocus: false,
      cachTime: 320000,
      refetchOnMount: false,
    }
  );

  //   console.log(data, "the data user , promo , coupons", shippingInfo);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // console.log({ totalQuantities, totalPrice }, 'out of the fc in effect');
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("total_Qty", +totalQuantities);
      localStorage.setItem("total_Price", +totalPrice);
      if (isCodeValid) {
        setTotalPriceAterCoupon(Discount(isCodeValid, totalPrice));
      }
    }
    if (userData && !!userData.firstTimePromo) {
      setIsBanner(false);
    }
  }, [cartItems, totalPrice, totalQuantities, isCodeValid, userData, user]);
  // console.log(cartItems, 'cartItems');
  const onAdd = (product, quantity, getFree, varient) => {
    const checkProductInCart = cartItems.find(
      (item) =>
        item._id === product._id &&
        item.selectedSize === product.selectedSize &&
        item.varient === product.varient
    );
    let price;
    if (product.onSale && product.onSale.isOnSale) {
      price = product.onSale.salePrice;
    } else {
      price = product.price;
    }

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (
          cartProduct._id === product._id &&
          cartProduct.selectedSize === product.selectedSize &&
          cartProduct.varient === product.varient
        ) {
          if (cartProduct.freeProduct) {
            const qtyFreeP = cartProduct.freeProduct.quantity;
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
              freeProduct: {
                ...cartProduct.freeProduct,
                quantity: qtyFreeP + qtyFreeP,
              },
            };
          } else {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
        }
        return cartProduct;
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    setTotalPrice((prevTotalPrice) => +prevTotalPrice + +price * +quantity);

    toast.success(`${qty} ${product.title} added to the cart.`);
  };
  // console.log({ totalQuantities, totalPrice }, 'out');
  const onRemove = (product) => {
    foundProduct = cartItems.find(
      (item) =>
        item._id === product._id &&
        item.selectedSize === product.selectedSize &&
        item.varient === product.varient
    );
    const newCartItems = cartItems.filter(
      (item) =>
        item._id !== product._id ||
        item.selectedSize !== product.selectedSize ||
        item.varient !== product.varient
    );

    const price =
      product.onSale && product.onSale.isOnSale
        ? product.onSale.salePrice
        : product.price;
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (product, value, hasGetFree = false) => {
    foundProduct = cartItems.find(
      (item) =>
        item._id === product._id &&
        item.selectedSize === product.selectedSize &&
        item.varient === product.varient
    );
    //
    index = cartItems.findIndex(
      (p) =>
        p._id === product._id ||
        p.selectedSize === product.selectedSize ||
        p.varient === product.varient
    );
    // console.log(cartItems, "cartItems");

    const newCartItems = cartItems.filter(
      (item) =>
        item._id !== product._id ||
        item.selectedSize !== product.selectedSize ||
        item.varient !== product.varient
    );

    const price =
      product.onSale && product.onSale.isOnSale
        ? product.onSale.salePrice
        : product.price;
    const { freeProduct } = hasGetFree && foundProduct;

    if (value === "inc") {
      if (freeProduct) {
        const updatedQty = foundProduct.quantity + 1;
        const calcWithQtyChanged =
          (foundProduct.buyGetFree.freeQuantity /
            foundProduct.buyGetFree.buyQuantity) *
          updatedQty;
        setCartItems([
          ...newCartItems,
          {
            ...foundProduct,
            freeProduct: { ...freeProduct, quantity: calcWithQtyChanged },
            quantity: foundProduct.quantity + 1,
          },
        ]);
      } else {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ]);
      }

      setTotalPrice((prevTotalPrice) => prevTotalPrice + price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        if (!freeProduct) {
          setCartItems([
            ...newCartItems,
            { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ]);
        } else {
          const updatedQty = foundProduct.quantity - 1;
          const calcWithQtyChanged =
            (foundProduct.buyGetFree.freeQuantity /
              foundProduct.buyGetFree.buyQuantity) *
            updatedQty;
          setCartItems([
            ...newCartItems,
            {
              ...foundProduct,
              freeProduct: { ...freeProduct, quantity: calcWithQtyChanged },
              quantity: foundProduct.quantity - 1,
            },
          ]);
        }

        setTotalPrice((prevTotalPrice) => prevTotalPrice - price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <cartContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        modal,
        setModal,
        isBanner,
        setIsBanner,
        promo,
        userData,
        coupons,
        totalPriceAfterCoupon,
        setTotalPriceAterCoupon,
        isCodeValid,
        setIsCodeValid,
        code,
        setCode,
        isFirstPromoClaimed,
        shippingInfo,
        setIsFirstPromoClaimed,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export const useCartContext = () => useContext(cartContext);
