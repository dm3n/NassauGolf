import React from "react";
const typo =
	"text-sm text-gray-700 sm:text-lg  lg:text-xl xl:text-2xl max-w-3xl xl:max-w-4xl text-center mx-auto";

function About({ info }) {
	return (
		<section className="mt-[142px] min-h-screen mb-16 py-6 px-12">
			<main className="grid grid-cols-1  gap-8">
				{info.description && (
					<section className=" mt-16">
						<h1 className="container_title uppercase text-center text-3xl xs:text-4xl mb-12">
							<span className="text-white bg-black px-2 py-1">about</span> us
						</h1>
						<p className={`${typo} whitespace-pre-wrap`}>{info.description}</p>
					</section>
				)}
				{info.mission_statement && (
					<section className=" mt-16 justify-center">
						<p className="container_title uppercase text-center text-3xl xs:text-4xl mb-12">
							our <span className="text-white  bg-black px-2 py-1">mission</span>
						</p>
						<p className={`${typo}   whitespace-pre-wrap`}>
							{info.mission_statement}
						</p>
					</section>
				)}
				{info.additional_fields &&
					info.additional_fields.map((f, i) => {
						const num = Number.isInteger((i + 2) / 2);
						const field = f.field_name.split(" ");
						return (
							<section className=" mt-16 justify-center" key={i + "raaa<<w"}>
								<p className="container_title uppercase text-center flex gap-1 justify-center items-center text-3xl xs:text-4xl mb-12">
									{field.length > 1 ? (
										<>
											{num
												? field.map((e, i) => (
														<span
															key={i + "^^^^^"}
															className={i === 0 && "text-white  bg-black px-2 py-1"}
														>
															{e}
														</span>
												  ))
												: field.map((e, i) => (
														<span
															key={i + 457685945 + "ee"}
															className={
																i === field.length - 1 && "text-white  bg-black px-2 py-1"
															}
														>
															{e}
														</span>
												  ))}
										</>
									) : (
										<span className="text-white  bg-black px-2 py-1">{f.field_name}</span>
									)}
								</p>
								<p className={`${typo} whitespace-pre-wrap`}>{f.field_value}</p>
							</section>
						);
					})}
			</main>
		</section>
	);
}

export default About;
