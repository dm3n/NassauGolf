//66577539

import { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { TbHandFinger } from "react-icons/tb";
import { RiCoupon2Line, RiClipboardLine } from "react-icons/ri";
import { GiPartyPopper } from "react-icons/gi";
import { toast } from "react-hot-toast";
import { claimPromo } from "@/functions/functions.js";
import { useCartContext } from "@/context/cartContext";
import { m } from "framer-motion";

function Banner({ setIsBanner, banner }) {
  const { user } = UserAuth();
  const { userData, isFirstPromoClaimed, setIsFirstPromoClaimed } =
    useCartContext();

  const [finger, setFinger] = useState(0);

  const copy = async () => {
    await navigator.clipboard.writeText(banner.code);
    toast.success("Text copied");
  };
  async function claimCode() {
    setIsFirstPromoClaimed(true);
    setIsBanner(false);
    await claimPromo(user.uid);
  }

  useEffect(() => {
    if (user && userData && userData.isFirstPromoClaimed) {
      setIsFirstPromoClaimed(true);
    }
  }, [userData, isFirstPromoClaimed, user]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed top-0 z-[9000] left-0 h-screen w-screen flex items-center justify-center'
    >
      <div
        className='absolute top-0 left-0 -z-[10] w-full h-full opacity-60 bg-gray-900'
        onClick={() => setIsBanner(false)}
      ></div>

      <div className='aspect-[.9] min-w-[280px] overflow-hidden w-[90%] relative max-w-sm bg-primary text-white rounded-2xl'>
        <AiOutlineCloseSquare
          className='absolute top-2 right-2 w-7 h-7 cursor-pointer'
          onClick={() => setIsBanner(false)}
          title='close'
        />
        <div className='flex gap-2 items-center flex-col justify-center h-full'>
          <h2 className='text-center text-2xl md:text-4xl gap-3 lg:text-5xl tracking-tighter font-bold flex  items-center'>
            <m.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
            >
              Get
            </m.span>
            <m.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              exit={{ x: 10000 }}
              className=''
            >
              {banner.type === "fixed"
                ? `${banner.amount}$`
                : `${banner.amount}%`}{" "}
              Off
            </m.span>
          </h2>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring" }}
            exit={{ opacity: 0 }}
            className='space-x-2 w-full text-center py-2 lg:py-0 flex flex-col items-center gap-8 justify-center'
          >
            <div className='flex items-center flex-col gap-1'>
              <span className=' capitalize text-xs md:text-base lg:text-lg'>
                Use code
              </span>

              <span
                className=' w-7 h-7 block mt-1 -rotate-180'
                onMouseOver={() => setFinger(1)}
              >
                {!finger && (
                  <TbHandFinger className=' cursor-pointer animate-bounce duration-1000 ease-in-out w-full h-full ' />
                )}
              </span>
            </div>
            <div className='flex relative justify-center gap-3 w-full'>
              <span
                className='w-6 h-6 absolute top-0 left-[60px]  block mt-1 rotate-90'
                onMouseOver={() => setFinger(0)}
              >
                {finger === 2 && (
                  <TbHandFinger className='cursor-pointer animate-bounce duration-1000 ease-in-out w-full h-full ' />
                )}
              </span>
              <span
                onClick={copy}
                className='font-bold cursor-pointer  bg-white text-primary rounded-sm px-4 py-2 flex gap-3 items-center justify-center text-base md:text-lg lg:text-xl'
              >
                {banner.code}
                <RiClipboardLine
                  className='w-5 h-5 cursor-pointer'
                  title='copy to clipboard'
                />
              </span>
              <span
                className='w-6 h-6 absolute top-0 right-[60px]  block mt-1 -rotate-90'
                onMouseOver={() => setFinger(2)}
              >
                {finger === 1 && (
                  <TbHandFinger className='cursor-pointer animate-bounce duration-1000 ease-in-out w-full h-full ' />
                )}
              </span>
            </div>
          </m.div>

          {!isFirstPromoClaimed ? (
            <m.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring" }}
              exit={{ opacity: 0 }}
              className='p-3 min-w-[120px] flex gap-3 items-center border border-solid justify-center hover:border-secondary-alt  border-white slide duration-500 transition-all ease-linear '
              onClick={claimCode}
            >
              <span>Claim</span>
              <RiCoupon2Line className='w-6 h-6' />
            </m.button>
          ) : (
            <m.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring" }}
              exit={{ opacity: 0 }}
              disabled={isFirstPromoClaimed}
              className='p-3 min-w-[120px]  bg-green-400 text-primary flex gap-3 items-center border border-solid justify-center border-green-400 '
            >
              <span>Claimed</span>
              <GiPartyPopper className='w-6 h-6' />
            </m.button>
          )}
        </div>
      </div>
    </m.div>
  );
}

export default Banner;
