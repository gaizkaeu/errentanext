import { ArrowDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default async function OrganizationOnboarding() {


  return (
    <><div className="flex flex-col items-center justify-center h-screen pb-12">
      <h1 className="text-2xl lg:text-8xl font-bold">Llega a <span className="font-light">más gente</span>.</h1>
      <h2 className="text-xl lg:text-3xl text-center">Descubre el poder de la tecnología para moderizar tu <span className="font-bold">asesoría</span>.</h2>
      <h3 className="text-xl lg:text-3xl text-center">Desde <span className="font-bold text-green-500">0</span>€.</h3>
      <div className="absolute inset-x-0 bottom-8">
        <ArrowDownIcon className="h-12 w-12 mx-auto animate-bounce" />
      </div>
    </div>
      <section id="features" aria-label="Features for running your books" className="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32">
        <Image width={1000} height={1000} alt="background" decoding="async" className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]" loading="lazy" src="/images/onboarding/background.jpg" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
            <h4 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
              Todo lo que necesita tu asesoría.</h4>
            <p className="mt-6 text-lg tracking-tight text-blue-100">
              Nos encargamos de guiar a los clientes a tu negocio.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
            <div className="flex d pb-4 sm:mx-0 sm:pb-0 lg:col-span-5">
              <div className="relative z-10 whitespace-nowrap sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                <div className="group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6">
                  <p>
                    <span className="font-display text-lg [&amp;:not(:focus-visible)]:focus:outline-none text-white" >
                      <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl">
                      </span>
                      Alto rendimiento
                    </span>
                  </p>
                </div>
                <div className="group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6">
                  <p>
                    <span className="font-display text-lg [&amp;:not(:focus-visible)]:focus:outline-none text-white">
                      <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl">
                      </span>
                      Administración
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-blue-100">

                  </p>
                </div>
                <div className="group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6">
                  <p>
                    <span className="font-display text-lg [&amp;:not(:focus-visible)]:focus:outline-none text-white" >
                      <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl">
                      </span>
                      Seguimiento
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-blue-100">
                  </p>
                </div>
                <div className="group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6">
                  <p>
                    <span className="font-display text-lg [&amp;:not(:focus-visible)]:focus:outline-none text-white" >
                      <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl">
                      </span>
                      Publicidad</span>
                  </p>
                  <p className="mt-2 text-sm text-blue-100"></p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                <Image src="/images/onboarding.png" alt="landing-1" width={1085} height={1000} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="secondary-features" aria-label="Features for simplifying everyday business tasks" className="pt-20 pb-14 sm:pb-20 sm:pt-32 lg:pb-32 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl md:text-center">
            <h4 className="font-display text-3xl tracking-tight  sm:text-4xl">
              Gestión integral</h4>
            <p className="mt-4 text-lg tracking-tight">
              Simplemente gestiona tu negocio.
            </p>
          </div>
          <div className="lg:mt-20">
            <div className="grid sm:grid-cols-3 gap-x-8 place-content-center mt-3">
              <div className="relative">
                <div className="w-9 rounded-lg bg-blue-600 mx-auto ">
                  <svg aria-hidden="true" className="h-9 w-9" fill="none">
                    <defs>
                      <linearGradient id=":Rardm:" x1="11.5" y1="18" x2="36" y2="15.5" gradientUnits="userSpaceOnUse">
                        <stop offset=".194" stop-color="#fff">
                        </stop>
                        <stop offset="1" stop-color="#6692F1">
                        </stop>
                      </linearGradient>
                    </defs>
                    <path d="m30 15-4 5-4-11-4 18-4-11-4 7-4-5" stroke="url(#:Rardm:)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                  </svg>
                </div>
                <h3 className="mt-6 text-sm font-medium text-blue-600">
                  <span className="[&amp;:not(:focus-visible)]:focus:outline-none">
                    <span className="absolute inset-0">
                    </span>
                    Estadisticas
                  </span>
                </h3>
                <p className="mt-2 font-display text-xl d">
                  Conoce el funcionamiento de tu negocio.
                </p>
              </div>
              <div className="relative">
                <div className="w-9 rounded-lg bg-blue-500 mx-auto">
                  <svg aria-hidden="true" className="h-9 w-9" fill="none">
                    <path opacity=".5" d="M8 17a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z" fill="#fff">
                    </path>
                    <path opacity=".3" d="M8 24a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z" fill="#fff">
                    </path>
                    <path d="M8 10a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2Z" fill="#fff">
                    </path>
                  </svg>
                </div>
                <h3 className="mt-6 text-sm font-medium ">
                  <span className="[&amp;:not(:focus-visible)]:focus:outline-none">
                    <span className="absolute inset-0">
                    </span>
                    Clientes
                  </span>
                </h3>
                <p className="mt-2 font-display text-xl ">
                  Facilita el proceso a tus clientes.</p>
              </div>
              <div className="relative">
                <div className="w-9 rounded-lg bg-blue-500 mx-auto">
                  <svg aria-hidden="true" className="h-9 w-9" fill="none">
                    <path opacity=".5" d="M25.778 25.778c.39.39 1.027.393 1.384-.028A11.952 11.952 0 0 0 30 18c0-6.627-5.373-12-12-12S6 11.373 6 18c0 2.954 1.067 5.659 2.838 7.75.357.421.993.419 1.384.028.39-.39.386-1.02.036-1.448A9.959 9.959 0 0 1 8 18c0-5.523 4.477-10 10-10s10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33c-.35.427-.354 1.058.036 1.448Z" fill="#fff">
                    </path>
                    <path d="M12 28.395V28a6 6 0 0 1 12 0v.395A11.945 11.945 0 0 1 18 30c-2.186 0-4.235-.584-6-1.605ZM21 16.5c0-1.933-.5-3.5-3-3.5s-3 1.567-3 3.5 1.343 3.5 3 3.5 3-1.567 3-3.5Z" fill="#fff">
                    </path>
                  </svg>
                </div>
                <h3 className="mt-6 text-sm font-medium text-blue-600">
                  <span className="[&amp;:not(:focus-visible)]:focus:outline-none">
                    <span className="absolute inset-0">
                    </span>
                    Equipo
                  </span>
                </h3>
                <p className="mt-2 font-display text-xl ">
                  Gestiona tu equipo.</p>
              </div>
            </div>
            <div className="relative mt-20 overflow-hidden rounded-4xl bg-slate-200 px-14 py-16 xl:px-16">
              <div className="-mx-5 flex">
                <div className="px-5 transition duration-500 ease-in-out [&amp;:not(:focus-visible)]:focus:outline-none"  aria-hidden="false">
                  <Image height={1000} width={1000} alt="administración "className="w-full" loading="lazy" src="/images/management.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}