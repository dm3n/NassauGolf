import Hero from "@/components/home/Hero";
import { client } from "@/lib/client";
import Head from "next/head";
import dynamic from "next/dynamic";
// const WhyUs = dynamic(() => import('@/components/layout/WhyUs'));
const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"));
import WhyUs from "@/components/layout/WhyUs";
const Category = dynamic(() => import("@/components/home/Category"));

const TrendingContainer = dynamic(() =>
  import("@/components/layout/trending_products/TrendingContainer")
);
const LatestProducts = dynamic(() =>
  import("@/components/home/LatestProducts")
);
const ProductsContainer = dynamic(() =>
  import("@/components/layout/products/ProductsContainer")
);
// import Category from "@/components/home/Category";

export default function Home({
  categories,
  trending,
  categoryLayout,
  layout,
  banner,
  products,
  latest,
}) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Discover the latest trends in fashion and lifestyle at Nassau. Browse our selection of products and find your new favorite items.'
        />
        <meta
          name='keywords'
          content='Nassau, fashion, lifestyle, trends, products, shopping, categories'
        />
        <meta name='author' content='daniel' />
        <title>Nassau - Home</title>
        {/*  <!-- Open Graph Protocol tags -->*/}
        <meta property='og:title' content='Nassau - Home' />
        <meta
          property='og:description'
          content='Discover the latest trends in fashion and lifestyle at Nassau. Browse our selection of products and find your new favorite items.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://nassaugolf.ca/' />
        <meta
          property='og:image'
          content='https://nassaugolf.ca/nassau-golf-apparel-just--v2-black-200h.png'
        />
        {/*Twitter Card tags*/}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Nassau - Home' />
        <meta
          name='twitter:description'
          content='Discover the latest trends in fashion and lifestyle at Nassau. Browse our selection of products and find your new favorite items.'
        />
        <meta
          name='twitter:image'
          content='https://yourwebsite.com/twitter-card-image.jpg'
        />
      </Head>
      <main>
        <Navbar categories={categories} banner={banner} />
        <Hero heroImage={layout.Hero_image} />
        <section className='px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 max-w-bodyxl mx-auto'>
          <WhyUs />
          <Category categories={categoryLayout} />
          {trending.length ? (
            <TrendingContainer trending_data={trending} />
          ) : (
            <></>
          )}
          <LatestProducts products={latest} />

          <ProductsContainer products={products} categories={categories} />
        </section>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const categories = await client.fetch(`*[_type == "catagories"]`);
  const layout = await client.fetch('*[_type == "homePageLayout"][0]');

  const numberOfTrending =
    +layout.trendingProducts > 3 ? layout.trendingProducts : 3;
  const numberOfLatest = +layout.LatestProducts > 3 ? layout.LatestProducts : 3;
  const numberOfProducts = +layout.products > 3 ? layout.products : 3;

  const targetedCtaegories = layout.category_layout
    .map((e, i) => `${i !== 0 ? "||" : ""} _id == "${e._ref}"`)
    .join("");

  const categoryLayout = await client.fetch(
    `*[_type == "catagories" && (${targetedCtaegories})]`
  );
  const trending = await client.fetch(
    `*[_type == "trending"] [0...${+numberOfTrending}]`
  );
  const banner = await client.fetch('*[_type == "bannerPromo"]');
  const products = await client.fetch(
    `*[_type in ["product" , "trending"]] | order(_createdAt asc)[0...${numberOfProducts}]`
  );
  const latest = await client.fetch(
    `*[_type in ["product" , "trending"]] | order(_createdAt desc)[0...${numberOfLatest}]`
  );
  return {
    props: {
      categories: [...categories],
      trending,
      banner,
      products,
      layout,
      categoryLayout,
      latest,
    },
    revalidate: 18000,
  };
};
