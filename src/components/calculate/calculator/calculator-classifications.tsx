"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalculatorManage } from "@/store/types/Calculator";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { CalculatorEquation } from "./calculator-equation";

export const CalculatorClassifications = (props: { calculator: CalculatorManage }) => {
  const { calculator } = props;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof(window) !== "undefined") {
      setReady(true);
    }
  }, [])

  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="text-xs text-gray-500">Clasificaciones</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-5 h-5 rounded-full p-0">
              <CodeBracketSquareIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            {Object.entries(calculator.attributes.exposed_variables_formatted).map(([key, value]) => (
              <div key={key}>
                {key}
                <Badge className="ml-2">
                  {value}
                </Badge>
              </div>
            ))}

          </PopoverContent>
        </Popover>
      </div>
      {Object.entries(calculator.attributes.classifications).map(([key, value]) => (
        <div className="" key={key}>
          <p className="text-xs  underline uppercase">{key}</p>
          {ready &&
            <CalculatorEquation equation={value} />
          }
        </div>
      ))}
    </div>
  )
}