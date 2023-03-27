"use client";
import { Link } from "next-intl"
import { HeadingText } from "./heading-text"
import { Button } from "../ui/button"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

const HomeHero = () => {
  return (
    <section className="grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] items-center gap-4  ">
        <h1 className="text-3xl leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          <span className="font-light"> Tu asesoría </span><br />
          <HeadingText />
        </h1>
        <Link href="/organizations">
          <Button className="h-28 w-36 text-white dark:text-white bg-gradient-to-br hover:opacity-90 from-green-400 to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <div className="grid grid-cols-1 justify-items-center">
              <MagnifyingGlassIcon className="w-8 h-8" />
              Búsqueda inteligente
            </div>
          </Button>
        </Link>
      </div>
      <Link href={"/organizations/onboarding"} className="text-md lg:text-xl underline">
        Quiero que <span className="font-bold">mi asesoría</span> aparezca aquí.
      </Link>

    </section>
  )
}

export { HomeHero }