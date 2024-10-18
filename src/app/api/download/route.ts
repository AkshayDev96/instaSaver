// pages/api/download.ts
import { NextRequest, NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";
import cookie from "./cookie.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url || !ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  try {
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
    const agent = ytdl.createAgent(cookite2);
    // agent should be created once if you don't want to change your cookie
    // const agent = ytdl.createAgent(cookies, agentOptions);

    const videoId = await ytdl.getVideoID(url);

    // Create the response stream
    const stream: any = ytdl(url, {
      agent: agent,
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
