import { useState } from "react";
import dynamic from "next/dynamic";
import { urlFor } from "@/lib/client";
import Image from "next/image";

function HoverImageShowCase({ variants }) {
  // the varaitn should look like this : {main_image: img , alt_image:  img}
  // false stand for main true stand for alt
  const [isAlt, setIsAlt] = useState(true);

  return (
    <div className='absolute top-0 left-0 w-full h-full'>
      {isAlt ? (
        <div className='relative w-full h-full'>
          <Image
            src={urlFor(variants.main_image.asset._ref).url()}
            alt='product image'
            sizes='320px'
            className='w-full h-full'
            fill
          />
        </div>
      ) : (
        <div className='relative w-full h-full '>
          <Image
            src={urlFor(variants.alt_image.asset._ref).url()}
            alt='product image'
            className='w-full h-full object-cover'
            sizes='320px'
            fill
          />
        </div>
      )}
      {isAlt ? (
        <img
          src={urlFor(variants.alt_image.asset._ref).url()}
          alt='product image'
          className='absolute bottom-3 w-7 cursor-pointer shadow-sm shadow-white border border-white border-solid rounded z-[50] aspect-[.75] right-3'
          onClick={() => setIsAlt((pre) => !pre)}
          width={28}
        />
      ) : (
        <img
          src={urlFor(variants.main_image.asset._ref).url()}
          alt='product image'
          className='absolute bottom-3 w-7 cursor-pointer shadow-sm shadow-white border border-white border-solid rounded z-[50] aspect-[.75] right-3'
          onClick={() => setIsAlt((pre) => !pre)}
          width={28}
        />
      )}
    </div>
  );
}

export default HoverImageShowCase;
