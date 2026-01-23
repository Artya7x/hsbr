import { useFormContext } from "react-hook-form"

import ExternalDependenciesTable from "@/components/stepped-form/ExternalDependencies";

import { useMultiStepForm } from "../../../hooks/use-stepped-form"
import React, {useState} from "react";


export default function step5(){
  
  const {register,getValues,setError,formState: { errors }} = useFormContext()



  const { nextStep } = useMultiStepForm()

  const handleStepSubmit = async () => {
   

    nextStep()
  }

  return (
      <div>
       <ExternalDependenciesTable/>
    </div>
  )
}

