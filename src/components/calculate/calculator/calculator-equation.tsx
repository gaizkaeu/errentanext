"use client";

import { useField } from "formik";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// const EquationEditor = dynamic(() => import('equation-editor-react'), {
//   ssr: false,
// })

export const CalculatorEquation = ({ equation, name }: { equation: string, name: string }) => {

  const [equationState, setEquation] = useState<string>(equation);
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    helpers.setValue(equationState);
  }, [equationState])

  return (
    // <EquationEditor
    //   value={equationState}
    //   onChange={setEquation}
    //   autoCommands="pi"
    //   autoOperatorNames="cos"
    // />
    <p>asd</p>
  )
}