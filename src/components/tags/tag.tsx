import { cva } from "class-variance-authority";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "rounded-full uppercase",
  {
    variants: {
      active: {
        true:
          "bg-blue-400 text-blue-800 dark:border-blue-200",
        false:
          "bg-slate-100 text-slate-900 dark:bg-midnight-700 dark:text-slate-100 dark:border-midnight-700",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

export const TagComponent = ({ tag, active }: { tag: string, active?: boolean }) => (
  <Button variant="ghost" className={cn(tagVariants({ active }))}>
    {tag}
  </Button>
)

export const TagBadge = ({ tag }: { tag: string }) => (
  <p className="bg-slate-50 dark:bg-midnight-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
    {tag}
  </p>
)