import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useCartContext } from "@/context/cartContext";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiCloseFill,
} from "react-icons/ri";
import { GiHouse, GiDirectionSign } from "react-icons/gi";
import { GrContactInfo } from "react-icons/gr";
import { BiCategoryAlt } from "react-icons/bi";

import LazyMotions from "@/components/LazyMotions";
import { RxHamburgerMenu } from "react-icons/rx";
import Button from "../Button";
import Banner from "../Banner";
import { UserAuth } from "@/context/AuthContext";
const User = dynamic(() => import("./User"));
const CartContainer = dynamic(() => import("./CartContainer"));
function Navbar({ categories, banner }) {
  const [isDrop, setIsDrop] = useState(false);
  const [menu, setMenu] = useState(false);
  const { setIsBanner, isBanner } = useCartContext();
  const { user, googleSignIn } = UserAuth();
  // fc to handel signIn
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <LazyMotions>
      {banner &&
        !!banner?.length &&
        user &&
        !!banner[0]?.activate &&
        isBanner && <Banner setIsBanner={setIsBanner} banner={banner[0]} />}

      <header className='fixed w-full top-0 bg-white left-0 flex flex-col items-center justify-center z-[100] min-h-[112px] shadow-lg'>
        {/* banner */}

        {/* desktop */}
        <nav className='hidden lg:flex w-full max-w-8xl items-center bg-white px-2 md:px-6 lg:px-12 xl:px-20 py-4 gap-12'>
          <div className='relative aspect-[1.63] min-w-[120px]'>
            <Image
              src='/nassau-golf-apparel-just--v2-black-200h.png'
              alt='logo'
              fill
              size='150px'
            />
          </div>
          <ul className='flex items-center w-full gap-4 flex-grow justify-start text-sm md:text-base'>
            <li>
              <Link className='flex items-center gap-2' href='/'>
                <GiHouse /> Home
              </Link>
            </li>
            <li
              className='cursor-pointer relative'
              onClick={() => setIsDrop((pre) => !pre)}
            >
              <p className='flex items-center gap-1 justify-center'>
                <BiCategoryAlt />

                <span>Catalog</span>

                {!isDrop ? (
                  <RiArrowDropDownLine className='block min-w-6 min-h-6 cursor-pointer' />
                ) : (
                  <RiArrowDropUpLine className='block min-w-6 min-h-6 cursor-pointer' />
                )}
              </p>

              <ul
                className={`capitalize  menu grid grid-cols-3 min-w-[300px] px-2 gap-4 absolute ${
                  !isDrop ? "opacity-0 hidden" : "opacity-100"
                } top-9 left-0 w-full text-xs bg-white p-2  transition-opacity duration-300 ease-linear shadow-md  rounded-md pb-2 z-[100]`}
              >
                {!!categories?.length &&
                  categories?.map((category, i) => (
                    <li
                      key={category._id + i}
                      className='hover:bordered min-w-[90px] whitespace-nowrap'
                    >
                      <Link
                        href={`/category/${
                          category._id
                        }?name=${category.category_name.toLowerCase()}`}
                      >
                        {category.category_name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
            <li>
              <Link href='/contact' className='flex items-center gap-2'>
                <GrContactInfo /> Contact
              </Link>
            </li>
            <li>
              <Link href='/about' className='flex items-center gap-2'>
                {" "}
                <GiDirectionSign /> About
              </Link>
            </li>
          </ul>

          <div className='flex items-center gap-3'>
            <CartContainer />
            {user ? (
              <User />
            ) : (
              <div className='max-w-[280px]' onClick={handleSignIn}>
                <Button
                  text='Sign-in'
                  className='border border-solid border-black h-[40px]'
                  icon={true}
                />
              </div>
            )}
          </div>
        </nav>
        {/* mobile */}
        <nav className='lg:hidden px-2 md:px-6 lg:px-12 z-[10000000000] bg-white xl:px-20 py-4 bg-white w-full max-w-8xl h-full flex items-center justify-between'>
          <RxHamburgerMenu
            className='w-8 h-8 cursor-pointer'
            onClick={() => setMenu(true)}
          />
          <div
            className={`absolute top-0 ${
              menu ? "left-0" : " -left-96"
            } w-[260px] z-[10000] h-screen bg-white transition-all duration-300 ease-in-out text-base`}
          >
            <ul className=' flex flex-col justify-end items-start py-10 px-5 gap-y-4'>
              <li className=' flex items-center w-full justify-between'>
                <p>
                  <RiCloseFill
                    onClick={() => setMenu(false)}
                    className='w-8 h-8 cursor-pointer hover:rotate-90 ease-in-out duration-300'
                  />
                </p>
                <p className='relative aspect-[1.63] min-w-[90px]'>
                  <Image
                    src='/nassau-golf-apparel-just--v2-black-200h.png'
                    alt='logo'
                    fill
                    size='150px'
                  />
                </p>
              </li>
              <li>
                <Link className='flex items-center gap-2' href='/'>
                  <GiHouse /> Home
                </Link>
              </li>
              <li
                className='relative cursor-pointer'
                onClick={() => setIsDrop((pre) => !pre)}
              >
                <p className='flex items-center gap-1'>
                  <BiCategoryAlt />
                  <span>categories</span>

                  {!isDrop ? (
                    <RiArrowDropDownLine className='block min-w-6 min-h-6 cursor-pointer' />
                  ) : (
                    <RiArrowDropUpLine className='block min-w-6 min-h-6 cursor-pointer' />
                  )}
                </p>
                {isDrop && (
                  <ul className=' capitalize flex flex-col w-full h-fit text-xs  px-1 rounded-b-md pb-2 z-[100]'>
                    {categories.map((category, i) => (
                      <li
                        key={category._id + i + "iuezuiuzieuz"}
                        className='mt-3 ease-in-out duration-200 transition-all'
                      >
                        <Link
                          href={`/category/${
                            category._id
                          }?name=${category.category_name.toLowerCase()}`}
                        >
                          {category.category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link href='/contact' className='flex items-center gap-2'>
                  {" "}
                  <GrContactInfo /> Contact
                </Link>
              </li>
              <li>
                <Link href='/about' className='flex items-center gap-2'>
                  {" "}
                  <GiDirectionSign /> About
                </Link>
              </li>
            </ul>
          </div>
          <div className='flex items-center gap-3'>
            <CartContainer />
            {user ? (
              <User />
            ) : (
              <div className='max-w-[280px]' onClick={handleSignIn}>
                <Button
                  text='Sign-in'
                  className='border border-solid border-black h-[40px]'
                />
              </div>
            )}
          </div>
        </nav>
      </header>
    </LazyMotions>
  );
}

export default Navbar;
