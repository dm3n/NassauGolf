import { client } from "@/lib/client";
import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
// import Navbar from "@/components/layout/navbar/Navbar";
const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"));
import Container from "@/components/layout/Container";
// import ProductsContainer from "@/components/productsCategory/ProductsContainer";
const ProductsContainer = dynamic(() =>
  import("@/components/productsCategory/ProductsContainer")
);
function products({ banner, products, categories }) {
  return (
    <>
      <Head>
        <title>Nassau - Products</title>
      </Head>
      <main>
        <Navbar categories={categories} banner={banner} />
        <Container>
          <ProductsContainer products={products} categories={categories} />
        </Container>
      </main>
    </>
  );
}

export default products;

export const getStaticProps = async () => {
  const categories = await client.fetch(`*[_type == "catagories"]`);
  const products = await client.fetch(`*[_type == "product"][0...30]`);
  const banner = await client.fetch('*[_type == "bannerPromo"]');

  return {
    props: {
      categories,
      banner,
      products,
    },
  };
};
