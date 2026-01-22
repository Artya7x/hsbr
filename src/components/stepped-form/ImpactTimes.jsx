import React from "react"
import { useFormContext } from "react-hook-form"

import {
  TIME_INTERVALS,
  IMPACT_SCALE,
  CLASSIFICATION_RULES,
} from "@/components/shared/timePeriod"

import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

function classifyByRto(rtoHours) {
  if (rtoHours === null || rtoHours === undefined || rtoHours === "") return null

  const numeric = Number(rtoHours)
  if (Number.isNaN(numeric)) return null

  return (
    CLASSIFICATION_RULES.find((rule) => numeric <= rule.maxRtoHours) || null
  )
}

export default function ImpactMatrixTable() {
  const { watch, setValue } = useFormContext()
  const activities = watch("activities") || []

  if (!activities.length) {
    return (
      <p className="text-sm italic text-muted-foreground">
        No activities defined yet.
      </p>
    )
  }

  return (
    <Card className="mt-10 border border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Impact Severity, Recovery Objectives, and Criticality
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="overflow-x-auto rounded-xl border border-border bg-white">
          <table className="w-full text-sm">
            {/* Header */}
            <thead className=" bg-[oklch(97.541%_0.01161_264.582)] text-muted-foreground  ">
              <tr className="border-b border-border/60 ">
                <th className="px-6 py-3 text-left   tracking-wide w-[220px]">
                  Activity
                </th>

                {TIME_INTERVALS.map((interval) => (
                  <th
                    key={interval.id}
                    className="px-9 py-3 text-center  tracking-wide min-w-[190px]"
                  >
                    {interval.label}
                  </th>
                ))}

                <th className="px-6 py-3 text-center  tracking-wide min-w-[130px]">
                  RTO (hrs)
                </th>
                <th className="px-6 py-3 text-center   tracking-wide min-w-[130px]">
                  MTPD (hrs)
                </th>
                <th className="px-6 py-3 text-center  tracking-wide min-w-[190px]">
                  RPO
                </th>
                <th className="px-6 py-3 text-center  tracking-wide min-w-[190px]">
                  Criticality
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {activities.map((activity, activityIndex) => {
                const rto = activity?.recovery?.rtoHours ?? ""
                const mtpd = activity?.recovery?.mtpdHours ?? ""
                const rpo = activity?.recovery?.rpo ?? ""
                const classification = classifyByRto(rto)

                return (
                  <tr
                    key={activityIndex}
                    className="align-top border-b border-border/40 last:border-b-0 "
                  >
                    {/* Activity name */}
                    <td className="px-6 py-3 font-medium">
                      {activity.name || "(Unnamed activity)"}
                    </td>

                    {/* Impact matrix */}
                    {Array.isArray(activity.impactMatrix) &&
                      activity.impactMatrix.map((cell, cellIndex) => (
                        <td key={cell.intervalId} className="px-6 py-3">
                          <select
                            className="w-full rounded-md border border-border bg-white px-2 py-1.5 text-sm focus:ring-2 focus:ring-ring"
                            value={cell.severity ?? ""}
                            onChange={(e) =>
                              setValue(
                                `activities.${activityIndex}.impactMatrix.${cellIndex}.severity`,
                                e.target.value === ""
                                  ? null
                                  : Number(e.target.value)
                              )
                            }
                          >
                            <option value="">Select…</option>
                            {IMPACT_SCALE.map((scale) => (
                              <option
                                key={`${cell.intervalId}-${scale.value}`}
                                value={scale.value}
                              >
                                {scale.label}
                              </option>
                            ))}
                          </select>
                        </td>
                      ))}

                    {/* RTO */}
                    <td className="px-6 py-3">
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        className="h-9"
                        value={rto}
                        placeholder="e.g. 24"
                        onChange={(e) =>
                          setValue(
                            `activities.${activityIndex}.recovery.rtoHours`,
                            e.target.value === ""
                              ? null
                              : Number(e.target.value)
                          )
                        }
                      />
                    </td>

                    {/* MTPD */}
                    <td className="px-6 py-3">
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        className="h-9"
                        value={mtpd}
                        placeholder="e.g. 72"
                        onChange={(e) =>
                          setValue(
                            `activities.${activityIndex}.recovery.mtpdHours`,
                            e.target.value === ""
                              ? null
                              : Number(e.target.value)
                          )
                        }
                      />
                    </td>

                    {/* RPO */}
                    <td className="px-6 py-3">
                      <select
                        className="w-full rounded-md border border-border bg-white px-2 py-2 text-sm focus:ring-2 focus:ring-ring"
                        value={rpo || ""}
                        onChange={(e) =>
                          setValue(
                            `activities.${activityIndex}.recovery.rpo`,
                            e.target.value === ""
                              ? null
                              : e.target.value
                          )
                        }
                      >
                        <option value="">Select…</option>
                        <option value="backup">Last backup</option>
                        <option value="mirroring">Mirroring</option>
                        <option value="replication">Replication</option>
                      </select>

                      {rpo === "replication" && (
                        <div className="mt-2 space-y-2">
                          <Input
                            placeholder="Frequency (e.g. every 15 min)"
                            value={
                              activity?.recovery?.rpoDetails?.frequency ?? ""
                            }
                            onChange={(e) =>
                              setValue(
                                `activities.${activityIndex}.recovery.rpoDetails.frequency`,
                                e.target.value
                              )
                            }
                          />
                          <Input
                            placeholder="Duration (e.g. 2 hours)"
                            value={
                              activity?.recovery?.rpoDetails?.duration ?? ""
                            }
                            onChange={(e) =>
                              setValue(
                                `activities.${activityIndex}.recovery.rpoDetails.duration`,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )}
                    </td>

                    {/* Criticality */}
                    <td className="px-6 py-3 text-center">
                      {classification ? (
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="text-sm font-semibold">
                            {classification.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            RTO ≤{" "}
                            {classification.maxRtoHours === Infinity
                              ? "∞"
                              : classification.maxRtoHours}
                            h
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs italic text-muted-foreground">
                          Set RTO
                        </span>
                      )}
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
