"use client";

import { ClimbingBoxLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <ClimbingBoxLoader size={15} color={"pink"} />
    </div>
  );
};

export default Loader;
