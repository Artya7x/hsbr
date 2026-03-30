import React from "react"
import { useFormContext } from "react-hook-form"
import { useMultiStepForm } from "@/hooks/use-stepped-form"

import { IMPACT_SCALE } from "@/components/shared/timePeriod"

import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


function classifyByRto(rtoHours, minThreshold, maxThreshold) {
  if (rtoHours === null || rtoHours === undefined || rtoHours === "") return null

  const numeric = Number(rtoHours)
  if (Number.isNaN(numeric)) return null

  if (numeric <= minThreshold) return { label: "Critical / Vital" }
  if (numeric <= maxThreshold) return { label: "Important / Essential" }
  return { label: "Useful" }
}

export default function ImpactMatrixTable() {
  const { watch, setValue, trigger, formState: { errors } } = useFormContext()
  const { intervals, surveyParams } = useMultiStepForm()
  const activities = watch("activities") || []

  if (!activities.length) {
    return (
      <p className="text-sm italic text-muted-foreground">
        No activities defined yet.
      </p>
    )
  }

  function renderTable({ mode }) {
    const showImpact = mode === "Impact Severity"
    const showRecovery = mode === "Recovery and Criticality"

    return (


      <div className="overflow-x-auto rounded-xl border border-border ">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className=" bg-[oklch(97.541%_0.01161_264.582)] text-muted-foreground  ">
            <tr className="border-b border-border/60 ">
              <th className="px-6 py-3 text-left  tracking-wide font-medium min-w-[190px]">Activity</th>

              {showImpact && intervals.map((interval) => (
                <th
                  key={interval.interval_id}
                  className="px-9 py-3 text-center font-medium  tracking-wide min-w-[160px]"
                >
                  {interval.interval_number}h
                </th>
              ))}

              {showRecovery && (<>
                <th className="px-6 py-3 text-center font-medium tracking-wide min-w-[110px]">
                  RTO (hrs)
                </th>
                <th className="px-6 py-3 text-center  font-medium tracking-wide min-w-[110px]">
                  MTPD (hrs)
                </th>
                <th className="px-6 py-3 text-center font-medium tracking-wide min-w-[110px]">
                  RPO
                </th>
                <th className="px-6 py-3 text-center font-medium tracking-wide min-w-[190px]">
                  Criticality
                </th>
              </>)}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {activities.map((activity, activityIndex) => {
              const rto = activity?.recovery?.rtoHours ?? ""
              const mtpd = activity?.recovery?.mtpdHours ?? ""
              const rpo = activity?.recovery?.rpo ?? ""
              const classification = classifyByRto(rto, surveyParams?.min_threshold, surveyParams?.max_threshold)



              //Validation consts
              const rtoError = errors?.activities?.[activityIndex]?.recovery?.rtoHours?.message
              const mtpdError = errors?.activities?.[activityIndex]?.recovery?.mtpdHours?.message
              const rpoError = errors?.activities?.[activityIndex]?.recovery?.rpo?.message
              const freqError = errors?.activities?.[activityIndex]?.recovery?.rpoDetails?.frequency?.message
              const durationError = errors?.activities?.[activityIndex]?.recovery?.rpoDetails?.duration?.message
              return (
                <tr
                  key={activityIndex}
                  className="align-top border-b border-border/40 last:border-b-0 "
                >
                  {/* Activity name */}
                  <td className="px-6 py-3 font-medium text-slate-700">
                    {activity.name || "(Unnamed activity)"}
                  </td>


                  {/* Impact matrix */}
                  {showImpact && Array.isArray(activity.impactMatrix) &&
                    activity.impactMatrix.map((cell, cellIndex) => {

                      const severityError =
                        errors?.activities?.[activityIndex]?.impactMatrix?.[cellIndex]?.severity?.message

                      return (
                        <td key={cellIndex} className="px-6 py-3">
                          <select
                            className={`w-full rounded-md border px-2 py-1.5 text-sm focus:ring-2 focus:ring-ring
                            ${severityError ? "border-red-500" : "border-border"}`}
                            value={cell.severity ?? ""}
                            onChange={(e) =>
                              setValue(
                                `activities.${activityIndex}.impactMatrix.${cellIndex}.severity`,
                                e.target.value === "" ? "" : e.target.value
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

                          {severityError && (
                            <p className="mt-1 text-xs text-red-500">
                              {severityError}
                            </p>
                          )}
                        </td>
                      )
                    })}


                  {/* RTO */}
                  {showRecovery && <td className="px-6 py-3">

                    <Input
                      type="number"
                      min="0"
                      step="1"
                      className={`h-9 ${rtoError ? "border-red-500" : ""}`}
                      value={rto}
                      placeholder="e.g. 24"
                      onChange={(e) =>
                        setValue(
                          `activities.${activityIndex}.recovery.rtoHours`,
                          e.target.value === ""
                            ? null
                            : Number(e.target.value), {
                          shouldValidate: true,
                          shouldTouch: true,
                          shouldDirty: true,
                        }
                        )
                      }
                    />
                    {rtoError && (
                      <p className="mt-1 text-xs text-red-500">{rtoError}</p>
                    )}
                  </td>
                  }
                  {/* MTPD */}
                  {showRecovery && <td className="px-6 py-3">
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      className={`h-9 ${rtoError ? "border-red-500" : ""}`}
                      value={mtpd}
                      placeholder="e.g. 72"
                      onChange={(e) =>
                        setValue(
                          `activities.${activityIndex}.recovery.mtpdHours`,
                          e.target.value === ""
                            ? null
                            : Number(e.target.value),
                             { shouldValidate: true, shouldDirty: true, shouldTouch: true }
                        )
                      }

                    />
                    {mtpdError && (
                      <p className="mt-1 text-xs text-red-500">{mtpdError}</p>
                    )}
                  </td>}

                  {/* RPO */}
                  {showRecovery && <td className="px-6 py-3">
                    <select
                      className={`w-full rounded-md border border-border bg-white px-2 py-2 text-sm focus:ring-2 focus:ring-ring ${rpoError ? "border-red-500" : ""}`}
                      value={rpo || ""}
                      onChange={(e) =>
                        setValue(
                          `activities.${activityIndex}.recovery.rpo`,
                          e.target.value === ""
                            ? null
                            : e.target.value,
                          { shouldValidate: true, shouldDirty: true }
                        )
                      }
                    >
                      <option value="">Select…</option>
                      <option value="backup">Last backup</option>
                      <option value="mirroring">Mirroring</option>
                      <option value="replication">Replication</option>
                    </select>

                    {rpoError &&
                      (<p className="mt-1 text-xs text-red-500">{rpoError}</p>)
                    }

                    {rpo === "replication" && (
                      <div className="mt-2 space-y-2">
                        <Input
                          type="number"
                          min="1"
                          className={` ${freqError ? "border-red-500" : ""}`}
                          placeholder="Frequency (e.g. every 15 min)"
                          value={
                            activity?.recovery?.rpoDetails?.frequency ?? ""
                          }
                          onChange={(e) =>
                            setValue(
                              `activities.${activityIndex}.recovery.rpoDetails.frequency`,
                              e.target.value === "" ? null : Number(e.target.value),
                              { shouldValidate: true, shouldDirty: true, shouldTouch: true }
                            )
                          }
                        />
                        {freqError && (
                          <p className="mt-1 text-xs text-red-500">
                            {freqError}
                          </p>)}

                        <Input
                          placeholder="Duration (e.g. 2 hours)"
                          className={` ${durationError ? "border-red-500" : ""}`}
                          value={
                            activity?.recovery?.rpoDetails?.duration ?? ""
                          }
                          onChange={(e) =>
                            setValue(
                              `activities.${activityIndex}.recovery.rpoDetails.duration`,
                              e.target.value === "" ? null : Number(e.target.value),
                              { shouldValidate: true, shouldDirty: true, shouldTouch: true }
                            )
                          }
                        />
                         {durationError && (
                          <p className="mt-1 text-xs text-red-500">
                            {durationError}
                          </p>)}
                      </div>
                    )}
                  </td>}

                  {/* Criticality */}
                  {showRecovery && <td className="px-6 py-3 text-center">
                    {classification ? (
                      <div className="inline-flex flex-col items-center gap-1">
                        <span className="text-sm font-semibold">
                          {classification.label}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs italic text-muted-foreground">
                        Set RTO
                      </span>
                    )}
                  </td>}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>


    )
  }

  return (

    <Card className="mt-10 border border-border shadow-sm">

      <Tabs defaultValue="Impact Severity">

        <CardHeader className="flex flex-col gap-4 pb-0">
          <CardTitle className="text-base font-medium">
            Impact Severity, Recovery Objectives, and Criticality
          </CardTitle>

          <TabsList className="w-fit bg-background">
            <TabsTrigger value="Impact Severity" className="  data-[state=active]:bg-[var(--sidebar)] data-[state=active]:text-white"> Impact Severity</TabsTrigger>
            <TabsTrigger value="Recovery and Criticality" className="  data-[state=active]:bg-[var(--sidebar)] data-[state=active]:text-white"> Recovery and Criticality </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="pt-0">

          <TabsContent value="Impact Severity">
            {renderTable({ mode: "Impact Severity" })}
          </TabsContent>

          <TabsContent value="Recovery and Criticality">
            {renderTable({ mode: "Recovery and Criticality" })}
          </TabsContent>

        </CardContent>

      </Tabs>

    </Card>

  )
}
