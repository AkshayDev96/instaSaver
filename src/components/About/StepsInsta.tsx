import Image from "next/image";
import React from "react";

const StepsInsta = () => {
  return (
    <div className="p-3">
      <h4 className="font-roboto text-[16px] font-semibold">
        Follow Steps to download the reels
      </h4>
      <p>
        Click on text box and allow the permission to auto paste.
        <Image
          src="/images/allow-permission.png"
          alt="no image"
          width={350}
          height={350}
        />
      </p>
      <ul className="list-disc px-4">
        <li>Step 1 : Go to instagram reels sections. </li>
        <li>
          Step 2 : Click on share icon and then the reel video link will be
          copied.{" "}
        </li>
        <li>Step 3 : Paste the link here at the text box. </li>
        <li>Step 4 : Click on Download </li>
      </ul>
    </div>
  );
};

export default StepsInsta;
