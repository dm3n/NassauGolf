import { useState, useEffect } from "react";
import { useCartContext } from "@/context/cartContext";
import { BsBagFill } from "react-icons/bs";
import Image from "next/image";
export default function CartContainer() {
	const { setShowCart, cartItems } = useCartContext();
	const [hydrate, setHydrtae] = useState(false);
	useEffect(() => {
		if (window !== "undefiend") {
			setHydrtae(true);
		}
	}, []);
	return (
		<>
			{hydrate && (
				<div className="indicator">
					{cartItems.length > 0 && (
						<span
							className={`indicator-item top-1 z-[100] right-2  badge w-1 h-1 p-1 rounded-full bg-red-600`}
						></span>
					)}
					<Image
						src="/cart.png"
						alt="cart golf"
						className="cursor-pointer"
						quantity={40}
						onClick={() => setShowCart(true)}
						width={32}
						height={32}
					/>
				</div>
			)}
		</>
	);
}
