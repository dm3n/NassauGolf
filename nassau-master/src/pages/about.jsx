import React from "react";
import dynamic from "next/dynamic";
import { client } from "@/lib/client";
import Head from "next/head";
import Container from "@/components/layout/Container";
import About from "@/components/about/About";
// import Navbar from '@/components/layout/navbar/Navbar';
const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"));
function about({ info, banner, categories }) {
  return (
    <>
      <Head>
        <title>Nassau - About Us</title>
        <meta
          name='description'
          content='Learn more about Nassau and our team. Discover our mission and values, and get in touch with us today.'
        />
        <meta
          name='keywords'
          content='Nassau, about us, team, mission, values, contact, Daniel'
        />
        <meta name='author' content='Daniel' />

        {/* Open Graph Protocol tags */}
        <meta property='og:title' content='Nassau - About Us' />
        <meta
          property='og:description'
          content='Learn more about Nassau and our team. Discover our mission and values, and get in touch with us today.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://nassaugolf.caimages/about' />
        <meta
          property='og:image'
          content='https://nassaugolf.caimages/og-image.jpg'
        />

        {/* Twitter Card tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Nassau - About Us' />
        <meta
          name='twitter:description'
          content='Learn more about Nassau and our team. Discover our mission and values, and get in touch with us today.'
        />

        {/* Canonical link */}
        <link rel='canonical' href='https://nassaugolf.ca/about' />

        {/* Favicon */}
        <link rel='icon' href='favicon.ico' />
      </Head>
      <main>
        <Navbar categories={categories} banner={banner} />
        <Container>
          {info ? (
            <About info={info} />
          ) : (
            <div className='flex items-center justify-center w-full h-screen'>
              <p>Sorry But this page under building</p>
            </div>
          )}
        </Container>
      </main>
    </>
  );
}

export default about;
export const getStaticProps = async () => {
  const data = await client.fetch('*[_type == "about_us"]');
  const categories = await client.fetch('*[_type == "categories"]');
  const banner = await client.fetch('*[_type == "bannerPromo"]');

  const [info] = data;
  return {
    props: {
      info,
      categories,
      banner,
    },
    revalidate: 18000,
  };
};
