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

import {useState} from "react";
import CreatableSelect from "react-select/creatable"


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


  const [impactOptions, setImpactOptions] = useState( IMPACT_OPTIONS.map(i => ({ lable: i, value: i})))

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
                <th className="px-5 py-3 text-left font-medium w-[250px]">
                  Activity name
                </th>
                <th className="px-5 py-3 text-left font-medium">
                  Process description
                </th>
                <th className="px-5 py-3 text-left font-medium w-[350px]">
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
                        className="h-33"
                        placeholder="Describe the process..."
                      />
                      {descError && (
                        <p className="mt-1 text-xs text-red-600">
                          {descError}
                        </p>
                      )}
                    </td>

                    {/* Impacts */}
                    <td className=" p-3">
                      <CreatableSelect
                        placeholder="Select or press Enter…"
                        isMulti
                        options={impactOptions}
                        value={(activity.impacts || []).map(i => ({
                          label: i,
                          value: i

                        }))}
                        onChange={(selected) => {
                          setValue(`activities.${idx}.impacts`, (selected || []).map(v => v.value))


                        }}

                        menuPortalTarget={document.body}
                        menuPosition="fixed"

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