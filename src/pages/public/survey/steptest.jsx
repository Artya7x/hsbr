import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import ErrorMessage from "@/components/ui/error-message"
import { useMultiStepForm } from "../../../hooks/use-stepped-form"
import NextButton from "../../../components/stepped-form/nextbutton"
import ActivitiesTable from "../../../components/stepped-form/ActivitiesTable"
import React, {useState} from "react";
import ImpactTable from "@/components/stepped-form/ImpactTable"
export default function Test(){
  
  const {register,getValues,setError,formState: { errors }} = useFormContext()

    
  const [activities, setActivities] = useState([{ name: "", description: "", impacts: [], impactDescription: "" }]);
  

  const { nextStep } = useMultiStepForm()

  const handleStepSubmit = async () => {
   

    nextStep()
  }

  return (
      <div>
      <ActivitiesTable rows={activities} setRows={setActivities}  />
      <ImpactTable  rows={activities} setRows={setActivities} ></ImpactTable>
    </div>
  )
}

