import { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useCartContext } from "../context/cartContext";
import { runFireworks } from "../lib/utlis";

function Success() {
 const { setCartItems, setTotalPrice, setTotalQuantities } = useCartContext();
 useEffect(() => {
  localStorage.clear();
  setCartItems([]);
  setTotalPrice(0);
  setTotalQuantities(0);
  runFireworks();
 }, []);
 return (
  <div className="success-wrapper w-screen h-screen">
   <div className="success w-screen h-screen flex flex-col gap-6 items-center justify-center">
    <p className="icon text-green-600 w-10 h-10">
     <BsBagCheckFill className="w-full h-full" />
    </p>
    <h2 className="text-3xl" style={{ padding: "20px 0px" }}>Thank you for your order!</h2>
    <Link href="/">
     <button type="button" width="300px" className="btn">
      Continue Shopping
     </button>
    </Link>
   </div>
  </div>
 );
}

export default Success;
