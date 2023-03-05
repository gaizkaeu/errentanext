import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default async function OrganizationOnboarding() {


  return (
    <><div className="flex flex-col items-center justify-center h-screen pb-4 px-3">
      <h1 className="text-2xl lg:text-8xl font-bold">Llega a <span className="font-light">más gente</span>.</h1>
      <h2 className="text-xl lg:text-3xl text-center">Descubre el poder de la tecnología para moderizar tu <span className="font-bold">asesoría</span>.</h2>
      <h3 className="text-xl lg:text-3xl text-center">Desde <span className="font-bold text-green-500">0</span>€.</h3>
      <div className="absolute inset-x-0 bottom-8">
        <ArrowDownIcon className="h-12 w-12 mx-auto animate-bounce" />
      </div>
    </div><section id="features" aria-label="Features for running your books" className="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32">
        <img decoding="async" className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]" loading="lazy" src="https://app.hatchbox.io/assets/background-feature-da427dce485d0fc3264a3f90f0e762133b80b05da5525f484e5dc4fe8ec8fb1c.jpg" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
            <h4 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
              Todo lo que necesita tu asesoría.</h4>
            <p className="mt-6 text-lg tracking-tight text-blue-100">
              Nos encargamos de guiar a los clientes a tu negocio.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
            <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
              <div className="relative z-10 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal" role="tablist" aria-orientation="vertical">
                <div className="group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6">
                  <h4>
                    <span className="font-display text-lg [&amp;:not(:focus-visible)]:focus:outline-none text-white" id="headlessui-tabs-tab-:R2ba9m:" role="tab" aria-selected="true" aria-controls="headlessui-tabs-panel-:Rda9m:">
                      <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl">
                      </span>
                      Alto rendimiento
                    </span>
                  </h4>
                  <p className="mt-2 text-sm text-blue-100">
                    No dejes que el bajo rendimiento de tu web te limite.
                  </p>
                </div>
                <div className="group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6">
                  <h5>
                    <span className="font-display text-lg [&amp;:not(:focus-visible)]:focus:outline-none text-white" id="headlessui-tabs-tab-:R2ja9m:" role="tab" aria-selected="false" aria-controls="headlessui-tabs-panel-:Rla9m:">
                      <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl">
                      </span>
                      Tráfico.
                    </span>
                  </h5>
                  <p className="mt-2 text-sm text-blue-100">

                  </p>
                </div>
                <div className="group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6">
                  <h6>
                    <span className="font-display text-lg [&amp;:not(:focus-visible)]:focus:outline-none text-white" id="headlessui-tabs-tab-:R2ra9m:" role="tab" aria-selected="false" aria-controls="headlessui-tabs-panel-:Rta9m:">
                      <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl">
                      </span>
                      Seguimiento
                    </span>
                  </h6>
                  <p className="mt-2 text-sm text-blue-100">
                  </p>
                </div>
                <div className="group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6">
                  <p>
                    <span className="font-display text-lg [&amp;:not(:focus-visible)]:focus:outline-none text-white" id="headlessui-tabs-tab-:R33a9m:" role="tab" aria-selected="false" aria-controls="headlessui-tabs-panel-:R15a9m:">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}