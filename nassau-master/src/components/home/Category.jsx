import Image from "next/image";
import dynamic from "next/dynamic";
import { FaRedhat } from "react-icons/fa";
import { RiShirtFill } from "react-icons/ri";
import Link from "next/link";
import { urlFor } from "@/lib/client";
import { m } from "framer-motion";
const LazyMotions = dynamic(() => import("@/components/LazyMotions"));

function Category({ categories }) {
	const gridLength = categories.length;
	return (
		<LazyMotions>
			<>
				<p className="container_title uppercase text-center text-3xl xs:text-4xl mb-12 w-full">
					Shop By{" "}
					<m.span
						whileInView={{
							backgroundColor: "black",
							color: "white",
							boxShadow: "inset 46rem 0 0 0 black",
						}}
						initial={{
							backgroundColor: "white",
							color: "black",
						}}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="inline-block px-2 py-1 text-white bg-primary transition-colors ease-linear"
					>
						category
					</m.span>
				</p>
				<main
					className={`w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-${gridLength} justify-center items-center gap-4 mb-48`}
				>
					{categories.slice(0, 4).map((e, i) => (
						<section
							key={i + "$$$$LLL"}
							className="flex max-w-[650px] min-w-[150px] relative flex-col items-center justify-center w-full aspect-square"
						>
							<Image
								src={`${urlFor(e.image.asset._ref).url()}`}
								alt="category_image"
								className="absolute top-0 left-0 w-full h-full object-cover object-center"
								fill
								sizes="450px"
							/>
							<Link
								href={`/category/${e._id}?name=${e.category_name}`}
								className="shadow-lg slide text-[10px] lg:text-sm xl:text-base duration-500 ease-linear cursor-pointer rounded capitalize container_title bg-white text-black z-10 p-2 xm:p-4"
							>
								shop by {e.category_name}
							</Link>
						</section>
					))}
				</main>
			</>
		</LazyMotions>
	);
}

export default Category;
