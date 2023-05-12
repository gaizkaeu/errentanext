import Link from "next/link"
import { HeadingText } from "./heading-text"

const HomeHero = () => {
  return (
    <section className="grid items-center gap-6 px-3 pt-6 pb-3 md:py-4 lg:py-2">
      <div className="flex max-w-[980px] items-center gap-4  ">
        <h1 className="text-3xl font-bold text-center leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          <span className="font-light"> Tu asesoría </span><br />
          <HeadingText />
        </h1>
      </div>
      <Link href="/organizations/onboarding" className="mx-auto inline-flex max-w-sm items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200" role="alert"><span className="text-lg rounded-full text-white px-2 py-1 bg-black mr-3">✨</span><span className="mr-2 text-sm font-medium">Quiero inscribir mi asesoría.</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></Link>

    </section>
  )
}

export { HomeHero }