"use client";
import { useRouter } from "next/navigation";

export default function PageNotFound() {
  const router = useRouter();

  return (
    <div className="text-center my-52">
      <div className="text-3xl font-bold mb-4">Sorry...</div>
      <p>ページが見つかりませんでした</p>
      <div
        onClick={() => router.back()}
        className="text-white w-1/2  bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:opacity-70 cursor-pointer transition-opacity focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 mt-6 mx-auto "
      >
        前のページに戻る
      </div>
    </div>
  );
}
