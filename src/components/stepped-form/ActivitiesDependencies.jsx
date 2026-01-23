import React from "react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export default function ActivitiesDependencies() {
  const { control, register, watch } = useFormContext()

  const { fields } = useFieldArray({
    control,
    name: "activities",
  })

  // live values (may be partially undefined during edits)
  const activities = watch("activities") || []

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-medium">Activity Dependencies</CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b bg-background text-muted-foreground">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Activity</th>
                <th className="px-6 py-3 text-left font-medium">Depends on</th>
                <th className="px-6 py-3 text-left font-medium">Required by</th>
              </tr>
            </thead>

            <tbody>
              {fields.map((field, idx) => (
                <tr
                  key={field.id}
                  className="align-top border-b border-border/40 last:border-b-0"
                >
                  <td className="px-6 py-3 font-medium text-slate-700">
                    {activities[idx]?.name || " No activity name"}
                  </td>

                  <td className="px-6 py-3">
                    <select
                      {...register(`activities.${idx}.dependsOn`)}
                      className="w-full rounded-md border border-border bg-white px-2 py-2 text-sm focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select...</option>

                      {fields.map((_, activityIndex) =>
                        activityIndex !== idx ? (
                          <option key={fields[activityIndex].id} value={activityIndex}>
                            {activities[activityIndex]?.name || `Activity ${activityIndex + 1}`}
                          </option>
                        ) : null
                      )}
                    </select>
                  </td>

                  <td className="px-6 py-3">
                    <select
                      {...register(`activities.${idx}.requiredBy`)}
                      className="w-full rounded-md border border-border bg-white px-2 py-2 text-sm focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select...</option>

                      {fields.map((_, activityIndex) =>
                        activityIndex !== idx ? (
                          <option key={fields[activityIndex].id} value={activityIndex}>
                            {activities[activityIndex]?.name || `Activity ${activityIndex + 1}`}
                          </option>
                        ) : null
                      )}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
