import React from 'react';
// import Breadcrumbs from 'nextjs-breadcrumbs';
import { useRouter } from 'next/router';
import { FcHome } from 'react-icons/fc';
import Link from 'next/link';
function Breadcrumb() {
	const { asPath, query } = useRouter();
	const getPaths = asPath.split('/').filter((p) => !!p);
	return (
		<div className="flex w-full justify-center">
			<div className="text-xs sm:text-sm self-start shadow-md px-2 w-fit  flex-wrap flex items-center breadcrumbs">
				<ul>
					<li className="flex items-center gap-2">
						<FcHome className="w-4 h-4" />
						<Link href="/">Home</Link>
					</li>
					{getPaths.map((p, i) => (
						<li
							className="flex items-center gap-2"
							key={i + 'aazzz'}
						>
							<Link href={`${asPath}`}>
								{query.name && i === getPaths.length - 1
									? query.name
									: p}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Breadcrumb;
