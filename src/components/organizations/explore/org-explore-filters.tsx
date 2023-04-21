"use client";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { useSearch } from "@/lib/utils";
import { useGetSkillsTagsQuery } from "@/store/endpoints/organizations";
import { cva } from "class-variance-authority";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const variants = {
  expanded: { opacity: 1, height: 'auto' },
  collapsed: { opacity: 0, height: 0 },
};

const searchComponent = cva(
  "",
  {
    variants: {
      status: {
        focused:
          "fixed bg-slate-50 dark:bg-midnight-800 top-0 left-0 right-0 rounded-b-2xl z-50 shadow-md",
        disabled:
          "",
      },
    },
    defaultVariants: {
      status: "focused",
    },
  }
)



export const OrganizationExplore = () => {
  const [search, setSearch] = useSearch(true);
  const [focused, setFocused] = useState(false);
  const [input, setInput] = useState("");
  const [mapsLoaded, setMapsLoader] = useState(false);
  const { data: skills } = useGetSkillsTagsQuery({ 'q': input })



  return (
    <>
      <motion.div
        onBlur={() => setFocused(false)}
        className={searchComponent({ status: focused ? "focused" : "disabled" })}
        transition={{ duration: 0.2 }}
      >
        <Command label="Command Menu">
          <motion.div className="relative">
            {focused && (
              <div className="h-8" />
            )}
            <motion.div className="flex items-center px-3 py-2 bg-white dark:bg-midnight-700 rounded-full shadow-sm max-w-lg mx-auto">
              <svg
                className="w-6 h-6 mr-2 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21L16.65 16.65" />
              </svg>
              <Command.Input
                className="flex-grow w-0 focus:outline-none dark:bg-midnight-700"
                placeholder="Buscar una asesoría"
                onValueChange={(value) => setInput(value)}
                onFocus={() => setFocused(true)}
              />
            </motion.div>

            <AnimatePresence>
              {focused && (
                <motion.div
                  initial="collapsed"
                  animate="expanded"
                  className="max-w-md mx-auto"
                  variants={variants}
                  transition={{ duration: 0.2 }}
                >
                  <Command.List>
                    <Command.Empty>No results found.</Command.Empty>

                    <CommandGroup heading="Tipo de asesoramiento">
                      {skills?.map((skill) => (
                        <CommandItem key={skill.id}>
                          {skill.attributes.name}
                        </CommandItem>))}
                    </CommandGroup>
                    <CommandGroup heading="Ubicación">
                      <CommandItem>
                        Madrid
                      </CommandItem>
                      <CommandItem>
                        Barcelona
                      </CommandItem>
                    </CommandGroup>

                  </Command.List>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Command>
      </motion.div>
    </>
  );
}

