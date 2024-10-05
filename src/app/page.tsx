import { InstagramVideoForm } from "@/features/instagram/components/form";
import Image from "next/image";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Fast Quick Saver</title>
        <meta name="title" content="Fast Quick Saver" />
        <meta
          name="description"
          content=", Fast Quick Saver makes it quick and easy. Our user-friendly interface allows you to capture your favorite Instagram moments without any hassle."
        />
        <meta
          name="keywords"
          content="Instagram downloader, save Instagram posts, download Instagram stories, Instagram video saver, Instagram content downloader, easy Instagram saves, no sign-up required, privacy-focused downloader, mobile-friendly Instagram tool, fast Instagram downloads, capture Instagram moments, hassle-free Instagram saving, best Instagram saver, quick content downloader, download Instagram images, safe Instagram downloads, user-friendly Instagram tool, Instagram content manager, save IG videos, Instagram media downloader."
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="Akshay Verma" />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-38G37WWWWW`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-38G37WWWWW');
              `,
          }}
        />
      </Head>
      <div className="flex flex-col py-8">
        <h1 className="gradient-text mb-8 text-balance text-center text-4xl font-extrabold text-white">
          Instagram Video Downloader
        </h1>
        <section className="flex flex-col items-center justify-center gap-4">
          <InstagramVideoForm />
          <div className="p-3">
            <h4 className="font-roboto text-[16px] font-semibold">
              Follow Steps to download the reels
            </h4>
            <p>
              Click on text box and allow the permission to auto paste.
              <Image
                src="/images/allow-permission.png"
                alt="no image"
                width={350}
                height={350}
              />
            </p>
            <ul className="list-disc px-4">
              <li>Step 1 : Go to instagram reels sections. </li>
              <li>
                Step 2 : Click on share icon and then the reel video link will
                be copied.{" "}
              </li>
              <li>Step 3 : Paste the link here at the text box. </li>
              <li>Step 4 : Click on Download </li>
            </ul>
          </div>
        </section>
        <div className="flex py-5">
          <div className="w-half justify-center">
            <h3 className="font-roboto text-lg font-bold">
              About Fast Quick Saver
            </h3>
            <p className="py-3">
              Welcome to Fast Quick Saver, the ultimate tool for effortlessly
              saving Instagram content! Whether you want to download posts,
              stories, or videos, Fast Quick Saver makes it quick and easy. Our
              user-friendly interface allows you to capture your favorite
              Instagram moments without any hassle.
            </p>
            <h4>Key Features:</h4>
            <ul className="list-disc px-4">
              <li>
                <strong>Instant Downloads:</strong> Save Instagram content in
                seconds.
              </li>
              <li>
                <strong>No Sign-Up Required:</strong> Enjoy a seamless
                experience without the need for accounts or logins.
              </li>
              <li>
                <strong>Privacy First:</strong> We prioritize your privacy; your
                data stays safe with us.
              </li>
              <li>
                <strong>Mobile Friendly:</strong> Access Fast Quick Saver on any
                device, anywhere, anytime.
              </li>
            </ul>
            👉 Visit us at{" "}
            <a href="https://www.fastquicksaver.site">
              https://www.fastquicksaver.site
            </a>{" "}
            to learn more!
          </div>
        </div>
      </div>
    </>
  );
}
