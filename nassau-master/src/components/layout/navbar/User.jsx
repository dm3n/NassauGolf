import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { RiCoupon2Line } from "react-icons/ri";
import { GiExitDoor } from "react-icons/gi";
import { useCartContext } from "@/context/cartContext";
function User() {
  const { user, logOut } = UserAuth();
  const {
    setIsBanner,
    userData,
    setCartItems,
    setTotalPrice,
    setTotalQuantities,
  } = useCartContext();
  const [promoUsed, setPromoUsed] = useState(false);

  useEffect(() => {
    if (userData) {
      if (!userData.firstTimePromo) {
        setPromoUsed(true);
      }
    }
  }, [user, userData]);
  function handleLogout() {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    logOut();
  }

  return (
    <div className='flex items-center gap-2'>
      {userData && !promoUsed && (
        <div className='relative'>
          <RiCoupon2Line
            className='w-6 h-6 cursor-pointer'
            onClick={() => setIsBanner(true)}
          />
          <span
            className={`indicator-item -top-1 z-[100] absolute right-0  badge w-1 h-1 p-1 rounded-full bg-red-600`}
          ></span>
        </div>
      )}
      <div className='dropdown  dropdown-end'>
        <label tabIndex={0} className='cursor-pointer avatar'>
          <div className='w-10 cursor-pointer rounded-full'>
            <img src='/IMG_5826.webp' alt='user avatar' />
          </div>
        </label>
        <ul
          tabIndex={0}
          className='menu menu-compact dropdown-content border border-solid  mt-3 p-2 shadow bg-base-100 rounded-lg w-52'
        >
          <li>
            <button className='  py-4 hover:bg-none lg:hidden  h-[40px]  border-none mt-1  transition-all'>
              <span className='text-xs text-primary  block'>
                {user.displayName}
              </span>
            </button>
          </li>
          <li>
            <button
              className="slide ease-linear flex items-center gap-2  py-4  h-[40px]  border-none duration-['1.5s'] transition-all"
              onClick={handleLogout}
            >
              <span> Logout</span>
              <GiExitDoor />
            </button>
          </li>
        </ul>
      </div>
      <span className='text-[10px] hidden min-w-fit  lg:block'>
        {user.displayName}
      </span>
    </div>
  );
}

export default User;
