"use client";

import { University } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Form({ universities }: { universities: University[] }) {
  const [university, setUniversity] = useState("");
  const router = useRouter();
  const onClick = async () => {
    axios
      .post("/api/university", { name: university })
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

  const onDelete = async (id: string) => {
    axios
      .delete(`/api/university/${id}`)
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
        value={university}
        onChange={(e) => onChange(e.target.value)}
        className="border"
      />
      <button onClick={onClick}>addUni</button>

      {universities &&
        universities.map((university) => (
          <div key={university.id} className="flex">
            <div>{university.name}</div>
            <button onClick={() => onDelete(university.id)}>delete</button>
          </div>
        ))}
    </div>
  );
}
