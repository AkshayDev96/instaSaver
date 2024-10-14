// components/GTM.tsx
import { useEffect } from "react";

interface GTMProps {
  gtmId: string;
}

const GTM: React.FC<GTMProps> = ({ gtmId }) => {
  useEffect(() => {
    if (!gtmId) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    script.async = true;
    document.head.appendChild(script);
  }, [gtmId]);

  return null;
};

export default GTM;
