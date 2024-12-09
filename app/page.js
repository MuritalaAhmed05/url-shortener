"use client";
import { useState } from "react";
import Header from "./components/Header";
import ShortenerForm from "./components/ShortenerForm";
import History from "./components/History";
import QRCodeDisplay from "./components/QRCodeDisplay";
import { FaCopy, FaShareAlt, FaExternalLinkAlt, FaMoon, FaSun, FaQrcode } from "react-icons/fa"; // Import QR Code icon

export default function Home() {
  const [history, setHistory] = useState([]);
  const [shortUrl, setShortUrl] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false); // State to toggle QR code visibility

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleShorten = async (longUrl) => {
    const url = `https://tinyurl.com/api-create.php?url=${longUrl}`;

    try {
      const response = await fetch(url);
      const shortUrl = await response.text();
      setShortUrl(shortUrl);
      setHistory([{ longUrl, shortUrl }, ...history]);
    } catch {
      alert("Failed to shorten URL");
    }
  };

  const handleDelete = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  // Button handlers
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("URL copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Shortened URL",
          url: shortUrl,
        })
        .catch((err) => alert("Failed to share URL"));
    } else {
      alert("Share functionality not supported on this device");
    }
  };

  const handleVisit = () => {
    window.open(shortUrl, "_blank");
  };

  const toggleQRCode = () => {
    setShowQRCode((prev) => !prev); // Toggle the visibility of the QR code
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <Header onToggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="flex flex-col items-center p-4">
        <ShortenerForm onShorten={handleShorten} />

        {shortUrl && (
          <div className="mt-6 w-full max-w-md p-6 bg-gradient-to-r from-[#1f2a38] to-[#3a4a60] rounded-lg shadow-2xl text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-3xl">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Shortened URL:
            </h2>
            <p className="text-xl sm:text-2xl text-blue-400 font-semibold">
              {shortUrl}
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <div className="relative group">
                <button
                  onClick={handleCopy}
                  className="p-3 rounded-full text-white bg-blue-500 hover:bg-blue-400 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Copy URL"
                >
                  <FaCopy size={20} />
                </button>
                <span className="text-nowrap absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Copy URL
                </span>
              </div>
              <div className="relative group">
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full text-white bg-green-500 hover:bg-green-400 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Share URL"
                >
                  <FaShareAlt size={20} />
                </button>
                <span className="text-nowrap absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Share URL
                </span>
              </div>
              <div className="relative group">
                <button
                  onClick={handleVisit}
                  className="p-3 rounded-full text-white bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Visit Website"
                >
                  <FaExternalLinkAlt size={20} />
                </button>
                <span className="text-nowrap absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Visit Website
                </span>
              </div>
              {/* QR Code Button */}
              <div className="relative group">
                <button
                  onClick={toggleQRCode} // Toggle QR code visibility
                  className="p-3 rounded-full text-white bg-purple-500 hover:bg-purple-400 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Show QR Code"
                >
                  <FaQrcode size={20} />
                </button>
                <span className="text-nowrap absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Show QR Code
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Display QR Code if visible */}
        {showQRCode && shortUrl && (
          <div className="mt-6 w-full max-w-md p-6 bg-gradient-to-r from-[#1f2a38] to-[#3a4a60] rounded-lg shadow-2xl text-center flex justify-center items-center text-white font-bold ">
            <QRCodeDisplay shortUrl={shortUrl} />
          </div>
        )}
 {shortUrl && (
        <History history={history} onDelete={handleDelete} />
 )}
      </main>
    </div>
  );
}
