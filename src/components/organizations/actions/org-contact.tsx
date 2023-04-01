"use client";
import { Button } from "@/components/ui/button"
import { Organization } from "@/store/types/Organization";
import { useAhoy } from "@/components/providers";
import Modal from "@/components/ui/modal-card";
import { useState } from "react";

const ContactButton = (props: { org: Organization }) => {

  const [open, setOpen] = useState(false);
  const { ahoy } = useAhoy();

  return (
    <>

    <Modal showModal={open} setShowModal={setOpen}>
      <div className="inline-block max-h-[calc(100vh-150px)] w-full max-w-screen-xl transform overflow-scroll bg-gray-50
        align-middle shadow-xl scrollbar-hide sm:rounded-2xl sm:border sm:border-gray-200">
        <p>eso es una prueba</p>
      <button
          className="group sticky top-4 right-4 z-30 float-right hidden rounded-full p-3 transition-all duration-75 hover:bg-gray-100 focus:outline-none active:scale-75 sm:block"
          autoFocus={false}
        >
          salir
        </button>
      </div>
    </Modal>
    <div>
      <Button variant="ghost" onClick={() => setOpen(true)}className="rounded-full border border-blue-700 text-blue-800 dark:border-blue-200">
        Quiero contactar ahora
      </Button>
      <p className="text-xs text-blue-800 text-center dark:text-white">Respuesta en {"<"} 2 minutos</p>
    </div>
    </>
  )
}

export { ContactButton }