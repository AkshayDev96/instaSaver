import React from "react";

type props = {
  url: string;
  mimeType: string;
  hasVideo: any;
  height: any;
};

const LinkCard = (data: props) => {
  return (
    <div className="mb-5 w-auto rounded bg-green-500 px-1 py-1">
      <a
        href={data.url}
        target="_blank"
        download
        className="outline-one italic"
      >
        {data.mimeType.split(";")[0] + " "}
        {data.hasVideo ? data.height + "p" : ""}
      </a>
    </div>
  );
};

export default LinkCard;
