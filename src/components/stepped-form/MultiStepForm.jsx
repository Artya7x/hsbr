import { createContext, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { checkoutSchema } from "@/validators/checkout-flow.validator"

import PrevButton from "./prevbutton"
import NextButton from "./nextbutton"
import ProgressIndicator from "./progress-indicator"

import { TIME_INTERVALS } from "../shared/timePeriod"
export const MultiStepFormContext = createContext(null)

function MultiStepForm({ steps }) {

  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      activities: [
        {
          name: "", description: "", impacts: [], impactDescription: "",
          dependsOn: null,
          requiredBy: null,
          impactMatrix: TIME_INTERVALS.map((interval) => ({
            intervalId: interval.id,
            severity: null,
          })),

          recovery: {
            rtoHours: null,
            mtpdHours: null,
            rpo: null,
            rpoDetails: {
              frequency: "",
              duration: "",
            },
          },
          workEnvironment: {
            staffingLevel: 0,
            workstations: 0,
            additionalResources: [],
            systems: [],
            physicalArchives: {
              criticality: "undefined",
              description: ""
            },
            fireproofCabinets: "",
          },
          externalDependencies: [
            {
              activityIndex: 0,
              companyName: "",
              email: "",
              phone: "",
              resources: [],
            },
          ],

        }
      ],

    },
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
        <div className="mx-auto w-full max-w-[1600px] px-8 ">
          <div className="bg-card rounded-xl border p-5 mb-4 mt-7">
            <ProgressIndicator />
          </div>
          <form onSubmit={methods.handleSubmit(submitSteppedForm)}>

            {currentStep.component}
            <div className="flex mt-6 gap-4 justify-end">
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
