"use client";
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

import { useState } from "react";
import axios from "axios";
import LinkCard from "@/components/ui/LinkCard";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Head from "next/head";
import YouTubeAbout from "@/components/About/YouTubeAbout";
import StepsYT from "@/components/About/StepsYT";

const formSchema = z.object({
  url: z.string().url({
    message: "Provide a valid Youtube video link",
  }),
});

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [videoDetails, setVideoDetails] = useState<ResponseType | undefined>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { url } = values;
    if (!url) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    try {
      setLoading(true);
      // downloadFile(url, "ytVideo.mp4", "Insta Downloads");
      const response = await axios.get(`/api/meta_info_yt?url=${url}`);
      if (response.status === 400) {
        alert("Invalid YouTube URL");
        setLoading(false);
        return;
      }
      if (response.data && response.data) {
        console.log(response.data);
        setVideoDetails(response.data);
        form.reset();
      }
    } catch (error) {
      alert("Failed to download video. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const pasteUrl = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) form.setValue("url", text);
    } catch (e: any) {
      console.error(e);
    }
  };

  const YT_Form = () => (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-4 flex  w-full max-w-2xl flex-col items-center rounded-lg border bg-[#000] bg-accent/20 px-4 pb-16 pt-8 shadow-md shadow-md sm:px-8"
      >
        <div>
          <h4 className="text-white">Free Youtube downloader with no ads</h4>
        </div>
        <div className="mb-2 h-6 w-full px-2 text-start text-red-500">{""}</div>

        <div className="relative mb-6 flex w-full flex-col items-center gap-4 sm:flex-row">
          <FormField
            control={form.control}
            name="url"
            render={({ field }: any) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    onClick={() => pasteUrl()}
                    disabled={loading}
                    type="url"
                    placeholder="Paste your YouTube Video link here..."
                    className="h-12 w-full sm:pr-28"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            type="submit"
            className="right-1 top-1 w-full text-white sm:absolute sm:w-fit"
          >
            {loading ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              <CopyIcon className="mr-2" />
            )}
            {loading ? "Getting Video Please" : "Get Video"}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <div className="mt-5">
      <Head>
        <title>Fast Quick Saver - YouTube Videos Downloader</title>
        <meta
          name="title"
          content="Fast Quick Saver - YouTube Videos Downloader"
        />
        <meta
          name="description"
          content="Fast Quick Saver makes it quick and easy. Our user-friendly interface allows you to capture your favorite YouTube moments without any hassle."
        />
        <meta
          name="keywords"
          content="YouTube downloader, save YouTube posts, download YouTube stories, Instagram video saver, Instagram content downloader, easy Instagram saves, no sign-up required, privacy-focused downloader, mobile-friendly Instagram tool, fast Instagram downloads, capture Instagram moments, hassle-free Instagram saving, best Instagram saver, quick content downloader, download Instagram images, safe Instagram downloads, user-friendly Instagram tool, Instagram content manager, save IG videos, Instagram media downloader."
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Akshay Verma" />
        <link rel="icon" type="image/x-icon" href="/favicon-16x16.png" />
      </Head>
      <div className="flex flex-col py-8">
        <h1 className="gradient-text-yt mb-8 text-balance border-white text-center text-4xl font-extrabold shadow-lg">
          Youtube Video Downloader
        </h1>
        <section className=" flex flex-col items-center justify-center gap-4">
          <YT_Form />
          <div className="flex justify-center px-3 py-3">
            {videoDetails && videoDetails !== null ? (
              <LinkCard {...videoDetails} />
            ) : null}
          </div>
          <StepsYT />
        </section>
        <div className="flex py-5">
          <div className="w-full">
            <YouTubeAbout />
          </div>
        </div>
      </div>
    </div>
  );
}
