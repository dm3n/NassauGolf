import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { client, urlFor } from "@/lib/client";
// import Navbar from '@/components/layout/navbar/Navbar';
const Navbar = dynamic(() => import("@/components/layout/navbar/Navbar"));
import Container from "@/components/layout/Container";
import DetailContainer from "@/components/detail-product/DetailContainer";
// import Recommanded from '@/components/detail-product/Recommanded';
const Recommanded = dynamic(() =>
	import("@/components/detail-product/Recommanded")
);
function index({ product, recommended, categories, banner }) {
	// const img = urlFor(product.varients[0].images[0].asset._ref).url();
	return (
		<>
			<Head>
				<title>Nassau | {product?.title}</title>
				<meta name="description" content={product?.description} />
				<meta
					name="keywords"
					content={`${product?.title}, Nassau, fashion, polos, hats `}
				/>
				<meta name="author" content="Daniel" />
				Open Graph Protocol tags
				<meta property="og:title" content={`Nassau  | ${product?.title}`} />
				<meta property="og:description" content={product?.description} />
				<meta property="og:type" content="product" />
				<meta
					property="og:url"
					content={`https://nassaugolf.ca/detail/${product?._id}`}
				/>
				{/*<meta property="og:image" content={img} />*/}
				<meta property="og:price:amount" content={product?.price} />
				<meta property="og:price:currency" content="CAD" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={`Nassau  | ${product?.title}`} />
				<meta name="twitter:description" content={product?.description} />
				{/*<meta name="twitter:image" content={img} />*/}
				<link
					rel="canonical"
					href={`https://nassaugolf.ca/detail/${product?._id}`}
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Navbar categories={categories} banner={banner} />
				<Container>
					{!!product && <DetailContainer product={product} />}
					{!!recommended ? (
						<Recommanded products_recommanded={recommended} />
					) : (
						<></>
					)}
				</Container>
			</main>
		</>
	);
}

export default index;

export const getStaticPaths = async () => {
	const products = await client.fetch('*[_type in ["product", "trending"]]');

	const paths = products.map((p) => ({ params: { id: p._id } }));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps = async (context) => {
	const { params } = context;
	const { id } = params;
	const products = await client.fetch(
		`*[_type in ["trending", "product"] && _id == $id]`,
		{
			id,
		}
	);
	const title = products[0].title.split(" ");
	const query = title
		.map(
			(q, i) =>
				`${i === 0 ? "" : "||"} (title match "${q}" || tags[] match "${q}") `
		)
		.join("")
		.toLowerCase();
	console.log(query);
	const recommended = await client.fetch(
		`*[_type in ["product", "trending"] && (${query}) && _id != $id]`,
		{
			title,
			id,
			query,
		}
	);

	const categories = await client.fetch(`*[_type == "catagories"]`);
	const banner = await client.fetch('*[_type == "bannerPromo"]');
	const product = { ...products[0] };
	return {
		props: {
			product,
			categories,
			recommended,
			banner,
		},
		revalidate: 18000,
	};
};
