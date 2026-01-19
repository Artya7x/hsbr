import { useFormContext } from "react-hook-form"

import { useMultiStepForm } from "../../../hooks/use-stepped-form"
import ActivitiesTable from "../../../components/stepped-form/ActivitiesTable"
import React, {useState} from "react";
import ImpactTable from "@/components/stepped-form/ImpactTable"
import ImpactMatrixTable from "@/components/stepped-form/ImpactTimes";
export default function Test(){
  
  const {register,getValues,setError,formState: { errors }} = useFormContext()



  const { nextStep } = useMultiStepForm()

  const handleStepSubmit = async () => {
   

    nextStep()
  }

  return (
      <div>
      <ActivitiesTable  />
     
      <ImpactMatrixTable ></ImpactMatrixTable>
    </div>
  )
}

