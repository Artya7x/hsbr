import { createContext, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { CombinedCheckoutSchema } from "@/validators/checkout-flow.validator"

import PrevButton from "./prevbutton"
import NextButton from "./nextbutton"
import ProgressIndicator from "./progress-indicator"

export const MultiStepFormContext = createContext(null)

function MultiStepForm({ steps }) {
  const methods = useForm({
    resolver: zodResolver(CombinedCheckoutSchema),
  })

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const currentStep = steps[currentStepIndex]

  async function nextStep() {
    const isValid = await methods.trigger(currentStep.fields)
    if (!isValid) 
      return

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((i) => i + 1)
    }
  }

  function previousStep() {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1)
    }
  }

  function goToStep(position) {
    if (position >= 1 && position <= steps.length) {
      setCurrentStepIndex(position - 1)
    }
  }

  function submitSteppedForm(data) {
    console.log("Final form data:", data)
  }

  const value = {
    currentStep,
    currentStepIndex,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    nextStep,
    previousStep,
    goToStep,
    steps,
  }

  return (
    <MultiStepFormContext.Provider value={value}>
      <FormProvider {...methods}>
        <div className="w-[1100px] mx-auto mb-30">
          <ProgressIndicator />

          <form onSubmit={methods.handleSubmit(submitSteppedForm)}>
            <h1 className="py-5 mb-3 text-3xl font-bold">
            {currentStep.title}
            </h1>
            {currentStep.component}
            <div className="flex mt-6 gap-4">
              <PrevButton />
              <NextButton />
            </div>
          </form>

        </div>
      </FormProvider>
    </MultiStepFormContext.Provider>
  )
}

export default MultiStepForm
