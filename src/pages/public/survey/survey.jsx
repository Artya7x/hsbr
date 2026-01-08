import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"
import Test from "./steptest"
import DashboardLayout from "@/components/layout/DashBoardLayout";


import { User, Home, CreditCard } from "lucide-react"

import MultiStepForm from "../../../components/stepped-form/MultiStepForm"

export const checkoutSteps = [
  {
    title: "Step 1: Business Impact Analysis",
    component: <Test />,
    icon: User,
    position: 1,
    fields: ["activities"],
  },
  {
    title: "Step 1: Business Impact Analysis",
    component: <step1 />,
    icon: User,
    position: 1,
    fields: ["activities"],
  }
]

export default function Survey() {
  return (
    <DashboardLayout>
      <MultiStepForm steps={checkoutSteps} localStorageKey='checkout-form' />
     </DashboardLayout>
  )

}