import { OrganizationJoinRequestButton } from "@/components/organizations";
import Image from "next/image";

export default async function OrganizationOnboarding() {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 place-content-center content-center h-96">
        <div className="">
          <h1 className="text-4xl lg:text-8xl font-bold text-center">Llega a <span className="font-light">más gente</span>.</h1>
          <h2 className="text-xl lg:text-3xl text-center">Descubre el poder de la tecnología para moderizar tu <span className="font-bold">asesoría</span>.</h2>
          <h3 className="text-xl lg:text-3xl text-center">Desde <span className="font-bold text-green-500">0</span>€.</h3>
        </div>
      </div>
      <section>
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden dark:bg-black bg-gray-900 px-6 pt-16  sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg viewBox="0 0 1024 1024" className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:translate-y-0 lg:-translate-x-1/2" aria-hidden="true">
              <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stop-color="#7775D6" />
                  <stop offset="1" stop-color="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Inscribe tu asesoría en <br /><span className="font-light">ERRENTA</span> ahora mismo.</p>
              <p className="mt-6 text-lg leading-8 text-gray-300">Rellena un formulario y nuestro equipo se pondrá en contacto contigo lo antes posible.</p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <OrganizationJoinRequestButton />
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <Image loading="lazy" className="absolute top-0 left-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10" src="/images/map.png" alt="App screenshot" width="1824" height="1080" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}