"use client";

import { useRouter } from "next/navigation";

import { createList } from "@/api-client/lists";

import { CreateList } from "./CreateList";

export function CreateListContainer() {
  const router = useRouter();

  return (
    <CreateList onCreate={createList} onCreated={() => router.refresh()} />
  );
}
