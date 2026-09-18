"use client";

import { useRouter } from "next/navigation";

import { login } from "@/api-client/auth";

import { LoginForm } from "./LoginForm";

export function LoginFormContainer() {
  const router = useRouter();

  return (
    <LoginForm
      onSubmit={login}
      onSuccess={() => {
        router.replace("/lists");
        router.refresh();
      }}
    />
  );
}
