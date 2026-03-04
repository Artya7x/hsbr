import { useMultiStepForm } from "@/hooks/use-stepped-form"
import { Button } from "../ui/button"

export default function NextButton() {
  const { nextStep, isLastStep } = useMultiStepForm()

  return (
    <Button
      type={isLastStep ? "submit" : "button"}
      onClick={!isLastStep ? nextStep : undefined}
      variant="classic"
      className="text-white  w-[200px] py-6"
    >
      {isLastStep ? "Submit" : "Continue"}
    </Button>
  )
}
