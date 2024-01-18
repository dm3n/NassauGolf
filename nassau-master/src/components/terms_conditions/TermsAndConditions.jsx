import React from 'react';

function TermsAndConditions({ data }) {
	return (
		<section className="mt-[150px]">
			<h1 className=" container_title text-3xl  xs:text-4xl capitalize mb-16">
				Terms & conditions
			</h1>
			{data.introduction && (
				<>
					<p className=" container_title capitalize uppercase text-2xl xs:text-3xl mb-8">
						{`=>`} introduction
					</p>{' '}
					<article className="ml-6 mb-16 text-xl xm:text-2xl">
						{data.introduction}
					</article>
				</>
			)}
			{data.disclaimer && (
				<>
					<p className=" container_title capitalize uppercase text-2xl xs:text-3xl mb-8">
						{`=>`} disclaimer
					</p>{' '}
					<article className="ml-6 mb-16 text-xl xm:text-2xl">
						{data.disclaimer}
					</article>
				</>
			)}
			{data.acceptance && (
				<>
					<p className=" container_title capitalize uppercase text-2xl xs:text-3xl mb-8">
						{`=>`} acceptance
					</p>{' '}
					<article className="ml-6 mb-16 text-xl xm:text-2xl">
						{data.acceptance}
					</article>
				</>
			)}
			{data.accounts && (
				<>
					<p className=" container_title capitalize uppercase text-2xl xs:text-3xl mb-8">
						{`=>`} accounts
					</p>{' '}
					<article className="ml-6 mb-16 text-xl xm:text-2xl">
						{data.accounts}
					</article>
				</>
			)}

			{data.products && (
				<>
					<p className=" container_title capitalize uppercase text-2xl xs:text-3xl mb-8">
						{`=>`} products
					</p>{' '}
					<article className="ml-6 mb-16 text-xl xm:text-2xl">
						{data.products}
					</article>
				</>
			)}
			{data.intellectualProperty && (
				<>
					<p className=" container_title capitalize uppercase text-2xl xs:text-3xl mb-8">
						{`=>`} intellectual Property
					</p>{' '}
					<article className="ml-6 mb-16 text-xl xm:text-2xl">
						{data.intellectualProperty}
					</article>
				</>
			)}

			{data.changes && (
				<>
					<p className=" container_title capitalize uppercase text-2xl xs:text-3xl mb-8">
						{`=>`} changes
					</p>{' '}
					<article className="ml-6 mb-16 text-xl xm:text-2xl">
						{data.changes}
					</article>
				</>
			)}
		</section>
	);
}

export default TermsAndConditions;
