import { useMultiStepForm } from "@/hooks/use-stepped-form"
import { Button } from "../ui/button"

export default function NextButton() {
  const { nextStep, isLastStep } = useMultiStepForm()

  return (
    <Button
      type={isLastStep ? "submit" : "button"}
      onClick={!isLastStep ? nextStep : undefined}
      className="text-white bg-black hover:bg-slate-950 transition-colors w-full py-6"
    >
      {isLastStep ? "Submit" : "Continue"}
    </Button>
  )
}
