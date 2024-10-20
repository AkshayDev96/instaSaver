"use client";
import { InstagramVideoForm } from "@/features/instagram/components/form";
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import GTM from "@/components/GTM";
import InstaGramAbout from "@/components/About/InstaGramAbout";
import StepsInsta from "@/components/About/StepsInsta";
import Head from "next/head";

export default function HomePage() {
  usePageViews();

  return (
    <>
      <GoogleAnalytics />
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2563364424664462"
          crossOrigin="anonymous"
        ></script>
        <GTM gtmId="GTM-TG4JNMSW" />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TG4JNMSW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      </Head>
      <div className="flex flex-col py-8">
        <a
          href="https://gridehornyidentifier.com/u2z0bcsh6w?key=e2697b0e7f6f615588d673d0cdc000c7"
          target="_blank"
        >
          <h1 className="gradient-text mb-8 text-balance text-center text-4xl font-extrabold text-white">
            Instagram Video Downloader
          </h1>
        </a>
        <section className="flex flex-col items-center justify-center gap-4">
          <InstagramVideoForm />

          <a
            href="https://gridehornyidentifier.com/fvk0vrqiu?key=a251ee8f2e1f8a80501da8de6e5f3bac"
            target="_blank"
          >
            <StepsInsta />
          </a>
        </section>
        <div className="flex py-5">
          <div className="w-full">
            <a
              target="_blank"
              href="https://gridehornyidentifier.com/e5dtx09q?key=d640379fcf1d1993eb6dd1325cd3252d"
            >
              <InstaGramAbout />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
