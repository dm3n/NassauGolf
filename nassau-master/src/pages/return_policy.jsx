import React from "react";
import Head from "next/head";
import Container from "@/components/layout/Container";
import { client } from "@/lib/client";
import ReturnPolicy from "@/components/return_policy/ReturnPolicy";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"));

function return_policy({ categories, banner, policy }) {
  // console.log('policy ', policy , "banner", banner)
  return (
    <>
      <Head>
        <title>Nassau | Return Policy</title>
        <meta
          name='description'
          content="Learn about Nassau 's return policy for our services."
        />
        <meta
          name='keywords'
          content='Nassau , return policy, fashion, hats, refunds, returns'
        />
        <meta name='author' content='Daniel' />
        {/* Open Graph Protocol tags */}
        <meta property='og:title' content='Nassau  | Return Policy' />
        <meta
          property='og:description'
          content="Learn about Nassau 's return policy for our services."
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://nassaugolf.ca/return-policy' />
        {/* Twitter Card tags */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content='Nassau Golf | Return Policy' />
        <meta
          name='twitter:description'
          content="Learn about Nassau Golf's return policy for our servicess."
        />
        {/* Canonical link */}
        <link rel='canonical' href='https://nassaugolf.ca/return-policy' />
        {/* Favicon */}
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Navbar categories={categories} banner={banner} />
        <Container>
          <ReturnPolicy policy={policy} />
        </Container>
      </main>
    </>
  );
}

export default return_policy;

export const getStaticProps = async () => {
  const policy = await client.fetch('*[_type == "return_policy" ]');
  const banner = await client.fetch('*[_type == "bannerPromo"]');
  const categories = await client.fetch(`*[_type == "catagories"]`);

  return {
    props: {
      policy,
      banner,
      categories,
    },
    revalidate: 16000,
  };
};
