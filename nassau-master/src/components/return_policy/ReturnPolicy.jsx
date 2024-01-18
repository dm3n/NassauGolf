import React from "react";
import { m } from "framer-motion";
import dynamic from "next/dynamic";
const LazyMotions = dynamic(() => import("@/components/LazyMotions"));
import { AiOutlineFieldTime } from "react-icons/ai";
import { GiReturnArrow } from "react-icons/gi";
import { RiRefund2Line } from "react-icons/ri";
import { PortableText } from "@portabletext/react";

function ReturnPolicy({ policy }) {
  const [data] = policy;
  // console.log(policy);
  return (
    <section className='mt-[190px] listOriginalStyle'>
      <h1 className='container_title uppercase text-2xl xm:text-3xl lg:text-4xl mb-12'>
        Return policy
      </h1>
      <article className='description text-sm  sm:text-lg  lg:text-xl xl:text-2xl text-gray-700 mb-12'>
        {data.description}
      </article>
      <h2 className='timeFrame container_title text-xl xm:text-2xl lg:text-3xl uppercase flex items-center gap-2 mb-8'>
        <AiOutlineFieldTime className='w-7 h-7 ' /> <span>Time Frame</span>
      </h2>
      <article className='text-sm sm:text-lg lg:text-xl xl:text-2xl text-gray-700  mb-12'>
        {data.time_frame}
      </article>
      <h3 className='condition_of_returned_products container_title text-xl xm:text-2xl lg:text-3xl uppercase flex items-center gap-2 mb-8'>
        <GiReturnArrow className='w-7 h-7' /> condition of returned products
      </h3>
      <article className='text-sm sm:text-lg lg:text-xl xl:text-2xl text-gray-700  mb-12'>
        <PortableText value={data.condition_of_returned_products} list />
      </article>
      <h4 className='refund_policy container_title text-xl xm:text-2xl lg:text-3xl uppercase flex items-center gap-2 mb-8'>
        <RiRefund2Line className='w-7 h-7' /> refund policy
      </h4>
      <article className='text-sm sm:text-lg lg:text-xl xl:text-2xl text-gray-700  mb-12'>
        <PortableText value={data.refund_policy} />
      </article>
    </section>
  );
}

export default ReturnPolicy;
