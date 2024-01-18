import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { client } from "@/lib/client";
import Container from "@/components/layout/Container";
// import Navbar from '@/components/layout/navbar/Navbar';
const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"));
import TermsAndConditions from "@/components/terms_conditions/TermsAndConditions";
function terms_conditions({ data, categories, banner }) {
	console.log(data);
	return (
		<>
			<Head>
				<title>Nassau - Terms of Service</title>
				<meta
					name="description"
					content="Please read these Terms of Service carefully before using our website. By using our website, you agree to be bound by these Terms of Service."
				/>
				<meta
					name="keywords"
					content="Nassau, terms of service, website, agreement, legal"
				/>
				<meta name="author" content="Daniel" />

				{/* Open Graph Protocol tags */}
				<meta property="og:title" content="Nassau - Terms of Service" />
				<meta
					property="og:description"
					content="Please read these Terms of Service carefully before using our website. By using our website, you agree to be bound by these Terms of Service."
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://nassaugolf.caimages/terms-of-service"
				/>
				<meta
					property="og:image"
					content="https://nassaugolf.caimages/nassau-golf-apparel-just--v2-black-200h.png"
				/>

				{/* Twitter Card tags */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Nassau - Terms of Service" />
				<meta
					name="twitter:description"
					content="Please read these Terms of Service carefully before using our website. By using our website, you agree to be bound by these Terms of Service."
				/>
				<meta
					name="twitter:image"
					content="https://nassaugolf.caimages/nassau-golf-apparel-just--v2-black-200h.png"
				/>

				{/* Canonical link */}
				<link rel="canonical" href="https://nassaugolf.caimages/terms-of-service" />

				{/* Favicon */}
				<link rel="icon" href="favicon.ico" />
			</Head>
			<main>
				<Navbar categories={categories} banner={banner} />
				<Container>
					<TermsAndConditions data={data} />
				</Container>
			</main>
		</>
	);
}

export default terms_conditions;

export const getStaticProps = async () => {
	const data = await client.fetch('*[_type == "TermsAndConditions"][0]');
	const categories = await client.fetch(`*[_type == "catagories"]`);
	const banner = await client.fetch('*[_type == "bannerPromo"]');

	return {
		props: {
			data,
			banner,
			categories,
		},
	};
};
