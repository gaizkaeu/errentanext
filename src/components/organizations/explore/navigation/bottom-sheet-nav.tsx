"use client";

import { useWindowSize } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

import 'react-spring-bottom-sheet/dist/style.css'

export function BottomSheetComponent(props: { children: JSX.Element }) {

  const [open, setOpen] = useState(false);
  const [w] = useWindowSize();

  useEffect(() => {
    if (w > 1024) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [w]);

  return (
    <BottomSheet
      open={open}
      blocking={false}
      className='z-20'
      defaultSnap={({ maxHeight }) => maxHeight / 5}
      snapPoints={({ maxHeight }) => [
        maxHeight - 64,
        maxHeight * 0.15
      ]}
    >
      <div className='dark:bg-black'>
        {props.children}
      </div>
    </BottomSheet>
  )
}