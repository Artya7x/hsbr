import React from "react"
import { useFormContext } from "react-hook-form"

import {
    TIME_INTERVALS,
    IMPACT_SCALE,
    CLASSIFICATION_RULES,
} from "@/components/shared/timePeriod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// classification is derived from RTO + org rules (configurable later)
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
            <p className="text-sm text-gray-500 italic">
                No activities defined yet.
            </p>
        )
    }

    return (
        <div className="mt-10">
            <h2 className="text-lg font-semibold mb-3">
                Impact Severity, Recovery Objectives, and Criticality
            </h2>

            <div className="overflow-x-auto border-2 rounded-lg shadow-sm max-w-full">

                <table className="w-full text-sm border-collapse">
                    {/* HEADER */}
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="p-3 text-left w-[220px]">Activity</th>

                            {/* Impact-by-interval columns */}
                            {TIME_INTERVALS.map((interval) => (
                                <th
                                    key={interval.id}
                                    className="p-3 text-center min-w-[140px]"
                                >
                                    {interval.label}
                                </th>
                            ))}

                            {/* Recovery objectives */}
                            <th className="p-3 text-center min-w-[120px]">RTO (hrs)</th>
                            <th className="p-3 text-center min-w-[120px]">MTPD (hrs)</th>
                            <th className="p-3 text-center min-w-[160px]">RPO</th>

                            {/* Derived criticality */}
                            <th className="p-3 text-center min-w-[170px]">Criticality</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {activities.map((activity, activityIndex) => {
                            const rto = activity?.recovery?.rtoHours ?? ""
                            const mtpd = activity?.recovery?.mtpdHours ?? ""
                            const rpo = activity?.recovery?.rpo ?? ""

                            const classification = classifyByRto(rto)

                            return (
                                <tr key={activityIndex} className="border-b align-top">
                                    {/* Activity name */}
                                    <td className="p-3 font-medium">
                                        {activity.name || "(Unnamed activity)"}
                                    </td>

                                    {/* Impact matrix cells */}
                                    {Array.isArray(activity.impactMatrix) &&
                                        activity.impactMatrix.map((cell, cellIndex) => (
 
                                            <td key={cell.intervalId} className="p-3">
                                                <div className="flex flex-col gap-1">
                                                    <select
                                                        className="w-full border rounded-md px-2 py-1 text-sm"
                                                        value={cell.severity ?? ""}
                                                        onChange={(e) =>
                                                            setValue(
                                                                `activities.${activityIndex}.impactMatrix.${cellIndex}.severity`,
                                                                e.target.value === "" ? null : Number(e.target.value)
                                                            )
                                                        }
                                                    >
                                                        <option value="">Select…</option>
                                                        {IMPACT_SCALE.map((scale) => (
                                                            <option
                                                                key={`${cell.intervalId}-${scale.value}`}
                                                                value={scale.value}
                                                            ></option>
                                                        ))}
                                                    </select>

                                                </div>
                                            </td>
                                        ))}

                                    {/* RTO */}
                                    <td className="p-3">
                                        <Input
                                            type="number"
                                            min="0"
                                            step="1"
                                            value={rto}
                                            placeholder="e.g. 24"
                                            onChange={(e) =>
                                                setValue(
                                                    `activities.${activityIndex}.recovery.rtoHours`,
                                                    e.target.value === "" ? null : Number(e.target.value)
                                                )
                                            }
                                        />
                                    </td>

                                    {/* MTPD */}
                                    <td className="p-3">
                                        <Input
                                            type="number"
                                            min="0"
                                            step="1"
                                            value={mtpd}
                                            placeholder="e.g. 72"
                                            onChange={(e) =>
                                                setValue(
                                                    `activities.${activityIndex}.recovery.mtpdHours`,
                                                    e.target.value === "" ? null : Number(e.target.value)
                                                )
                                            }
                                        />
                                    </td>

                                    {/* RPO */}
                                    <td className="p-3">
                                        <select
                                            className="w-full border rounded-md px-2 py-2 text-sm"
                                            value={rpo || ""}
                                            onChange={(e) =>
                                                setValue(
                                                    `activities.${activityIndex}.recovery.rpo`,
                                                    e.target.value === "" ? null : e.target.value
                                                )
                                            }
                                        >
                                            <option value="">Select...</option>
                                            <option value="backup">Last backup</option>
                                            <option value="mirroring">Mirroring</option>
                                            <option value="replication">Replication</option>
                                        </select>

                                        {/* Optional: show replication details later (frequency/duration) */}
                                        {rpo === "replication" ? (
                                            <div className="mt-2 space-y-2">
                                                <Input
                                                    placeholder="Frequency (e.g. every 15 min)"
                                                    value={activity?.recovery?.rpoDetails?.frequency ?? ""}
                                                    onChange={(e) =>
                                                        setValue(
                                                            `activities.${activityIndex}.recovery.rpoDetails.frequency`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <Input
                                                    placeholder="Duration (e.g. 2 hours)"
                                                    value={activity?.recovery?.rpoDetails?.duration ?? ""}
                                                    onChange={(e) =>
                                                        setValue(
                                                            `activities.${activityIndex}.recovery.rpoDetails.duration`,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        ) : null}
                                    </td>

                                    {/* Criticality (derived) */}
                                    <td className="p-3 text-center">
                                        {classification ? (
                                            <div className="inline-flex flex-col items-center gap-1">
                                                <span className="text-sm font-semibold">
                                                    {classification.label}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    RTO ≤ {classification.maxRtoHours === Infinity ? "∞" : classification.maxRtoHours}h
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-500 italic">
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
        </div>
    )
}
