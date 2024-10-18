// pages/api/download.ts
import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url || !ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(url, { agent: ytdl.createAgent() });

    // Choose the format with both video and audio streams in MP4 format.
    const format = ytdl.chooseFormat(info.formats, {
      filter: (format) =>
        format.container === "mp4" &&
        format.hasVideo === true &&
        format.hasAudio === true,
    });

    return NextResponse.json({
      status: 200,
      title: info.videoDetails.title,
      thumbnail:
        info.videoDetails.thumbnails?.length > 0
          ? info.videoDetails.thumbnails[2]?.url
          : "",
      formats: format.qualityLabel ? format : "",
      YT_link: info.videoDetails.video_url,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Error processing request",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
