import { Tag } from "@/store/types/Tag";

export const TagComponent = ({ tag }: { tag: Tag }) => {


  return (
    <button className="bg-blue-100 text-blue-800 text-sm md:text-lg font-medium mr-2 px-3 py-2 rounded-full dark:bg-blue-900 dark:text-blue-300">
      {tag.attributes.name}
    </button>
  )

}