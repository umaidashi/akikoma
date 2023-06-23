"use client";
import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  return (
    <div className="fixed bottom-0 left-0 z-10 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <Link
          href={"/home"}
          className={`inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${
            path === "home" && "bg-gray-50"
          }`}
        >
          <svg
            className={`w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-500 
            ${path === "home" && "text-pink-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            ></path>
          </svg>
          <span
            className={`text-xs text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-500 ${
              path === "home" && "text-pink-600"
            }`}
          >
            Home
          </span>
        </Link>
        <Link
          href={"/group"}
          className={`inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${
            path === "group" && "bg-gray-50"
          }`}
        >
          <svg
            className={`w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-500 
            ${path === "group" && "text-pink-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
            ></path>
          </svg>
          <span
            className={`text-xs text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-500 ${
              path === "group" && "text-pink-600"
            }`}
          >
            Group
          </span>
        </Link>
        <Link
          href={"/following"}
          className={`inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${
            path === "following" && "bg-gray-50"
          }`}
        >
          <svg
            className={`w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-500 
            ${path === "following" && "text-pink-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
          </svg>
          <span
            className={`text-xs text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-500 ${
              path === "following" && "text-pink-600"
            }`}
          >
            Following
          </span>
        </Link>
        <Link
          href={"/mypage"}
          className={`inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${
            path === "mypage" && "bg-gray-50"
          }`}
        >
          <svg
            className={`w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-500 
            ${path === "mypage" && "text-pink-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            ></path>
          </svg>
          <span
            className={`text-xs text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-500 ${
              path === "mypage" && "text-pink-600"
            }`}
          >
            My Page
          </span>
        </Link>
      </div>
    </div>
  );
}
