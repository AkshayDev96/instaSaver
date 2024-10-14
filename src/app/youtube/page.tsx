"use client";

import { useState } from "react";
import axios from "axios";
import LinkCard from "@/components/ui/LinkCard";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);

  const handleDownload = async () => {
    if (!url) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`/api/download?url=${url}`);

      if (response.status === 400) {
        alert("Invalid YouTube URL");
        setLoading(false);
        return;
      }

      //   const blob = await response.blob();
      //   const downloadUrl = URL.createObjectURL(blob);

      //   const link = document.createElement("a");
      //   link.href = downloadUrl;
      //   link.download = "video.mp4";
      //   link.click();
      if (response.data && response.data?.videoInfo) {
        console.log(response.data?.videoInfo);
        setData(response.data?.videoInfo?.info);
      }
    } catch (error) {
      alert("Failed to download video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>YouTube Downloader</h1>
      <input
        type="text"
        className="rounded bg-[#f1f1f1] px-3 py-3 text-red-500"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        style={{ width: "300px" }}
      />{" "}
      <button
        onClick={handleDownload}
        className="rounded bg-blue-500 px-3 py-3"
        disabled={loading}
      >
        {loading ? "Downloading..." : "Download"}
      </button>
      <div className="w-half px-3 py-3">
        {data && data?.length > 0
          ? data.map((item: any, i: number) => <LinkCard key={i} {...item} />)
          : null}
      </div>
    </div>
  );
}
