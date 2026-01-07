import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import ErrorMessage from "@/components/ui/error-message"

export default function Step2() {

  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Input {...register("country")} placeholder="Country" />
        <ErrorMessage message={errors.country?.message} />
      </div>

      <div>
        <Input {...register("city")} placeholder="City" />
        <ErrorMessage message={errors.city?.message} />
      </div>

      <div>
        <Input
          {...register("shippingAddress")}
          placeholder="Shipping Address"
        />
        <ErrorMessage message={errors.shippingAddress?.message} />
      </div>
    </div>
  )
}


