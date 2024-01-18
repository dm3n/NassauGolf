import { useState } from 'react';
import ProductDetail from './ProductDetail';
import Breadcrumb from '@/components/layout/Breadcrumb';
function DetailContainer({ product }) {
	return (
		<section className="pt-[142px] flex flex-col gap-y-4 ">
			<div className=" flex justify-center mb-6">
				<Breadcrumb />
			</div>
			<ProductDetail product={product} />
		</section>
	);
}

export default DetailContainer;
