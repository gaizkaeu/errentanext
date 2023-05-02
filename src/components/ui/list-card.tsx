"use client";
import * as React from "react"

import { VariantProps, cva } from "class-variance-authority";
import { useState } from "react";
import { Button } from "./button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const cardVariants = cva(
  "h-64 bg-gradient-to-r rounded-lg flex select-none flex-col p-6 no-underline outline-none focus:shadow-md hover:rounded-md transition-all",
  {
    variants: {
      variant: {
        open: "bg-gradient-to-r from-green-500 to-green-600",
        slate: "text-black select-none bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none dark:from-midnight-800 dark:to-midnight-800 dark:text-white focus:shadow-md",
        close: "bg-gradient-to-r from-red-700 to-red-600",
        near_close: "bg-gradient-to-r from-orange-600 to-orange-500",
        purple: "bg-purple-100 text-purple-700"
      },
    }
  });

const SelectedContext = React.createContext([false, (selected: boolean) => { }] as [boolean, (selected: boolean) => void])

export interface GeneralCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> { }

const ListCard = React.forwardRef<
  HTMLDivElement,
  GeneralCardProps
>(({ className, variant, ...props }, ref) => {
  const [selected, setSelected] = useState(false)


  return (
    <SelectedContext.Provider value={[selected, setSelected]}>
      <div
        ref={ref}
        className={"divide-y-slate-200 mt-4 mb-4 divide-y rounded border border-slate-200 dark:border-midnight-700 bg-slate-50 dark:bg-midnight-800 transition-all ease-in " + (selected ? "bg-slate-100 dark:bg-midnight-900" : "") + " " + className}
        {...props}
      />
    </SelectedContext.Provider>
  )
})

const ListCardHeading = React.forwardRef<
  HTMLDivElement,
  GeneralCardProps & { rightContent?: React.ReactNode, expandedcontent?: React.ReactNode }
>(({ className, variant, children, ...props }, ref) => {

  const [selected, setSelected] = React.useContext(SelectedContext)

  return (
    <div
      ref={ref}
      className={"border-l-2 border-transparent my-1 mx-1 px-3"}
      {...props}
    >
      <div className="flex flex-col md:flex-row md:justify-between py-3">
        <div className="flex flex-col gap-2 flex-1">
          {children}
        </div>
        {props.rightContent && (
          <div className="ml-8 flex flex-col justify-center gap-2 flex-shrink-0 mt-2 md:mt-0">
            {props.rightContent}
          </div>
        )}
        <Button variant="outline" className="w-5 h-5 rounded-full p-0 self-end" onClick={() => setSelected(!selected)}>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </div>
      {selected && props.expandedcontent}
    </div>
  )
})

const ListCardHeadingBadge = React.forwardRef<
  HTMLDivElement,
  GeneralCardProps
>(({ className, variant, ...props }, ref) => {

  return (
    <div
      ref={ref}
      className={"ml-8 space-y-2 flex flex-col gap-2 md:flex-row md:gap-4 md:items-center"}
      {...props}
    >
    </div>
  )
})

const ListCardHeadingBadgeItem = React.forwardRef<
  HTMLDivElement,
  GeneralCardProps
>(({ className, variant, ...props }, ref) => {

  return (
    <div
      ref={ref}
      className={"flex items-center text-slate-400 min-w-0"}
      {...props}
    >
    </div>
  )
})

const ListCardHeadingElement = React.forwardRef<
  HTMLDivElement,
  GeneralCardProps
>(({ className, variant, ...props }, ref) => {

  return (
    <div
      ref={ref}
      className={"flex items-center gap-4"}
      {...props}
    />
  )
})

ListCardHeading.displayName = "ListCardHeading"
ListCardHeadingBadge.displayName = "ListCardHeading"
ListCardHeadingBadgeItem.displayName = "ListCardHeading"
ListCardHeadingElement.displayName = "ListCardHeadingElement"
ListCard.displayName = "Card"


export { ListCard, ListCardHeading, ListCardHeadingElement, ListCardHeadingBadge, ListCardHeadingBadgeItem }