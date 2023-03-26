"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { LawyerCreateForm } from "./forms";

export const LawNoProfile = () => {
  const [creating, setCreating] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-xl font-bold">No tienes un <span className="font-light">perfil de abogado</span> asociado a esta cuenta.</p>
      <Button className="mt-3" onClick={() => setCreating(!creating)}>
        {creating ? "Cancelar" : "Crear perfil"}
      </Button>

      {creating && (
        <div className="mt-4">
          <p className="text-sm">Para crear un perfil de abogado, debes completar el formulario de registro.</p>
          <LawyerCreateForm />
        </div>
      )}
    </div>
  )
}