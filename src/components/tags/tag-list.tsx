"use client";
import { Tag, VerifiedTag } from "@/store/types/Tag";
import { TagComponent } from "./tag";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useKeepSearchParams } from "@/lib/utils";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
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
        <motion.div key={tag.id} variants={FRAMER_MOTION_LIST_ITEM_VARIANTS}>
          <AnimatedTag tag={tag} key={tag.id} />
        </motion.div>
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
      drag
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      whileTap={{ scale: 0.9 }}
      whileDrag={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      onTap={handleClick}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >

      <TagComponent tag={tag} />
    </motion.div>
  );
}      /* // drag
      // initial={{ x: "100%" }}
      // animate={{ x: "0%" }}
      // whileTap={{ scale: 0.9 }}
      // whileDrag={{ scale: 0.9 }}
      // whileHover={{ scale: 1.1 }}
      // onTap={handleClick}
      // dragConstraints={{
      //   top: 0,
      //   left: 0,
      //   right: 0,
      //   bottom: 0,
      // }}> */

export const TagInline = ({ tags }: { tags: VerifiedTag[] }) => {
  return (
    <span>
      {tags.map((tag) => (
        <span key={tag.name}> {tag.verified && <VerifiedBadge />} {tag.name}</span>
      ))}
    </span>
  )
}

const VerifiedBadge = () => {
  return (
    <>
      <CheckBadgeIcon className="h-4 w-4 text-green-500 inline-block" />
    </>
  )
}