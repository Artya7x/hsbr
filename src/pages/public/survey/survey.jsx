import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"
import Test from "./steptest"
import DashboardLayout from "@/components/layout/DashBoardLayout";
import {
  step1Schema,
  step2Schema,
  step3Schema,
} from "../../../validators/checkout-flow.validator"

import { User, Home, CreditCard } from "lucide-react"

import MultiStepForm from "../../../components/stepped-form/MultiStepForm"

export const checkoutSteps = [
  {
    title: "Step 1: Business Impact Analysis",
    component: <Test />,
    icon: User,
    position: 1,
    validationSchema: step1Schema,
    fields: ["email", "firstName", "lastName"],
  },
  {
    title: "Step 2: Address Details",
    component: <Step2 />,
    icon: Home,
    position: 2,
    validationSchema: step2Schema,
    fields: ["country", "city", "shippingAddress"],
  },
  {
    title: "Step 3: Payment Details",
    component: <Step3 />,
    icon: CreditCard,
    position: 3,
    validationSchema: step3Schema,
    fields: ["cardNumber", "cardholderName", "cvv"],
  },
]

export default function Survey() {
  return (
    <DashboardLayout>
      <MultiStepForm steps={checkoutSteps} localStorageKey='checkout-form' />
     </DashboardLayout>
  )

}