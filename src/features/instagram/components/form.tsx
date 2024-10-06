"use client";

import React, { useState } from "react";

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
import { event } from "nextjs-google-analytics";

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

  // async function downloadFile(url: any, filename: any) {
  //   event("Click", { category: "Downloads" });
  //   const response = await fetch(url);
  //   const blob = await response.blob();

  //   // Create a temporary link element
  //   const link = document.createElement("a");
  //   const urlBlob = URL.createObjectURL(blob);

  //   // Set the href and download attributes
  //   link.href = urlBlob;
  //   link.download = filename;

  //   // Append to the body
  //   document.body.appendChild(link);

  //   // Trigger the download
  //   link.click();

  //   // Cleanup
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(urlBlob);
  // }

  async function downloadFile(url: string, filename: string) {
    // Log the click event
    event("Click", { category: "Downloads" });

    try {
        const response = await fetch(url);

        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const urlBlob = URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = urlBlob;
        link.download = filename;

        // Attempt to trigger the download
        const msSaveOrOpenBlob = (window.navigator as any).msSaveOrOpenBlob; // Cast to any for compatibility
        if (msSaveOrOpenBlob) {
            // For IE
            msSaveOrOpenBlob.call(window.navigator, blob, filename);
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // For iOS
            window.open(urlBlob); // Open in a new tab
        } else {
            // For other browsers
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Cleanup
        URL.revokeObjectURL(urlBlob);
    } catch (error) {
        console.error("Download error:", error);
    }
}


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { postUrl } = values;
    try {
      setVideoLink("");
      const videoInfo = await getVideoInfo({ postUrl });

      const { filename, videoUrl } = videoInfo;
      // console.log(videoInfo);
      setVideoLink(videoUrl);
      form.reset();
      downloadFile(videoUrl, filename);
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-4 flex w-full max-w-2xl flex-col items-center rounded-lg border bg-accent/20 px-4 pb-16 pt-8 shadow-md shadow-md sm:px-8"
      >
        <div>
          <h4 className="text-white">Free instagram downloader with no ads</h4>
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
            className="right-1 top-1 w-full sm:absolute sm:w-fit"
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
            Your Video is Downloaded!
          </h4>
          <video src={videoLink} controls width={250} height={150} />
          <p className="w-[250px] pt-3 text-center text-xs text-muted-foreground">
            If the download opens a new page, right click the video and then
            click Save as video.
          </p>
        </div>
      ) : null}
    </Form>
  );
}
