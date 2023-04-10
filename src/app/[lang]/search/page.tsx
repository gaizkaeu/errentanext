"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import { useMultiplestepForm } from "@/lib/utils";
import { ServiceSelectForm, SideBar, UserInfoForm } from "@/components/search";
import { Form, Formik } from "formik";


export default function Home() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(4);


  const handleOnSubmit = () => {
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    nextStep();
  };

  return (
    <div
      className={`flex justify-between ${currentStepIndex === 1 ? "h-[600px] md:h-[500px]" : "h-[500px]"
        } w-11/12 max-w-4xl mx-auto relative m-1 rounded-lg  p-4`}
    >
      {!showSuccessMsg ? (
        <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
      ) : (
        ""
      )}
      <main
        className={`${showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"}`}
      >
        {showSuccessMsg ? (
          <AnimatePresence mode="wait">
            {/* <SuccessMessage /> */}
          </AnimatePresence>
        ) : (
          <Formik initialValues={{}}
            onSubmit={handleOnSubmit}
            className="w-full flex flex-col justify-between h-full"
          >
            <Form>
              <AnimatePresence mode="wait">
                {currentStepIndex === 0 && (
                  <UserInfoForm />
                )}
                {currentStepIndex === 1 && (
                  <ServiceSelectForm />
              )}
              { /*
              {currentStepIndex === 2 && (
                <AddonsForm key="step3" {...formData} updateForm={updateForm} />
              )}
              {currentStepIndex === 3 && (
                <FinalStep key="step4" {...formData} goTo={goTo} />
              )} */}
              </AnimatePresence>
              <div className="w-full items-center mt-3 flex justify-between">
                <div className="">
                  <Button
                    onClick={previousStep}
                    type="button"
                    className={`${isFirstStep
                        ? "invisible"
                        : "visible"
                      }`}
                  >
                    Go Back
                  </Button>
                </div>
                <div className="flex items-center">
                  <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                    <Button
                      type="submit"
                    >
                      {isLastStep ? "Confirm" : "Next Step"}
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        )}
      </main>
    </div>
  );
}