import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import ErrorMessage from "@/components/ui/error-message"
import { useMultiStepForm } from "../../../hooks/use-stepped-form"
import NextButton from "../../../components/stepped-form/nextbutton"

export default function Step1(){
  
  const {register,getValues,setError,formState: { errors }} = useFormContext()

  const { nextStep } = useMultiStepForm()

  const handleStepSubmit = async () => {
    const { email } = getValues()

    // Example async validation
    if (email === "test@test.com") {
      setError("email", {
        type: "manual",
        message: "Email already exists in the database. Please use a different email.",
      })
      return
    }

    nextStep()
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Input {...register("email")} placeholder="Email" />
        <ErrorMessage message={errors.email?.message} />
      </div>

      <div>
        <Input {...register("firstName")} placeholder="First Name" />
        <ErrorMessage message={errors.firstName?.message} />
      </div>

      <div>
        <Input {...register("lastName")} placeholder="Last Name" />
        <ErrorMessage message={errors.lastName?.message} />
      </div>

     
    </div>
  )
}

