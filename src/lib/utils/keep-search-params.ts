"use client";

import { useSearchParams } from "next/navigation";

export function useKeepSearchParams() {
  const s = useSearchParams();

  const url = (params_keep: { [key: string]: string | number | undefined }) => {
    const n = new URLSearchParams(s.toString());

    for (const [key, value] of Object.entries(params_keep)) {
      if (value) {
        n.set(key, value.toString());
      } else {
        n.delete(key);
      }
    }
    return n.toString();
  }

  return url;
}