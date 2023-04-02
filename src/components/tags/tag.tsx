import { Button } from "../ui/button";

export const TagComponent = ({ tag }: { tag: string }) => {


  return (
    <Button variant="ghost" className="rounded-full border border-blue-700 text-blue-800 dark:border-blue-200">
      {tag}
    </Button>
  )

}

export const TagBigComponent = ({ tag }: { tag: string }) => {

  return (
    <div className="h-24 lg:h-32 px-4 bg-blue-200 rounded-lg">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-2xl  text-blue-800">{tag}</div>
      </div>
    </div>
  )
}