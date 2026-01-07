import { useMultiStepForm } from "@/hooks/use-stepped-form"
import { Button } from "../ui/button"

export default function PrevButton() {
  const { isFirstStep, previousStep } = useMultiStepForm()

  return (
    <Button variant="outline" type="button" className="py-6" onClick={previousStep} disabled={isFirstStep}>
      Previous
    </Button>
  )
}

