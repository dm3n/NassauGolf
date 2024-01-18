import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiEntryDoor } from "react-icons/gi";
function Button({ text, shouldLoad, className, short = false, }) {
  const [isClicked, setIsClicked] = useState(false);
  if (isClicked && short) {
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  }

  return (
    <button
      className={` w-full btn-primary py-4 px-8 slide whitespace-nowrap flex items-center duration-500 ease-linear transition-all justify-center gap-2 ${className}`}
      onClick={() => setIsClicked(true)}
      disabled={isClicked}
    >
      {shouldLoad && isClicked && (
        <span className={`block`}>
          <AiOutlineLoading3Quarters className="animate-spin" />
        </span>
      )}
      <span className=" capitalize">{text}</span>
      {text === "Sign-in" &&  <GiEntryDoor/> }
    </button>
  );
}

export default Button;
