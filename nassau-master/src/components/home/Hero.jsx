import Link from "next/link";
import Image from "next/image";
import {urlFor} from "@/lib/client"
//
function Hero({heroImage}) {
  return (
    <section className="hero-section  mt-[112px] relative overflow-hidden bg-contain xs:bg-cover bg-no-repeat bg-center ">
      <Image
        src={urlFor(heroImage.asset._ref).url()}
        alt="image"
        fill
        className="object-cover"
        priority={true}
        quality={40}
        sizes="40vw"
      />
      <div className="filter bg-gray-900 opacity-50 absolute top-0 w-full h-full left-0 z-10"></div>
      <button className=" w-fit whitespace-nowrap border-2 py-4 px-8 z-20 text-white slide transition-all ease-in duration-300 hover:border-[#f472b6] border-solid border-white absolute bottom-16 -translate-x-1/2 left-1/2">
        <Link href="#shop">Shop now</Link>
      </button>
    </section>
  );
}

export default Hero;
