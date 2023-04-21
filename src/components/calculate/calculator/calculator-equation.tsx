"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const EquationEditor = dynamic(() => import('equation-editor-react'), {
  ssr: false,
})

export const CalculatorEquation = ({ equation }: { equation: string }) => {

  const [equationState, setEquation] = useState<string>(equation);

  return (
    <EquationEditor
    value={equationState}
    onChange={setEquation}
    autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
    autoOperatorNames="sin cos tan"
  />
  )
}