import { useState } from "react";

export default function ShortenerForm({ onShorten }) {
  const [longUrl, setLongUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (longUrl) {
      onShorten(longUrl); // Pass only longUrl to the onShorten function
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-gradient-to-r from-[#1f2a38] to-[#3a4a60] rounded-xl shadow-lg p-6 sm:p-8 md:p-10 space-y-6 transition-transform transform hover:scale-105 ease-in-out"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4">Shorten Your URL</h2>

      <div className="space-y-6">
        <div>
          <input
            type="url"
            placeholder="Enter your long URL"
            className="w-full p-4 border-2 border-transparent rounded-lg bg-white dark:bg-[#2c3e50] text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md transition-all duration-300 ease-in-out"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r to-[#1f2a38] from-[#3a4a60] text-white rounded-xl shadow-lg hover:to-[#2c3e50] hover:from-[#3a4a60] transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-400"
          disabled={!longUrl}
        >
          Shorten URL
        </button>
      </div>

      <div className="text-center text-white mt-4 opacity-75">
        <p className="text-sm sm:text-base md:text-lg">Get your URL shortened in just one click!</p>
      </div>
    </form>
  );
}
