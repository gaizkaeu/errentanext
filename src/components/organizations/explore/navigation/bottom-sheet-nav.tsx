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
        maxHeight * 0.85,
        maxHeight * 0.15
      ]}
      expandOnContentDrag={true}
    >
      <div className='dark:bg-slate-900'>
        {props.children}
      </div>
    </BottomSheet>
  )
}