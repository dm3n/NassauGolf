import { useState } from "react";
import { urlFor } from "@/lib/client";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";

export default function ImageShowCase({ images }) {
  // images must be an array of images
  const [activeImage, setActiveImage] = useState(0);
  const [toolTip, setToolTip] = useState(false);
  //
  if (toolTip) {
    setTimeout(() => {
      setToolTip(false);
    }, 5000);
  }

  return (
    <>
      <div className="absolute top-0 w-full left-0 h-full flex flex-row-reverse  justify-center">
        <>
          <div className="main-image w-[80%] cursor-zoom-in relative">
            <TransformWrapper
              className="w-full aspect-[.7]  cursor-zoom-in"
              initialScale={1}
              doubleClick={{
                mode: "zoomIn",
                step: 3,
              }}
              maxScale={3}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                  <TransformComponent className=" cursor-zoom-in">
                    <img
                      src={urlFor(images[activeImage].asset._ref).url()}
                      alt="product image"
                      className="w-full h-full object-cover cursor-zoom-in object-center"
                      sizes="160px"
                    />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </>
        {images.length > 1 && (
          <div
            className={`flex  w-full  pl-1 xs:p-0 aspect-[.85] gap-3 max-w-[55px]  flex-col  mr-1 sm:mr-0  `}
          >
            {images.map((img, i) => (
              <div
                key={i + "ghghiii++"}
                className={`${
                  activeImage === i && "hidden"
                } relative w-full aspect-[.85] flex  justify-center`}
                onClick={() => setActiveImage(i)}
              >
                <img
                  src={urlFor(img.asset._ref).url()}
                  className="absolute top-0 left-0 w-ful h-full object-center object-contain cursor-pointer"
                  alt="product image "
                  sizes="55px"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
