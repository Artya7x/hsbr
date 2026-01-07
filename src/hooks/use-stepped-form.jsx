import { useContext } from "react"
import { MultiStepFormContext } from "../components/stepped-form/MultiStepForm"

export function useMultiStepForm() {
  const context = useContext(MultiStepFormContext)

  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within MultiStepFormContext.Provider"
    )
  }

  return context
}
