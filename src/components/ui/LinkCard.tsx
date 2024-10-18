/* eslint-disable @next/next/no-img-element */
import downloadFile from "@/utils";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";

type ResponseType = {
  status: number;
  title: string;
  thumbnail: string;
  formats: {
    mimeType: string;
    qualityLabel: string;
    bitrate: number;
    audioBitrate: number;
    itag: number;
    url: string;
    width: number;
    height: number;
    lastModified: string;
    quality: string;
    fps: number;
    projectionType: string;
    audioQuality: string;
    approxDurationMs: string;
    audioSampleRate: string;
    audioChannels: number;
    hasVideo: boolean;
    hasAudio: boolean;
    container: string;
    codecs: string;
    videoCodec: string;
    audioCodec: string;
    isLive: boolean;
    isHLS: boolean;
    isDashMPD: boolean;
  };
  YT_link?: string;
};

const LinkCard = (data: ResponseType) => {
  // function openAndDownload(url: string, filename: string): void {
  //   // Open the URL in a new tab
  //   const newWindow = window.open(url, "_blank");

  //   // Check if the new window was successfully opened
  //   if (!newWindow) {
  //     console.error("Failed to open a new tab.");
  //     return;
  //   }

  //   // When the new tab loads, inject a script to download the media
  //   newWindow.onload = function () {
  //     // Create a temporary link element within the new window
  //     const link = newWindow.document.createElement("a");
  //     link.href = url;
  //     link.download = filename;

  //     // Add the link to the document, click it, and then remove it
  //     newWindow.document.body.appendChild(link);
  //     link.click();
  //     newWindow.document.body.removeChild(link);

  //     // Optionally, close the tab after the download starts
  //     newWindow.close();
  //   };
  // }

  // console.log("data--->qualityLabel", data.qualityLabel);
  // console.log("data--->mimeType", data.mimeType);
  // console.log("data--->url", data.url);

  const [isLoading, setLoader] = useState(false);

  const downloadNow = async () => {
    try {
      setLoader(true);
      data.YT_link &&
        (await downloadFile(
          `/api/download?url=${encodeURIComponent(data.YT_link)}`,
          "ytVideo.mp4",
          "YouTube Downloads"
        ));
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <div className="mb-5 w-[450px] flex-row rounded bg-[#000]  py-3 shadow-lg">
      {data.title ? <h4 className="px-2 pb-2">{data.title}</h4> : ""}
      {data?.formats.url ? (
        <video
          controls
          className="font-roboto h-[250px] w-full rounded-[2px] px-3 font-bold "
          src={data?.formats.url ? data?.formats.url : ""}
          height={100}
          width={100}
        />
      ) : null}
      <div className="outline-one font-roboto flex flex-row px-3 py-3">
        Video Quality:{" "}
        <p className="font-roboto pl-1 font-bold">
          {data.formats.mimeType && (data.formats.mimeType + "").split(";")[0]
            ? (data.formats.mimeType + "").split(";")[0]?.toUpperCase()
            : " "}
          {"  "}
          {data.formats.qualityLabel ? data.formats.qualityLabel : ""}
        </p>
      </div>
      {data.YT_link ? (
        <div className="relative mb-6 flex w-full flex-col items-center gap-4 sm:flex-row">
          <Button
            disabled={isLoading}
            type="button"
            onClick={downloadNow}
            className="w-full text-white"
          >
            {isLoading ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              <Download className="mr-2" />
            )}
            {isLoading ? "Downloading Please Wait..." : "Download Video"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default LinkCard;
