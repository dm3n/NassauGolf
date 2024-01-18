import React from 'react';
import { useState } from 'react';
import { useCartContext } from '@/context/cartContext';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import ProductModal from './ProductModal';
import { m } from 'framer-motion';
import LazyMotions from '@/components/LazyMotions';

function ModalContainer() {
	const { modal, setModal } = useCartContext();
	//
	return (
		<LazyMotions>
			<>
				{modal && (
					<m.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 0.3,
							type: 'spring',
						}}
						exit={{ opacity: 0 }}
						className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center  ${
							modal
								? 'opacity-100 scale-100 z-[900]'
								: 'opacity-0 -z-[200]'
						}  duration-300 ease-in-out transition-all `}
					>
						<div
							className=" bg-gray-500 opacity-70 absolute top-0 left-0 w-full h-full z-50"
							onClick={() => setModal(null)}
						></div>
						<m.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{
								duration: 0.3,
								type: 'spring',
							}}
							exit={{ scale: 0, opacity: 0 }}
							className={`modal-box min-w-[280px] w-[97%] max-w-3xl  relative z-[1000] px-1 sm:px-5`}
						>
							<span className="absolute w-fit top-3 right-3 z-[12000] cursor-pointer">
								<AiOutlineCloseSquare
									onClick={() => setModal(null)}
									className="w-6 h-6 hover:text-red-600 transition-colors duration-300 ease-linear"
								/>
							</span>
							<ProductModal modal={modal} />
						</m.div>
					</m.div>
				)}
			</>
		</LazyMotions>
	);
}

export default ModalContainer;
