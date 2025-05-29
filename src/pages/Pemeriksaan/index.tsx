// src/pages/Pemeriksaan.tsx (or your file structure)
import React from "react";
import Sidebar from "../../components/Sidebar"; // Assuming Sidebar is typed or a JS component
// For Sidebar, if it's a JS component, you might not need a specific import type or use `any` if issues arise.
// If Sidebar is TS, ensure its props are typed.

import InformasiIbu from "./subpages/InformasiIbu";

interface PlaceholderProps {
  className?: string;
}

const IconPlaceholder: React.FC<PlaceholderProps> = ({
  className = "w-5 h-5",
}) => <div className={`bg-gray-400 rounded ${className}`}></div>;
const UserCirclePlaceholder: React.FC<PlaceholderProps> = ({
  className = "w-10 h-10",
}) => <div className={`bg-gray-400 rounded-full ${className}`}></div>;
const FileAltPlaceholder: React.FC<PlaceholderProps> = ({
  className = "w-4 h-4 mr-2",
}) => <div className={`bg-white rounded ${className}`}></div>;

const Pemeriksaan: React.FC = () => {
  return (
    <div className="h-screen bg-gray-200 flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 font-poppins bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-pink-500">Pemeriksaan</h1>{" "}
            {/* Adjusted color */}
            <p className="text-gray-500 text-sm">
              Selamat datang di halaman Pemeriksaan ibu!
            </p>
          </div>
          <div className="flex items-center">
            <button className="bg-pink-500 text-white px-3 py-1.5 rounded-lg flex items-center shadow-sm hover:bg-pink-600 text-sm">
              {" "}
              {/* Adjusted color */}
              <FileAltPlaceholder className="w-3 h-3 mr-1" />
              Lembar Pemantauan
            </button>
            <UserCirclePlaceholder className="w-8 h-8 ml-3" />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <nav className="flex space-x-1">
            <a
              href="#"
              className="bg-gray-50 text-pink-500 px-4 py-2 rounded-t-lg font-medium text-sm" /* Adjusted color */
            >
              Informasi Ibu
            </a>
            <a
              href="#"
              className="text-gray-500 px-4 py-2 rounded-t-lg font-medium hover:bg-gray-100 text-sm"
            >
              Pemeriksaan ANC
            </a>
            <a
              href="#"
              className="text-gray-500 px-4 py-2 rounded-t-lg font-medium hover:bg-gray-100 text-sm"
            >
              Pemeriksaan Leopold
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <InformasiIbu />
      </div>
    </div>
  );
};

export default Pemeriksaan;
