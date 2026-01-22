import { useFormContext } from "react-hook-form"

import ActivitiesDependencies from "@/components/stepped-form/ActivitiesDependencies";

import { useMultiStepForm } from "../../../hooks/use-stepped-form"
import React, {useState} from "react";


export default function Step3(){
  
  const {register,getValues,setError,formState: { errors }} = useFormContext()



  const { nextStep } = useMultiStepForm()

  const handleStepSubmit = async () => {
   

    nextStep()
  }

  return (
      <div>
       <ActivitiesDependencies/>
    </div>
  )
}

