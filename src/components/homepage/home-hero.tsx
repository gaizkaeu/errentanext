import { Link } from "next-intl"
import { HeadingText } from "./heading-text"

const HomeHero = () => {
  return (
    <section className="grid items-center gap-6 pt-6 pb-8 md:py-10 sticky top-8">
      <div className="flex max-w-[980px] flex-col items-start gap-2  ">
        <h1 className="text-3xl leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          <span className="font-light"> Tu asesoría </span><br/>
          <HeadingText />
        </h1>
      </div>
      <Link href={"/organizations/onboarding"} className="text-md lg:text-xl underline">
        Quiero que <span className="font-bold">mi asesoría</span> aparezca aquí.
      </Link>
    </section>
  )
}

export { HomeHero }