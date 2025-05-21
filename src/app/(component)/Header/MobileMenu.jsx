"use client";
import { useState, useEffect } from "react";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems = [
    { name: "News", path: "/news" },
    { name: "Prices", path: "/prices" },
    { name: "Documentaries", path: "/documentaries" },
    { name: "Newsletters", path: "/newsletters" },
    { name: "Sponsored", path: "/sponsored" },
    { name: "Events", path: "/events" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 hover:bg-gray-100 cursor-pointer rounded-full transition-colors duration-200"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <MenuIcon className="h-6 w-6 text-royal-indigo" />
      </button>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] max-w-sm bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 left-4 p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="Close menu"
        >
          <X className="h-6 w-6 text-royal-indigo" />
        </button>

        <nav className="flex flex-col items-center justify-center h-full space-y-3 p-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`relative w-full text-center py-2 text-lg font-medium transition-colors duration-200 ${
                pathname === item.path
                  ? "text-purple-700 font-semibold"
                  : "text-royal-indigo hover:text-purple-700"
              }`}
              aria-current={pathname === item.path ? "page" : undefined}
            >
              {item.name}
              {pathname === item.path && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-purple-700 rounded-full" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
