"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { Button, Input } from "../components/MaterialReact";
import { CurrentUserType } from "@/types/user";
import { useRouter } from "next/navigation";

export const RegisterForm = ({
  currentUser,
}: {
  currentUser: CurrentUserType | undefined | null;
}) => {
  const router = useRouter();
  if (currentUser) {
    router.back();
    return null;
  }

  let [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("/api/register", {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    });

    signIn(undefined, { callbackUrl: "/" });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <div className="text-lg font-bold border-l-[4px] p-2 mb-4">Register</div>
      <form onSubmit={onSubmit}>
        <Input
          required
          size="lg"
          label="Name"
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          className="my-6 block"
        />
        <Input
          required
          size="lg"
          label="Email"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          className="my-6 block"
        />
        <Input
          required
          size="lg"
          label="Password"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          className="my-6 block"
        />
        <Button onClick={onSubmit} fullWidth className="mt-8">
          Register
        </Button>
      </form>
    </div>
  );
};
