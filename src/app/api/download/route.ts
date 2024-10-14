import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url || !ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  try {
    const videoID: any = await ytdl.getURLVideoID(url);
    const metaInfo: any = await ytdl.getInfo(url);
    const data: any = {
      url: `https://www.youtube.com/embed/${videoID}`,
      info: metaInfo.formats,
    };
    return NextResponse.json({ videoInfo: data, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to download video" },
      { status: 500 }
    );
  }
}
