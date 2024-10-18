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
    const videoId = await ytdl.getVideoID(url);

    // Create the response stream
    const stream: any = ytdl(url, {
      agent:ytdl.createAgent(),
      quality: "highestvideo",
      filter: (format) => format.hasVideo && format.hasAudio,
    });

    // Set response headers
    const responseHeaders = new Headers({
      "Content-Disposition": `attachment; filename="${videoId}.mp4"`,
      "Content-Type": "video/mp4",
    });

    // Return the stream with headers
    return new NextResponse(stream, {
      headers: responseHeaders,
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
