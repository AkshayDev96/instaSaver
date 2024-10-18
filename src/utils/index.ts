import { event } from "nextjs-google-analytics";

async function downloadFile(url: string, filename: string, label?: string) {
  // Log the click event
  event("Click", { category: label ? label : "Download" });

  try {
    const response = await fetch(url);

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();

    // Create a URL for the Blob
    const urlBlob = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = urlBlob;
    link.download = filename;

    // For iOS devices, we need to handle it differently
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Create a FileReader to read the Blob as a data URL
      const reader = new FileReader();
      reader.onloadend = function () {
        const dataUrl = reader.result as string;
        const newLink = document.createElement("a");
        newLink.href = dataUrl;
        newLink.download = filename;
        document.body.appendChild(newLink);
        newLink.click();
        document.body.removeChild(newLink);
        URL.revokeObjectURL(urlBlob);
      };
      reader.readAsDataURL(blob);
    } else {
      // For other browsers
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(urlBlob);
    }
  } catch (error) {
    console.error("Download error:", error);
  }
}

export default downloadFile;
