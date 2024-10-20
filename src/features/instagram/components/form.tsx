"use client";

import React, { useEffect, useRef, useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

// import { downloadFile } from "@/lib/utils";
import { getHttpErrorMessage } from "@/lib/http";

import { useVideoInfo } from "@/services/api/queries";
import downloadFile from "@/utils";
import Head from "next/head";
import Script from "next/script";

const formSchema = z.object({
  postUrl: z.string().url({
    message: "Provide a valid Instagram post link",
  }),
});

export function InstagramVideoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postUrl: "",
    },
  });

  const [videoLink, setVideoLink] = useState<string>("");

  const { error, isPending, mutateAsync: getVideoInfo } = useVideoInfo();

  const httpError = getHttpErrorMessage(error);

  const showAds = () => {
    setTimeout(() => {
      document.getElementById("AutoClick")?.click();
    }, 3000);
  };

  useEffect(() => {
    showAds();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { postUrl } = values;
    try {
      setVideoLink("");
      const videoInfo = await getVideoInfo({ postUrl });

      const { filename, videoUrl } = videoInfo;
      // console.log(videoInfo);
      setVideoLink(videoUrl);
      form.reset();
      downloadFile(videoUrl, filename, "Insta Downloads");
      openInNewTab(
        "https://gridehornyidentifier.com/s8c5n87s86?key=a7cd9cb9d17ffa7b935e82fae57e7854"
      );
    } catch (error: any) {
      setVideoLink("");
      console.log(error);
    }
  }

  const pasteUrl = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) form.setValue("postUrl", text);
    } catch (e: any) {
      console.error(e);
    }
  };
  function openInNewTab(url: string) {
    var newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.focus(); // Focus the new tab if it's successfully opened
    } else {
      alert("Please allow pop-ups for this website"); // Notify if pop-ups are blocked
    }
  }

  return (
    <>
      <Head>
        <title>Fast Quick Saver - Instagram Video Reels Downloader</title>
        <meta
          name="title"
          content="Fast Quick Saver - Instagram Video Reels Downloader"
        />
        <meta
          name="description"
          content="Fast Quick Saver makes it quick and easy. Our user-friendly interface allows you to capture your favorite Instagram moments without any hassle."
        />
        <meta
          name="keywords"
          content="Instagram downloader, save Instagram posts, download Instagram stories, Instagram video saver, Instagram content downloader, easy Instagram saves, no sign-up required, privacy-focused downloader, mobile-friendly Instagram tool, fast Instagram downloads, capture Instagram moments, hassle-free Instagram saving, best Instagram saver, quick content downloader, download Instagram images, safe Instagram downloads, user-friendly Instagram tool, Instagram content manager, save IG videos, Instagram media downloader."
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Akshay Verma" />
        <link rel="icon" type="image/x-icon" href="/favicon-16x16.png" />
      </Head>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-4  flex w-full max-w-2xl flex-col items-center rounded-lg border bg-[#000] bg-accent/20 px-4 pb-16 pt-8 shadow-md shadow-md sm:px-8"
        >
          <div>
            <h4 className="text-white">
              <a
                href="https://gridehornyidentifier.com/u2z0bcsh6w?key=e2697b0e7f6f615588d673d0cdc000c7"
                target="_blank"
                id="Click1"
              >
                Free instagram downloader with no ads
              </a>
            </h4>
          </div>
          <div className="mb-2 h-6 w-full px-2 text-start text-red-500">
            {httpError}
          </div>

          <div className="relative mb-6 flex w-full flex-col items-center gap-4 sm:flex-row">
            <FormField
              control={form.control}
              name="postUrl"
              render={({ field }: any) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      onClick={() => pasteUrl()}
                      disabled={isPending}
                      type="url"
                      placeholder="Paste your Instagram link here..."
                      className="h-12 w-full sm:pr-28"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              type="submit"
              className="right-1 top-1 w-full text-white sm:absolute sm:w-fit"
            >
              {isPending ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : (
                <Download className="mr-2" />
              )}
              Download
            </Button>
          </div>
        </form>
        {videoLink ? (
          <div className="rounded bg-[#28272c] px-5 py-3 ">
            <h4 className="text-white-500 pb-2 text-center text-[16px] font-bold">
              <a href="https://gridehornyidentifier.com/s8c5n87s86?key=a7cd9cb9d17ffa7b935e82fae57e7854">
                Your Video is Downloaded!
              </a>
            </h4>
            <a
              target="_blank"
              id="Click3"
              href="https://gridehornyidentifier.com/a8zi7cpgj?key=51ce6ce8192235538d87d46d36c32b16"
            >
              <video src={videoLink} controls width={250} height={150} />
            </a>
            <p className="w-[250px] pt-3 text-center text-xs text-muted-foreground">
              If the download opens a new page, right click the video and then
              click Save as video.
            </p>
          </div>
        ) : null}
      </Form>
    </>
  );
}
