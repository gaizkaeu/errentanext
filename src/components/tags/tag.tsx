import { cva } from "class-variance-authority";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "rounded-full border",
  {
    variants: {
      active: {
        true:
          "border-blue-700 bg-blue-400 text-blue-800 dark:border-blue-200",
        false:
          "border-blue-700 text-blue-800 dark:border-blue-200",
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

export const TagBigComponent = ({ tag }: { tag: string }) => {

  return (
    <div className="h-24 lg:h-32 px-4 bg-blue-200 rounded-lg">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-2xl  text-blue-800">{tag}</div>
      </div>
    </div>
  )
}