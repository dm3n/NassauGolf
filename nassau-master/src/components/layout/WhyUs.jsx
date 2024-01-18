import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { SiAdguard } from 'react-icons/si';

function WhyUs() {
  return (
    <div className="  flex items-center gap-4 mb-32 flex-wrap pt-8">
      <div className="flex items-center gap-8 min-w-fit shadow-md py-6 border border-solid whitespace-nowrap px-4 flex-grow justify-center">
        <p>
          <FaShippingFast className="h-8 w-8 md:w-12 md:h-12 " />
        </p>
        <p className=" flex flex-col ">
          <span className=" text-lg md:text-xl text-gray-950 capitalize">
            Free Shipping
          </span>
          <span className="md:text-lg text-gray-800 text-base">
            Swift & Secure Shipping!
          </span>
        </p>
      </div>
      <div className="flex items-center gap-8 min-w-fit shadow-md py-6 border border-solid whitespace-nowrap px-4 flex-grow justify-center">
        <p>
          <RiSecurePaymentLine className="h-8 w-8 md:w-12 md:h-12 " />
        </p>
        <p className=" flex flex-col">
          <span className="text-lg md:text-xl text-gray-950 capitalize">
            secure payment
          </span>
          <span className="md:text-lg text-gray-800 text-base">
            Safe Checkout Guaranteed!
          </span>
        </p>
      </div>
      <div className="flex items-center gap-8 min-w-fit shadow-md py-6 border border-solid whitespace-nowrap px-4 flex-grow justify-center">
        <p>
          <SiAdguard className="h-8 w-8 md:w-12 md:h-12 " />
        </p>
        <p className=" flex flex-col">
          <span className="text-lg md:text-xl text-gray-950 capitalize">
            Money-Back Guarantee!
          </span>
          <span className="md:text-lg text-gray-800 text-base">
            Guaranteed Satisfaction!
          </span>
        </p>
      </div>
    </div>
  );
}

export default WhyUs;
