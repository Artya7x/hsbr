import React from "react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Trash } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card"
import { TIME_INTERVALS } from "../shared/timePeriod"

const IMPACT_OPTIONS = [
  "High energy usage",
  "Privacy risk",
  "Data exposure",
  "Safety issue",
  "Financial impact",
  "Environmental impact",
]

export default function ActivitiesTable() {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "activities",
  })

  const activities = watch("activities") || []

  function addRow() {
    append({
      name: "",
      description: "",
      impacts: [],
      impactDescription: "",
      impactMatrix: TIME_INTERVALS.map((interval) => ({
        intervalId: interval.id,
        severity: null,
      })),
      recovery: {
        rtoHours: null,
        mtpdHours: null,
        rpo: null,
        rpoDetails: {
          frequency: "",
          duration: "",
        },
      },
    })
  }

  function toggleImpact(activityIndex, impactName) {
    const current = activities[activityIndex].impacts || []
    const updated = current.includes(impactName)
      ? current.filter((i) => i !== impactName)
      : [...current, impactName]

    setValue(`activities.${activityIndex}.impacts`, updated, {
      shouldValidate: true,
    })
  }

  function addCustomImpact(activityIndex, value) {
    const trimmed = value.trim()
    if (!trimmed) return

    const current = activities[activityIndex].impacts || []
    if (!current.includes(trimmed)) {
      setValue(
        `activities.${activityIndex}.impacts`,
        [...current, trimmed],
        { shouldValidate: true }
      )
    }
  }

  function updateDescription(activityIndex, value) {
    setValue(`activities.${activityIndex}.impactDescription`, value, {
      shouldValidate: true,
    })
  }

  return (
    <Card className="border border-slate-200 shadow-sm">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium ">
          Activities
        </CardTitle>
        <Button type="button" variant="classic" onClick={addRow}>
          Add activity
        </Button>
      </CardHeader>

      {/* Content */}
      <CardContent className="pt-0">
        <div className="overflow-x-auto rounded-xl border border-border ">
          <table className="w-full text-sm">
            <thead className=" border-b   bg-[oklch(97.541%_0.01161_264.582)] ">
              <tr>
                <th className="px-5 py-3 text-left font-medium">
                  Activity name
                </th>
                <th className="px-5 py-3 text-left font-medium">
                  Process description
                </th>
                <th className="px-5 py-3 text-left font-medium">
                  Select impacts
                </th>
                <th className="px-5 py-3 text-left font-medium w-[260px]">
                  Impact description
                </th>
                <th className="p-3 w-[90px]"></th>
              </tr>
            </thead>

            <tbody>
              {fields.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-6 text-center text-gray-400"
                  >
                    No activities added
                  </td>
                </tr>
              )}

              {fields.map((field, idx) => {
                const activity = activities[idx] || {}
                const nameError =
                  errors?.activities?.[idx]?.name?.message
                const descError =
                  errors?.activities?.[idx]?.description?.message

                const customImpacts =
                  activity.impacts?.filter(
                    (i) => !IMPACT_OPTIONS.includes(i)
                  ) || []

                const allImpactOptions = [
                  ...IMPACT_OPTIONS,
                  ...customImpacts,
                ]

                return (
                  <tr
                    key={field.id}
                    className="border-b align-top"
                  >
                  
                    <td className="p-3">
                      <Input
                        {...register(`activities.${idx}.name`)}
                        placeholder="e.g., Customer Support"
                        className="h-12"
                      />
                      {nameError && (
                        <p className="mt-1 text-xs text-red-600">
                          {nameError}
                        </p>
                      )}
                    </td>

                    
                    <td className="p-3">
                      <Textarea
                        {...register(
                          `activities.${idx}.description`
                        )}
                        className="h-36"
                        placeholder="Describe the process..."
                      />
                      {descError && (
                        <p className="mt-1 text-xs text-red-600">
                          {descError}
                        </p>
                      )}
                    </td>

                    {/* Impacts */}
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {allImpactOptions.map((opt) => {
                          const selected =
                            activity.impacts?.includes(opt)

                          return (
                            <Button
                              key={opt}
                              type="button"
                              variant= "options"
                              className={`px-2 py-1 text-xs rounded-full ${
                                selected
                                  ? "bg-orange-500 text-white border-orange-500"
                                  : "border-slate-300 text-slate-700"
                              }`}
                              onClick={() =>
                                toggleImpact(idx, opt)
                              }
                            >
                              {opt}
                            </Button>
                          )
                        })}
                      </div>

                      <Input
                        placeholder="Add custom impact"
                        className="text-xs mt-7"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addCustomImpact(idx, e.target.value)
                            e.target.value = ""
                          }
                        }}
                      />
                    </td>

                    {/* Impact description */}
                    <td className="p-3">
                      <Textarea
                        className="h-[130px]"
                        placeholder="Describe the impact..."
                        value={activity.impactDescription || ""}
                        onChange={(e) =>
                          updateDescription(idx, e.target.value)
                        }
                      />
                    </td>

                  
                    <td className="p-3 pt-5">
                      <button
                        className="inline-flex items-center justify-center p-2 cursor-pointer "
                        onClick={() => remove(idx)}
                      >
                        <Trash className="h-6 w-6 text-red-700 hover:text-red-900 " />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}