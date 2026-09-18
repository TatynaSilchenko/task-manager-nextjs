import { useEffect, useRef } from "react";

export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs: number,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (...args: Args) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => callback(...args), delayMs);
  };
}
