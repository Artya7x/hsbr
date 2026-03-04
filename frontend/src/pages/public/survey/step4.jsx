import { useFormContext } from "react-hook-form"

import WorkEnvironmentTable from "@/components/stepped-form/workEnvironmentTable";

import { useMultiStepForm } from "../../../hooks/use-stepped-form"
import React, {useState} from "react";


export default function step4(){
  
  const {register,getValues,setError,formState: { errors }} = useFormContext()



  const { nextStep } = useMultiStepForm()

  const handleStepSubmit = async () => {
   

    nextStep()
  }

  return (
      <div>
       <WorkEnvironmentTable/>
    </div>
  )
}

