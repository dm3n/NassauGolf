import React from "react";
import ProductCard from "@/components/layout/products/ProductCard";
function Recommanded({ products_recommanded }) {
  return (
    <>
      {!!products_recommanded.length && (
        <section className='mb-16 mt-8'>
          <h5 className='text-2xl container_title xs:text-3xl mb-12 uppercase'>
            People also{" "}
            <span className='px-4 py-2 bg-primary text-white'>view</span>
          </h5>
          <main className='grid x:grid-cols-2 xm:grid-cols-3 lg:grid-cols-4 gap-2 xm:gap-4 lg:gap-6'>
            {products_recommanded.map((pr, i) => (
              <div key={i + "fioefhhfs" + i * 123}>
                <ProductCard product_data={pr} />
              </div>
            ))}
          </main>
        </section>
      )}
    </>
  );
}

export default Recommanded;
