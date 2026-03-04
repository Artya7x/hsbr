import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { useMultiStepForm } from "../../hooks/use-stepped-form"
import { checkoutSteps } from "@/pages/public/survey/survey"
import { useFormContext } from "react-hook-form"

export default function ProgressIndicator({ errorSteps }) {
  const { currentStep, goToStep, currentStepIndex } = useMultiStepForm()
  const {
    formState: { errors },
  } = useFormContext()

  const hasStep1Errors = errors?.activities ? true : false


  return (
    <div className="flex items-center w-full justify-center ">
      <div className="w-full space-y-4">
        <div className="relative flex justify-between">
          {/* Progress Line */}
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200">
            <motion.div
              className="h-full bg-black"
              initial={{ width: "0%" }}
              animate={{
                width: `${(currentStepIndex / (checkoutSteps.length - 1)) * 100
                  }%`,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>

          {/* Steps */}
          {checkoutSteps.map((step) => {
            const targetIndex = step.position - 1
            const isCompleted = currentStepIndex > step.position - 1
            const isCurrent = currentStepIndex === step.position - 1
            const isBlocked = targetIndex > currentStepIndex && currentStepIndex === 0 && hasStep1Errors
            const isFirstStep = targetIndex > currentStepIndex && currentStepIndex === 0
            const hasError = errorSteps?.has(step.position)
            return (
              <div key={step.position} className="relative z-10">
                <motion.button
                  onClick={() => {

                    if (targetIndex <= currentStepIndex) {
                      goToStep(step.position)
                      return
                    }

                    if (currentStepIndex === 0) {
                      return
                    }

                    goToStep(step.position)
                  }}
                  className={`flex size-10 items-center justify-center rounded-full border-2
  ${isBlocked || isFirstStep ? "cursor-not-allowed opacity-80" : "cursor-pointer"}
  ${hasError
                      ? "border-red-500 bg-red-200 text-red-700"
                      : isCompleted || isCurrent
                        ? "border-[oklch(0.28_0.07_255)] bg-[oklch(0.28_0.07_255)] text-white"
                        : "border-gray-200 bg-white text-gray-400"
                    }
`}

                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    transition: { type: "spring", stiffness: 500, damping: 30 },
                  }}
                >
                  {isCompleted && !hasError ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <h1>{step.position}</h1>
                  )}

                </motion.button>

                <div
                  className={`absolute left-1/2 mt-2 -translate-x-1/2 text-sm font-medium
  ${hasError
                      ? "text-red-600"
                      : isCompleted || isCurrent
                        ? "text-black"
                        : "text-gray-500"
                    }
`}

                >

                </div>
              </div>
            )
          })}
        </div>

        {/* Screen reader support */}
        <div className="sr-only" role="status" aria-live="polite">
          {`Step ${currentStep.position} of ${checkoutSteps.length}: ${currentStep.title}`}
        </div>
      </div>
    </div>
  )
}
