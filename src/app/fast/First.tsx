"use client";

import { FastGroupWithAll } from "@/types/fastGroup";
import { FastTimetableWithKomas } from "@/types/fastTimetable";
import { useQRCode } from "react-qrcodes";
import { usePathname } from "next/navigation";
import { RefObject } from "react";
import { faClipboard, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const inviteUrl = `${baseUrl}${path}/invite`;
  const [inputRef] = useQRCode({
    text: inviteUrl,
    options: {
      level: "H", //誤り訂正レベル
      margin: 3, //QRコードの周りの空白マージン
      scale: 1,
      width: 350,
    },
  });

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };
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
      <div className="text-xl font-bold text-center">
        グループが作成されました！<br></br>早速、友人を招待しましょう！！
      </div>
      <div className="flex flex-col items-center my-8">
        <div className="font-bold text-4xl">{fastGroup.name}</div>
        <canvas
          id="canvas"
          ref={inputRef as unknown as RefObject<HTMLCanvasElement>}
        />
        <button className="btn btn-lg btn-primary" onClick={saveCanvas}>
          DownLoad
          <FontAwesomeIcon icon={faDownload} size="lg" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-4 my-4">
        <div className="font-bold text-lg">URLで共有する</div>
        <button
          className="btn btn-secondary"
          onClick={() => copyTextToClipboard(inviteUrl)}
        >
          URLをコピー
          <FontAwesomeIcon icon={faClipboard} size="lg" />
        </button>
      </div>
    </>
  );
}
