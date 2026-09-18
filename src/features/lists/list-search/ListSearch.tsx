"use client";

import { Input } from "antd";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";

import { useDebouncedCallback } from "@/shared/lib/use-debounced-callback";

const DEBOUNCE_MS = 300;

type ListSearchProps = {
  defaultValue: string;
};

export function ListSearch({ defaultValue }: ListSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  const updateQuery = useDebouncedCallback((nextValue: string) => {
    const query = nextValue.trim();
    router.replace(query ? `/lists?q=${encodeURIComponent(query)}` : "/lists");
  }, DEBOUNCE_MS);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateQuery(event.target.value);
  };

  return (
    <Input.Search
      value={value}
      onChange={handleChange}
      placeholder="Найти список"
      aria-label="Поиск по названию списка"
      allowClear
    />
  );
}
