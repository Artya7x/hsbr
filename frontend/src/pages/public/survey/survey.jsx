
import Step2 from "./Step2"
import Step1 from "./Step1"
import Step3 from "./step3"
import Step4 from "./step4"
import Step5 from "./step5"
import DashboardLayout from "@/components/layout/DashBoardLayout";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/services/api";
import MultiStepForm from "../../../components/stepped-form/MultiStepForm"

export const checkoutSteps = [
  {
    title: "Step 1: Activities",
    component: <Step1 />,
    position: 1,
    fieldsPaths: ["activities.name", "activities.description", "activities.impacts"],
  },
  {
    title: "Step 2: Impact Severity and Recovery",
    component: <Step2 />,
    position: 2,
    fieldsPaths: ["activities.impactMatrix", "activities.recovery"],
  },
  {
    title: "Step 3: Activity Dependencies",
    component: <Step3 />,
    position: 3,
    fieldsPaths: ["activities.dependsOn", "activities.requiredBy"],
  },
   {
    title: "Step 4: Work Environment requirements ",
    component: <Step4 />,
    position: 4,
    fieldsPaths: ["activities.workEnvironment"],
  },
  {
    title: "Step 5: External Dependencies",
    component: <Step5 />,
    position: 5,
    fieldsPaths: ["activities.externalDependencies"],
  },

]

export default function Survey() {
  const { surveyId } = useParams()
  const location = useLocation()
  const [surveyParams, setSurveyParams] = useState(null)

  useEffect(() => {
    if (!location.state?.created) return
    toast.success("Survey created successfully")
    api.get(`/survey/${surveyId}`)
      .then(res => setSurveyParams(res.data))
      .catch(err => console.error(err))
  }, [])

  if (!location.state?.created) return <Navigate to="/" replace />
  if (!surveyParams) return null

  return (
    <DashboardLayout>
      <MultiStepForm steps={checkoutSteps} surveyId={parseInt(surveyId)} surveyParams={surveyParams} />
    </DashboardLayout>
  )
}