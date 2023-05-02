
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

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

  export interface GeneralCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const GeneralCard = React.forwardRef<
  HTMLDivElement,
  GeneralCardProps
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      cardVariants({
        variant
      }),
      className
    )}
    {...props}
  />
))

GeneralCard.displayName = "Card"

const GeneralCardHeading = React.forwardRef<
  HTMLDivElement,
  GeneralCardProps
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "h-24 flex flex-col justify-end",
      className
    )}
    {...props}
  />
))

GeneralCardHeading.displayName = "GeneralCardHeading"

const GeneralCardContent = React.forwardRef<
  HTMLDivElement,
  GeneralCardProps
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col justify-end",
      className
    )}
    {...props}
  />
))

GeneralCardContent.displayName = "GeneralCardContent"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(" flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, GeneralCard, GeneralCardHeading, GeneralCardContent}
