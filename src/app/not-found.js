"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
const NotFound = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0b0423] to-[#1a0c4c] text-white px-4">
      <div className="relative">
        <h1 className="text-[150px] md:text-[200px] font-bold text-purple-500/10 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="animate-bounce">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              Oops!
            </h2>
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold mt-4 text-white/90">
            Page Not Found
          </h3>
        </div>
      </div>
      <p className="text-lg text-gray-300 mt-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="mt-12 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="group px-6 py-3 cursor-pointer text-purple-200 hover:text-white border border-purple-400 hover:border-purple-500 rounded-lg transition-all duration-300 flex items-center space-x-2"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Go Back</span>
        </button>
        <button
          type="button"
          onClick={() => router.push("/", { scroll: false })}
          className="px-8 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
        >
          Back to Homepage
        </button>
      </div>
      <div className="mt-16 text-center text-sm text-gray-400">
        <p>Need help? Contact our support team at support@tojonews.com</p>
      </div>
    </div>
  );
};

export default NotFound;
