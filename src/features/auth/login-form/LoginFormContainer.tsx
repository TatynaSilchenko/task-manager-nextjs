"use client";

import { useRouter } from "next/navigation";

import { login } from "@/api-client/auth";

import { LoginForm } from "./LoginForm";

type LoginFormContainerProps = {
  redirectTo: string;
};

export function LoginFormContainer({ redirectTo }: LoginFormContainerProps) {
  const router = useRouter();

  return (
    <LoginForm
      onSubmit={login}
      onSuccess={() => {
        router.replace(redirectTo);
        router.refresh();
      }}
    />
  );
}
