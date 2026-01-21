
import Step2 from "./step22"
import Test from "./steptest"
import DashboardLayout from "@/components/layout/DashBoardLayout";


import { User, Home, CreditCard } from "lucide-react"

import MultiStepForm from "../../../components/stepped-form/MultiStepForm"

export const checkoutSteps = [
  {
    title: "Step 1: Business Impact Analysis",
    component: <Test />,
    position: 1,
    fields: ["activities"],
  },
  {
    title: "Step 2: Business Impact Analysis",
    component: <Step2 />,
    position: 2,
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