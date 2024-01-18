import { Swiper, SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import TrendingProduct from "@/components/layout/trending_products/TrendingProduct";
import { MdFiberNew } from "react-icons/md";
import { m } from "framer-motion";
const LazyMotions = dynamic(() => import("@/components/LazyMotions"));
function LatestProducts({ products }) {
  function sortByCreatedAt(arr) {
    return arr.sort(function (a, b) {
      return new Date(b._createdAt) - new Date(a._createdAt);
    });
  }
  const productsSorted = sortByCreatedAt(products);
  return (
    <LazyMotions>
      <>
        <section className="mb-32">
          <h3 className="container_title uppercase text-center text-3xl xs:text-4xl mb-12">
            Our{" "}
            <m.span
              whileInView={{
                backgroundColor: "black",
                color: "white",
                boxShadow: "inset 46rem 0 0 0 black",
              }}
              initial={{
                backgroundColor: "white",
                color: "black",
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-2 py-1 transition-colors ease-linear"
            >
              Latest
            </m.span>{" "}
            Products
          </h3>
          <div>
            <Swiper
              slidesPerView={1}
              modules={[Navigation]}
              spaceBetween={10}
              navigation
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
              {productsSorted.map((tp, i) => (
                <SwiperSlide
                  key={i * 100101 + 1}
                  className=" flex items-center relative justify-center"
                >
                  <TrendingProduct product_data={tp} />
                  <span className="absolute top-4 text-[10px] xs:text-xs animate__animated animate__flash animate__infinite animate__slower animate_delay-2s lg:text-sm -skew-x-6  text-white right-3 z-10 ">
                    <MdFiberNew className="h-8 w-8  text-red-600" />
                  </span>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </>
    </LazyMotions>
  );
}

export default LatestProducts;
