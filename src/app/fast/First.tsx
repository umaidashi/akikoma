"use client";

import { FastGroupWithAll } from "@/types/fastGroup";
import { FastTimetableWithKomas } from "@/types/fastTimetable";
import { useQRCode } from "react-qrcodes";
import { usePathname } from "next/navigation";
import { RefObject } from "react";

export default function First({
  fastGroup,
  fastTimetables,
  baseUrl,
}: {
  fastGroup: FastGroupWithAll;
  fastTimetables: FastTimetableWithKomas[];
  baseUrl: string;
}) {
  const path = usePathname();
  const [inputRef] = useQRCode({
    text: "https://google.com",
    options: {
      level: "H", //誤り訂正レベル
      margin: 3, //QRコードの周りの空白マージン
      scale: 1,
      width: 200,
    },
  });
  const saveCanvas = () => {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let a = document.createElement("a");

    if (!canvas) return;
    a.href = canvas.toDataURL("image/jpeg", 0.85);
    a.download = "download.jpg";
    a.click();
  };
  return (
    <>
      <div className="text-2xl font-bold text-center">
        グループが作成されました！<br></br>早速、友人を招待しましょう！！
      </div>
      <div>
        url:
        <a href={`${baseUrl}${path}/invite`}>{`${baseUrl}${path}/invite`}</a>
      </div>
      <canvas
        id="canvas"
        ref={inputRef as unknown as RefObject<HTMLCanvasElement>}
      />
      <button className="btn" onClick={saveCanvas}>
        DownLoad
      </button>
    </>
  );
}
