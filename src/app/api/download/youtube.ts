/* eslint-disable import/no-anonymous-default-export */
import ytdl from "@distube/ytdl-core";
import fs from "fs";
import readline from "readline";


interface DataProp {
  videoInfo: any;
  status: number;
  formats: any;
}

// Function to get downloadable video link
async function getVideoInfo(videoId: string): Promise<DataProp | undefined> {
  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const info = await ytdl.getInfo(videoUrl);

    const data: any = {
      url: videoUrl,
      info: info.videoDetails,
      title: info.videoDetails.title,
      thumbnails: info.videoDetails.thumbnails
        ? info.videoDetails.thumbnails[3]
        : {},
    };
    return data;
  } catch (error) {
    console.error("Error retrieving MP4 link:", error);
  }
}

const getVideoDetails = async (videoId: string) => {
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  const videoStream = ytdl(url, {
    quality: "highestvideo",
  });

  const videoOutputPath = `./downloads/${videoId}_video.mp4`;

  // Download video
  videoStream.pipe(fs.createWriteStream(videoOutputPath));
  videoStream.on("progress", (chunkLength, downloaded, total) => {
    const percent = (downloaded / total) * 100;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`Downloading video: ${percent.toFixed(2)}%`);
  });

  videoStream.on("finish", () => {
    console.log(`\nFinished downloading video: ${videoOutputPath}`);
  });
  return videoStream;
};

export default { getVideoDetails, getVideoInfo };
