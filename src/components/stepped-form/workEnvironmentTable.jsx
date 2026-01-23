import React from "react"
import { useFormContext } from "react-hook-form"
import { Input } from "../ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card"


import CreatableSelect from "react-select/creatable"

export default function WorkEnvironmentTable() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext()

  const activities = watch("activities") || []

  
  const allResourceOptions = Array.from(
    new Set(
      activities.flatMap(
        (a) => a.workEnvironment?.additionalResources || []
      )
    )
  )

  const allSystemOptions = Array.from(
    new Set(
      activities.flatMap(
        (a) => a.workEnvironment?.systems || []
      )
    )
  )

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Work Environment Requirements
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b bg-[oklch(97.541%_0.01161_264.582)]">
              <tr>
                <th className="p-3 text-left font-medium">
                  Activity
                </th>
                <th className="p-3 text-left font-medium w-[120px]">
                  Staffing level
                </th>
                <th className="p-3 text-left font-medium w-[120px]">
                  Workstations
                </th>
                <th className="p-3 text-left font-medium">
                  Additional equipment / resources
                </th>
                <th className="p-3 text-left font-medium">
                  Systems / applications
                </th>
                <th className="p-3 text-left font-medium">
                  Physical archives
                </th>
                <th className="p-3 text-left font-medium">
                  Fireproof cabinets
                </th>
              </tr>
            </thead>

            <tbody>
              {activities.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-6 text-center text-gray-400"
                  >
                    No activities defined
                  </td>
                </tr>
              )}

              {activities.map((activity, idx) => {
                const envErrors = errors?.activities?.[idx]?.workEnvironment

                const resources = activity.workEnvironment?.additionalResources || []

                return (
                  <tr key={idx} className="border-b align-top">
                    
                    <td className="p-3 font-medium text-slate-700">
                      {activity.name || "—"}
                    </td>

                    <td className="p-3">
                      <Input
                        {...register(
                          `activities.${idx}.workEnvironment.staffingLevel`
                        )}
                        placeholder="e.g. 3"
                        className="h-10"
                      />
                      {envErrors?.staffingLevel && (
                        <p className="mt-1 text-xs text-red-600">
                          {envErrors.staffingLevel.message}
                        </p>
                      )}
                    </td>

                    <td className="p-3">
                      <Input
                        type="number"
                        min={0}
                        {...register(`activities.${idx}.workEnvironment.workstations`, { valueAsNumber: true }
                        )}
                        placeholder="e.g. 3"
                        className="h-10"
                      />
                    </td>


                    <td className="p-3">
                      <CreatableSelect
                        isMulti
                        placeholder="Select or press Enter…"

                        
                        value={(activity.workEnvironment.additionalResources || []).map(
                          (r) => ({ label: r, value: r })
                        )}

                  
                        options={allResourceOptions.map((r) => ({
                          label: r,
                          value: r,
                        }))}

                        onChange={(selected) => {
                          const values = selected ? selected.map((opt) => opt.value) : []

                          setValue(
                            `activities.${idx}.workEnvironment.additionalResources`,
                            values,
                            { shouldValidate: true }
                          )
                        }}

                        onCreateOption={(inputValue) => {
                          const current =
                            activity.workEnvironment.additionalResources || []

                          if (!current.includes(inputValue)) {
                            setValue(
                              `activities.${idx}.workEnvironment.additionalResources`,
                              [...current, inputValue],
                              { shouldValidate: true }
                            )
                          }
                        }}

                        menuPortalTarget={document.body}
                        menuPosition="fixed"

                      />
                    </td>


                    <td className="p-3">
                      <CreatableSelect
                        isMulti
                        placeholder="Select or press Enter…"

                        
                        value={(activity.workEnvironment.systems || []).map(
                          (r) => ({ label: r, value: r })
                        )}

                       
                        options={allSystemOptions.map((r) => ({
                          label: r,
                          value: r,
                        }))}

                        onChange={(selected) => {
                          const values = selected ? selected.map((opt) => opt.value) : []

                          setValue(
                            `activities.${idx}.workEnvironment.systems`,
                            values,
                            { shouldValidate: true }
                          )
                        }}

                        onCreateOption={(inputValue) => {
                          const current =
                            activity.workEnvironment.systems || []

                          if (!current.includes(inputValue)) {
                            setValue(
                              `activities.${idx}.workEnvironment.systems`,
                              [...current, inputValue],
                              { shouldValidate: true }
                            )
                          }
                        }}

                        menuPortalTarget={document.body}
                        menuPosition="fixed"

                      />
                    </td>


                    <td className="p-3">
                      <div className="flex items-center gap-2">
                       
                        <Input
                          {...register(
                            `activities.${idx}.workEnvironment.physicalArchives.description`
                          )}
                          placeholder="e.g., invoice"
                          className="h-10"
                        />
                        <select
                          {...register(
                            `activities.${idx}.workEnvironment.physicalArchives.criticality`
                          )}
                          className="h-10 rounded-md border border-input px-2 text-sm"
                        >
                          <option value="">Select</option>
                          <option value="critical">Critical</option>
                          <option value="not_critical">Not critical</option>
                        </select>
                      </div>
                    </td>

                    <td className="p-3">
                      <Input
                        {...register(
                          `activities.${idx}.workEnvironment.fireproofCabinets`
                        )}
                        placeholder="e.g., yes"
                        className="h-10"
                      />
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
