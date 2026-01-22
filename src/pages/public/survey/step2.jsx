import { useFormContext } from "react-hook-form"

import { useMultiStepForm } from "../../../hooks/use-stepped-form"
import React, {useState} from "react";

import ImpactTimes from "@/components/stepped-form/ImpactTimes";
export default function Step2(){
  
  const {register,getValues,setError,formState: { errors }} = useFormContext()



  const { nextStep } = useMultiStepForm()

  const handleStepSubmit = async () => {
   

    nextStep()
  }

  return (
      <div>
        <ImpactTimes />
    </div>
  )
}

