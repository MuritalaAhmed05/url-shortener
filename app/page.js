"use client"
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
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(""); // State for error message
  const [copiedMessage, setCopiedMessage] = useState(""); // State to show copy confirmation message
  const [shareError, setShareError] = useState(""); // State to show share error message

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleShorten = async (longUrl) => {
    const url = `https://tinyurl.com/api-create.php?url=${longUrl}`;
    setLoading(true); // Set loading state to true when starting the request
    setError(""); // Clear any previous errors

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const shortUrl = await response.text();
      setShortUrl(shortUrl);
      setHistory([{ longUrl, shortUrl }, ...history]);
    } catch (err) {
      setError("Failed to shorten URL. Please try another URL.");
    } finally {
      setLoading(false); // Set loading state to false when the request is done
    }
  };

  const handleDelete = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  // Button handlers
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        setCopiedMessage("URL copied to clipboard!");
        setTimeout(() => setCopiedMessage(""), 2000); // Clear the message after 2 seconds
      })
      .catch(() => {
        setCopiedMessage("Failed to copy URL.");
      });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Shortened URL",
          url: shortUrl,
        })
        .catch(() => {
          setShareError("Failed to share URL.");
        });
    } else {
      setShareError("Share functionality not supported on this device.");
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

        {/* Display Loading Indicator */}
        {loading && (
          <div className="mt-6 w-full max-w-md p-6 bg-gradient-to-r from-[#1f2a38] to-[#3a4a60] rounded-lg shadow-2xl text-center">
            <p className="text-xl sm:text-2xl text-white font-semibold">Shortening your URL...</p>
          </div>
        )}

        {/* Display Error Message */}
        {error && (
          <div className="mt-6 w-full max-w-md p-6 bg-red-500 text-white rounded-lg shadow-2xl text-center">
            <p className="text-xl sm:text-2xl font-semibold">{error}</p>
          </div>
        )}

        {/* Display Shortened URL */}
        {shortUrl && !loading && (
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

        {/* Display Copy Confirmation Message */}
        {copiedMessage && (
          <div className="mt-4 text-green-500 text-center">{copiedMessage}</div>
        )}

        {/* Display Share Error Message */}
        {shareError && (
          <div className="mt-4 text-red-500 text-center">{shareError}</div>
        )}

        {/* Display QR Code if visible */}
        {showQRCode && shortUrl && (
          <div className="mt-6 w-full max-w-md p-6 bg-gradient-to-r from-[#1f2a38] to-[#3a4a60] rounded-lg shadow-2xl text-center flex justify-center items-center text-white font-bold ">
            <QRCodeDisplay shortUrl={shortUrl} />
          </div>
        )}

        {/* Display History */}
        {shortUrl && (
          <History history={history} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}
