import { FaSpinner } from "react-icons/fa";

export default function GlobalLoading() {
  return (
    <div className="flex min-h-[73vh] items-center justify-center bg-white dark:bg-slate-900">
      <FaSpinner className="animate-spin text-indigo-500 text-5xl" />
    </div>
  );
}
