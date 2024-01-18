import dynamic from "next/dynamic";
import ContactUs from "@/components/contact-us/ContactUs";
import Container from "@/components/layout/Container";
// import Navbar from '@/components/layout/navbar/Navbar';
const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"));
import { client } from "@/lib/client";
import Head from "next/head";
import React from "react";

function contact({ categories, banner }) {
  return (
    <>
      <Head>
        <title>Nassau | Contact Us</title>
        <meta
          name="description"
          content="Contact Nassau for any questions or concerns related to our services."
        />
        <meta
          name="keywords"
          content="Nassau, contact us, customer support"
        />
        <meta name="author" content="Daniel" />

        {/* Open Graph Protocol tags */}
        <meta property="og:title" content="Nassau | Contact Us" />
        <meta
          property="og:description"
          content="Contact Nassau for any questions or concerns related to our services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nassaugolf.ca/contact" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Nassau | Contact Us" />
        <meta
          name="twitter:description"
          content="Contact Nassau for any questions or concerns related to our services."
        />

        {/* Canonical link */}
        <link rel="canonical" href="https://nassaugolf.ca/contact" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar categories={categories} banner={banner} />
        <Container>
          <div className="hero-section mt-[112px] flex items-center justify-center">
            <ContactUs />
          </div>
        </Container>
      </main>
    </>
  );
}

export default contact;

export const getStaticProps = async () => {
  const categories = await client.fetch(`*[_type == "catagories"]`);
  const banner = await client.fetch('*[_type == "bannerPromo"]');

  return {
    props: {
      categories: [...categories],
      banner,
    },
    revalidate: 18000,
  };
};
