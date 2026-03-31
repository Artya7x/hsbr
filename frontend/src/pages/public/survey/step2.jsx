import { useFormContext } from "react-hook-form"

import { useMultiStepForm } from "../../../hooks/use-stepped-form"
import React, {useState} from "react";

import ImpactMatrixTable from "@/components/stepped-form/impact/ImpactMatrixTable";
export default function Step2(){
  
  const {register,getValues,setError,formState: { errors }} = useFormContext()



  const { nextStep } = useMultiStepForm()

  const handleStepSubmit = async () => {
   

    nextStep()
  }

  return (
      <div>
        <ImpactMatrixTable />
    </div>
  )
}

