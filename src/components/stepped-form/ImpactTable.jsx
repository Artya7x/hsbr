import React from "react"
import { useFormContext } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const IMPACT_OPTIONS = [
  "High energy usage",
  "Privacy risk",
  "Data exposure",
  "Safety issue",
  "Financial impact",
  "Environmental impact",
]

export default function ImpactTable() {
  const { watch, setValue } = useFormContext()

  const activities = watch("activities") || []

  const hasData = activities.some(
    (a) =>
      a.name?.trim() ||
      a.impacts?.length > 0 ||
      a.impactDescription?.trim()
  )

  function toggleImpact(activityIndex, impactName) {
    const currentImpacts = activities[activityIndex].impacts || []
    const exists = currentImpacts.includes(impactName)

    const updatedImpacts = exists
      ? currentImpacts.filter((i) => i !== impactName)
      : [...currentImpacts, impactName]

    setValue(
      `activities.${activityIndex}.impacts`,
      updatedImpacts,
      { shouldValidate: true }
    )
  }

  function addCustomImpact(activityIndex, customName) {
    const trimmed = customName.trim()
    if (!trimmed) return

    const currentImpacts = activities[activityIndex].impacts || []

    if (!currentImpacts.includes(trimmed)) {
      setValue(
        `activities.${activityIndex}.impacts`,
        [...currentImpacts, trimmed],
        { shouldValidate: true }
      )
    }
  }

  function updateDescription(activityIndex, value) {
    setValue(
      `activities.${activityIndex}.impactDescription`,
      value,
      { shouldValidate: true }
    )
  }

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-3">
        Impacts per Activity
      </h2>

      <div className="overflow-x-auto border-2 rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th className="p-3 text-left">Activity</th>
              <th className="p-3 text-left">Select Impacts</th>
              <th className="p-3 w-[260px] text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {!hasData && (
              <tr>
                <td colSpan={3} className="p-3 text-center">
                  <p className="text-gray-500 italic">
                    No activities added yet.
                  </p>
                </td>
              </tr>
            )}

            {hasData &&
              activities.map((activity, idx) => {
                const customImpacts =
                  activity.impacts?.filter(
                    (i) => !IMPACT_OPTIONS.includes(i)
                  ) || []

                const allImpactOptions = [
                  ...IMPACT_OPTIONS,
                  ...customImpacts,
                ]

                return (
                  <tr key={idx} className="border-b align-top">
                    <td className="p-3 font-medium w-[220px]">
                      {activity.name || "(Unnamed activity)"}
                    </td>

                    <td className="p-3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {allImpactOptions.map((opt) => {
                          const selected =
                            activity.impacts?.includes(opt)

                          return (
                            <Button
                              key={opt}
                              type="button"
                              variant={selected ? "default" : "outline"}
                              className="px-2 py-1 text-xs"
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
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addCustomImpact(idx, e.target.value)
                            e.target.value = ""
                          }
                        }}
                      />
                    </td>

                    <td className="p-3">
                      <Textarea
                        className="w-[240px] h-[130px]"
                        placeholder="Describe the impact of this activity..."
                        value={activity.impactDescription || ""}
                        onChange={(e) =>
                          updateDescription(idx, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
