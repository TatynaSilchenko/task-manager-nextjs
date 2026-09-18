"use client";

import { useRouter } from "next/navigation";

import { deleteList, renameList } from "@/api-client/lists";

import { ListActions } from "./ListActions";

type ListActionsContainerProps = {
  id: string;
  title: string;
};

export function ListActionsContainer({ id, title }: ListActionsContainerProps) {
  const router = useRouter();

  return (
    <ListActions
      title={title}
      onRename={(values) => renameList(id, values)}
      onDelete={() => deleteList(id)}
      onChanged={() => router.refresh()}
    />
  );
}
