import React from "react";
import { client } from "@/lib/client";
import dynamic from "next/dynamic";
import Head from "next/head";
const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"));
import CategoryProductContaier from "@/components/category/CategoryProductContaier";

const index = ({ category, categories, banner, products }) => {
	return (
		<>
			<Head>
				<title>Nassau  | {category[0].category_name} Category</title>
				<meta
					name="description"
					content={`Explore our selection of ${category[0].category_name} products. Find the perfect golf equipment and accessories for your game at Nassau .`}
				/>
				<meta
					name="keywords"
					content={`${category[0].category_name}, Nassau , golf equipment, golf accessories`}
				/>
				<meta name="author" content="Daniel" />

				{/* Open Graph Protocol tags */}
				<meta
					property="og:title"
					content={`Nassau  | ${category[0].category_name} Category`}
				/>
				<meta
					property="og:description"
					content={`Explore our selection of ${category[0].category_name} products. Find the perfect golf equipment and accessories for your game at Nassau .`}
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content={`https://nassaugolf.ca/category/${category[0].category_name}`}
				/>
				<meta property="og:image" content="https://nassaugolf.ca/og-image.jpg" />

				{/* Twitter Card tags */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content={`Nassau  | ${category[0].category_name} Category`}
				/>
				<meta
					name="twitter:description"
					content={`Explore our selection of ${category[0].category_name} products. Find the perfect golf equipment and accessories for your game at Nassau .`}
				/>
				<meta
					name="twitter:image"
					content="https://nassaugolf.ca/twitter-card-image.jpg"
				/>

				{/* Canonical link */}
				<link
					rel="canonical"
					href={`https://nassaugolf.ca/category/${category[0]._id}?name=${category[0].category_name}`}
				/>

				{/* Favicon */}
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Navbar categories={categories} banner={banner} />
				{/*<Hero />*/}
				<section className="px-2 sm:px-3 min-h-screen md:px-4 lg:px-5 xl:px-12 max-w-bodyxl mx-auto">
					<CategoryProductContaier products={products} id={category[0]._id} />
				</section>
			</main>
		</>
	);
};

export default index;

export const getStaticPaths = async (context) => {
	const categories = await client.fetch(`*[_type == "catagories"]`);
	const paths = categories.map((ct) => ({
		params: { id: ct._id },
	}));
	// console.log(paths);

	return {
		paths,
		fallback: false, // can also be true or 'blocking'
	};
};

export const getStaticProps = async (context) => {
	const category = await client.fetch(
		`*[_type == "catagories" && _id == "${context.params.id.toLowerCase()}" ]`
	);
	const id = await category[0]._id;
	const banner = await client.fetch('*[_type == "bannerPromo"]');
	const categories = await client.fetch(`*[_type == "catagories"]`);

	const products = await client.fetch(
		'*[_type == "product" && category._ref == $id]',
		{ id }
	);
	// const name = context.query.name;
	return {
		props: {
			category,
			banner,
			categories,
			products,
		},
		revalidate: 20000,
	};
};
