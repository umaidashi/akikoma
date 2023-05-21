"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "../components/MaterialReact";
import router from "next/router";
import { useState } from "react";
import axios from "axios";
import { CurrentUserType } from "@/types/user";
import { useRouter } from "next/navigation";

export default function Group({
  currentUser,
}: {
  currentUser: CurrentUserType;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [name, setName] = useState<string>("");

  const changeName = (value: string) => {
    setName(value);
  };

  const createGroup = async () => {
    const createdGroup = await axios.post("/api/createGroup", {
      name,
      isPublic: isPublic,
      userId: currentUser.id,
    });
    router.push(`/group/${createdGroup.data.id}`);
  };
  return (
    <div>
      <div className="flex justify-between items-center text-lg font-bold border-l-[4px] p-2 mb-4">
        <div className="flex-1">Group</div>
        <Button
          size="sm"
          className="text-xs"
          color="pink"
          variant="gradient"
          onClick={() => setOpen(true)}
        >
          グループ作成
          <FontAwesomeIcon icon={faPlus} className="ml-3" size="sm" />
        </Button>
      </div>
      <Dialog
        size="xl"
        className="p-3"
        open={open}
        handler={() => setOpen(false)}
      >
        <DialogHeader>グループを作成する</DialogHeader>
        <DialogBody divider>
          <Input
            label="Name"
            required
            value={name}
            onChange={(e) => changeName(e.target.value)}
          />
          <Checkbox
            label="公開グループにする"
            ripple={true}
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="pink" onClick={createGroup}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
