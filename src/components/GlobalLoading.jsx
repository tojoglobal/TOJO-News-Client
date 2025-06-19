"use client"
import { FaSpinner } from "react-icons/fa";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white">
      <div className="flex items-center mb-4">
        <FaSpinner className="animate-spin text-indigo-400 text-6xl mr-3" />
        <h1 className="text-3xl font-bold tracking-wide">TojoNews</h1>
      </div>
      <p className="text-sm text-slate-300 animate-pulse">
        Please wait... bringing you the latest news
      </p>
    </div>
  );
}
