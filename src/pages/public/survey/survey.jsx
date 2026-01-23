
import Step2 from "./Step2"
import Step1 from "./Step1"
import Step3 from "./step3"
import Step4 from "./step4"
import Step5 from "./step5"
import DashboardLayout from "@/components/layout/DashBoardLayout";


import { User, Home, CreditCard } from "lucide-react"

import MultiStepForm from "../../../components/stepped-form/MultiStepForm"

export const checkoutSteps = [
  {
    title: "Step 1: Business Impact Analysis",
    component: <Step1 />,
    position: 1,
    fields: ["activities"],
  },
  {
    title: "Step 2: Business Impact Analysis",
    component: <Step2 />,
    position: 2,
    fields: ["activities"],
  },
  {
    title: "Step 2: Business Impact Analysis",
    component: <Step3 />,
    position: 3,
    fields: ["activities"],
  },
   {
    title: "Step 2: Business Impact Analysis",
    component: <Step4 />,
    position: 4,
    fields: ["activities"],
  },
  {
    title: "Step 2: Business Impact Analysis",
    component: <Step5 />,
    position: 5,
    fields: ["activities"],
  },

]

export default function Survey() {
  return (
    <DashboardLayout>
      <MultiStepForm steps={checkoutSteps} localStorageKey='checkout-form' />
     </DashboardLayout>
  )

}