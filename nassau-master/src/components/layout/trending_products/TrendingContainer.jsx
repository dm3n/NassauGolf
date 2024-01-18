import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import TrendingProduct from "./TrendingProduct";
import { MdWhatshot } from "react-icons/md";
import { m } from "framer-motion";
import LazyMotions from "@/components/LazyMotions";

function TrendingContainer({ trending_data }) {
  return (
    <LazyMotions>
      <>
        <m.section className="mb-32">
          <h2 className="container_title text-3xl uppercase text-center xs:text-4xl mb-12">
            <m.span
              whileInView={{
                backgroundColor: "black",
                color: "white",
                boxShadow: "inset 46rem 0 0 0 black",
              }}
              transition={{ duration: 1, delay: 0.2 }}
              initial={{ backgroundColor: "white", color: "black" }}
              className="inline-block px-2 py-1 transition-colors ease-linear"
            >
              Trending
            </m.span>
            Products
          </h2>

          <div>
            <Swiper
              slidesPerView={1}
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              grabCursor={true}
              breakpoints={{
                420: {
                  slidesPerView: 2,
                },
                820: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1224: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              style={{ paddingBottom: "50px", paddingTop: "80px" }}
              className="Swiper-Container"
            >
              {trending_data.map((tp, i) => (
                <SwiperSlide
                  key={i * 100101 + 1}
                  className="flex items-center relative justify-center"
                >
                  <TrendingProduct product_data={tp} />
                  <MdWhatshot className="w-8 h-8 absolute top-4 text-[10px] text-black xs:text-xs animate__animated animate__jello animate__infinite animate__slower animate_delay-3s lg:text-sm -skew-x-6 right-3 z-10 absolute top-0 right-3" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </m.section>
      </>
    </LazyMotions>
  );
}

export default TrendingContainer;
