"use client";

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b0423] text-white px-4">
      <h1 className="text-9xl font-bold text-purple-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-300 mt-2 text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        type="button"
        onClick={() => router.push("/", { scroll: false })}
        // onClick={() => router.push("/")}
        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
