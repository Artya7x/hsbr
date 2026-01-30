import { createContext, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Step1Validator } from "@/validators/step1Validator"
import { Schema } from "@/validators/checkout-flow.validator"

import PrevButton from "./prevbutton"
import NextButton from "./nextbutton"
import ProgressIndicator from "./progress-indicator"

import { TIME_INTERVALS } from "../shared/timePeriod"
export const MultiStepFormContext = createContext(null)

function MultiStepForm({ steps }) {

  const methods = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      activities: [
        {
          name: "", description: "", impacts: [], impactDescription: "",
          dependsOn: undefined,
          requiredBy: undefined,
          impactMatrix: TIME_INTERVALS.map((interval) => ({
            intervalId: interval.id,
            severity: "",
          })),

          recovery: {
            rtoHours: null,
            mtpdHours: null,
            rpo: null,
            rpoDetails: {
              frequency: null,
              duration: null,
            },
          },
          workEnvironment: {
            staffingLevel: null,
            workstations: null,
            additionalResources: [],
            systems: [],
            physicalArchives: {
              criticality: "",
              description: ""
            },
            fireproofCabinets: "",
          },
          externalDependencies: [
            {
              activityIndex: null,
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

  const [submitErrors, setSubmitErrors] = useState(null)

  async function nextStep() {

    methods.clearErrors("activities")

    const activities = methods.getValues("activities")

    for (let i = 0; i < activities.length; i++) {

      let result = Step1Validator.safeParse(activities[i])

      if (!result.success) {

        result.error.issues.forEach((iss) => {

          const fieldPath = `activities.${i}.${iss.path.join(".")}`


          methods.setError(fieldPath, { type: "manual", message: iss.message })

        })
        return
      }

    }

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
  setSubmitErrors(null)
  console.log("Final form data:", data)
}


  //Functions for errors 

function hasNestedError(errors, path) {
  const keys = path.split(".")

  function walk(current, index) {
    if (!current) return false
    if (index === keys.length) return true

    const key = keys[index]

    if (Array.isArray(current)) {
      return current.some((item) => walk(item, index))
    }

    return walk(current[key], index + 1)
  }

  return walk(errors, 0)
}

function getStepsWithErrors(errors, steps) {
  if (!errors) return []

  return steps.filter((step) =>
    step.fieldsPaths?.some((path) => hasNestedError(errors, path))
  )
}

const errorStepPositions = new Set(
  submitErrors ? getStepsWithErrors(submitErrors, steps).map((s) => s.position) : []
)

  
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
            <ProgressIndicator errorSteps = {errorStepPositions} />
          </div>
          <form
            onSubmit={methods.handleSubmit(
              submitSteppedForm,
              (errors) => setSubmitErrors(errors)
            )}
          >
            {submitErrors && (
              <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4">
                <p className="font-medium text-red-800">
                  Please fix the following steps before submitting the form:
                </p>

                <ul className="mt-2 list-disc pl-5 text-sm text-red-700">
                  {getStepsWithErrors(submitErrors, steps).map((step) => (
                    <li key={step.position}>
                      <button
                        type="button"
                        onClick={() => goToStep(step.position)}
                        className="underline hover:text-red-900 cursor-pointer"
                      >
                        {step.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
