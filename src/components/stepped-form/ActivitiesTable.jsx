import React from "react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

export default function ActivitiesTable() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "activities",
  })

  function addRow() {
    append({
      name: "",
      description: "",
      impacts: [],
      impactDescription: "",
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Activities</h2>
        <Button type="button" onClick={addRow}>
          + Add activity
        </Button>
      </div>

      <div className="overflow-x-auto border-2 rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="text-left p-3 w-[220px]">Activity name</th>
              <th className="text-left p-3">Process description</th>
              <th className="p-3 w-[90px]"></th>
            </tr>
          </thead>

          <tbody>
            {fields.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-3 text-center text-gray-500">
                  No activities yet. Click “Add activity”.
                </td>
              </tr>
            ) : (
              fields.map((field, idx) => {
                const nameError =
                  errors?.activities?.[idx]?.name?.message
                const descError =
                  errors?.activities?.[idx]?.description?.message

                return (
                  <tr key={field.id} className="border-b">
                    <td className="p-3 align-top">
                      <Input
                        {...register(`activities.${idx}.name`)}
                        placeholder="e.g., Customer Support"
                      />
                      {nameError && (
                        <p className="mt-1 text-xs text-red-600">
                          {nameError}
                        </p>
                      )}
                    </td>

                    <td className="p-3 align-top">
                      <Textarea
                        {...register(`activities.${idx}.description`)}
                        placeholder="Describe processes..."
                      />
                      {descError && (
                        <p className="mt-1 text-xs text-red-600">
                          {descError}
                        </p>
                      )}
                    </td>

                    <td className="p-3 align-top text-right">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => remove(idx)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {errors?.activities?.message && (
        <p className="mt-2 text-sm text-red-600">
          {errors.activities.message}
        </p>
      )}
    </div>
  )
}
