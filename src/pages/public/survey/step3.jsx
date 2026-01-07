import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import ErrorMessage from "@/components/ui/error-message"

export default function Step3() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Input {...register("cardNumber")} placeholder="Card Number" />
        <ErrorMessage message={errors.cardNumber?.message} />
      </div>

      <div>
        <Input
          {...register("cardholderName")}
          placeholder="Card Holder Name"
        />
        <ErrorMessage message={errors.cardholderName?.message} />
      </div>

      <div>
        <Input {...register("cvv")} placeholder="CVV" />
        <ErrorMessage message={errors.cvv?.message} />
      </div>
    </div>
  )
}
