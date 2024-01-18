import React from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { urlFor } from "@/lib/client";
function Categories({ categories }) {
  return (
    <section className=' flex items-center gap-2'>
      <div className='category-name'></div>
      <div className='category-products'></div>
    </section>
  );
}

export default Categories;
