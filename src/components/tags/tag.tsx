import { cva } from "class-variance-authority";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@heroicons/react/24/outline";

const tagVariants = cva(
  "rounded-full border",
  {
    variants: {
      active: {
        true:
          "bg-blue-400 text-blue-800 dark:border-blue-200",
        false:
          "bg-blue-200 dark:bg-midnight-800 text-blue-800 dark:border-blue-200",
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