import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Import Trash icon

export default function History({ history, onDelete }) {
  const [search, setSearch] = useState("");

  const filteredHistory = history.filter((entry) =>
    entry.longUrl.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mt-6 bg-gradient-to-r from-[#1f2a38] to-[#1f2a38] via-[#3a4a60] rounded-lg shadow-2xl p-6 transition-all duration-300">
      <input
        type="text"
        placeholder="Search history"
        className="w-full mb-4 p-3 border border-transparent rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="space-y-3">
        {filteredHistory.map((entry, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="flex flex-col">
              <p className="truncate text-sm text-gray-300 hover:text-white transition-all duration-300">
                {entry.longUrl}
              </p>
              <a
                href={entry.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline text-sm mt-1 hover:text-blue-300 transition-all duration-300"
              >
                {entry.shortUrl}
              </a>
            </div>
            <button
              onClick={() => onDelete(index)}
              className="text-red-500 hover:text-red-700 transition-colors duration-300 text-sm"
              aria-label="Delete URL"
            >
              <FaTrashAlt size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
