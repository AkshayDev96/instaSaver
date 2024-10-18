// pages/api/download.ts
import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";
import cookie from "../download/cookie.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url || !ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  try {
    // (Optional) http-cookie-agent / undici agent options
    // Below are examples, NOT the recommended options
    // const response = await fetch("https://api.ipify.org?format=json");
    // const data = await response.json();
    // (Optional) http-cookie-agent / undici agent options
    // Below are examples, NOT the recommended options
    const cookite2 = [
      {
        name: cookie[0].name,
        value: cookie[0].value,
        expirationDate: cookie[0].expirationDate,
        domain: cookie[0].domain,
        path: cookie[0].path,
        secure: cookie[0].secure,
        httpOnly: cookie[0].httpOnly,
        hostOnly: cookie[0].hostOnly,
        sameSite: "no_restriction",
      },
    ];
    // agent should be created once if you don't want to change your cookie
    const agent = ytdl.createProxyAgent(
      { uri: "http://fastquicksaver.site/api" },
      cookite2
    );

    const info = await ytdl.getInfo(url, { agent: agent });

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
