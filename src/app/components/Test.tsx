"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form({ user }: { user: User }) {
  const [template, setUniversity] = useState("");
  const router = useRouter();
  const onClick = async () => {
    if (!template) return;
    axios
      .post("/api/template", { name: template, userId: user.id })
      .then(() => {
        setUniversity("");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        router.refresh();
      });
  };

  const onChange = (value: string) => {
    setUniversity(value);
  };

  return (
    <div>
      <input
        type="text"
        value={template}
        onChange={(e) => onChange(e.target.value)}
        className="border"
      />
      <button onClick={onClick}>addUni</button>
    </div>
  );
}
