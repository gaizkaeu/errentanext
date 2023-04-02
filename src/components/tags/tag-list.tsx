"use client";
import { Tag } from "@/store/types/Tag";
import { TagComponent } from "./tag";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useKeepSearchParams } from "@/lib/utils";
import { useGetTagsQuery } from "@/store/endpoints/organizations";

export const FRAMER_MOTION_LIST_ITEM_VARIANTS = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1 },
};

export const TagList = () => {
  const { data } = useGetTagsQuery();

  return data ? (
    <motion.div
      initial="hidden"
      style={{ display: "flex", overflowX: "auto" }}
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="mt-3 grid gap-2"
    >
      {data.map((tag) => (
        <AnimatedTag tag={tag} key={tag.id} />
      ))}
    </motion.div>
  ) : <></>;
}

const AnimatedTag = ({ tag }: { tag: Tag }) => {
  const g = useKeepSearchParams();
  const r = useRouter();

  const handleClick = () => {
    setTimeout(() => {
      r.push(`/organizations?${g({ 'q[skills_name_in]': tag.attributes.name })}`);
    }, 200);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      whileTap={{ scale: 0.9 }}
      variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}
      whileHover={{ scale: 1.01 }}
      onTap={handleClick}
    >

      <TagComponent tag={tag.attributes.name} />
    </motion.div>
  );
} 

export const TagInline = ({ tags }: { tags: string[] }) => {
  return (
    <span>
      {tags.join(", ")}
    </span>
  )
}