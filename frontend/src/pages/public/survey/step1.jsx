import { useFormContext } from "react-hook-form"

import { useMultiStepForm } from "../../../hooks/use-stepped-form"
import ActivitiesTable from "../../../components/stepped-form/ActivitiesTable"
export default function Step1(){
  
  const {register,getValues,setError,formState: { errors }} = useFormContext()



  const { nextStep } = useMultiStepForm()

  const handleStepSubmit = async () => {
   

    nextStep()
  }

  return (
      <div>
      <ActivitiesTable  />
     
    </div>
  )
}

