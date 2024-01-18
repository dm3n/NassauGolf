import React from "react";

function CardSkeleton() {
	return (
		<div className="flex flex-col rounded-xl shadow-md overflow-hidden">
			<div className="dark:bg-gray-300 aspect-[.85] animate__animated animate__fadeOut animate__infinite animate__slow"></div>
			<div className="flex-1 px-4 py-8 space-y-4 sm:p-8 ">
				<div className="w-full h-6 rounded bg-gray-300 animate__animated animate__fadeOut animate__infinite animate__slow"></div>
				<div className="w-full h-6 rounded bg-gray-300 animate__animated animate__fadeOut animate__infinite animate__slow"></div>
				<div className="w-3/4 h-6 rounded bg-gray-300 animate__animated animate__fadeOut animate__infinite animate__slow"></div>
			</div>
		</div>
	);
}
export default CardSkeleton;
