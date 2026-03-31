import { IMPACT_SCALE } from "@/components/shared/timePeriod"
import { Input } from "@/components/ui/input"
import { classifyByRto } from "@/utils/classifyByRto"

export default function ImpactMatrixRow({ activity, activityIndex, mode, intervals, surveyParams, errors, setValue }) {
  const showImpact = mode === "Impact Severity"
  const showRecovery = mode === "Recovery and Criticality"

  const rto = activity?.recovery?.rtoHours ?? ""
  const mtpd = activity?.recovery?.mtpdHours ?? ""
  const rpo = activity?.recovery?.rpo ?? ""
  const classification = classifyByRto(rto, surveyParams?.min_threshold, surveyParams?.max_threshold)

  const rtoError = errors?.activities?.[activityIndex]?.recovery?.rtoHours?.message
  const mtpdError = errors?.activities?.[activityIndex]?.recovery?.mtpdHours?.message
  const rpoError = errors?.activities?.[activityIndex]?.recovery?.rpo?.message
  const freqError = errors?.activities?.[activityIndex]?.recovery?.rpoDetails?.frequency?.message
  const durationError = errors?.activities?.[activityIndex]?.recovery?.rpoDetails?.duration?.message

  return (
    <tr className="align-top border-b border-border/40 last:border-b-0">
      <td className="px-6 py-3 font-medium text-slate-700">
        {activity.name || "(Unnamed activity)"}
      </td>

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
                  <option key={`${cell.intervalId}-${scale.value}`} value={scale.value}>
                    {scale.label}
                  </option>
                ))}
              </select>
              {severityError && (
                <p className="mt-1 text-xs text-red-500">{severityError}</p>
              )}
            </td>
          )
        })}

      {showRecovery && (
        <td className="px-6 py-3">
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
                e.target.value === "" ? null : Number(e.target.value),
                { shouldValidate: true, shouldTouch: true, shouldDirty: true }
              )
            }
          />
          {rtoError && <p className="mt-1 text-xs text-red-500">{rtoError}</p>}
        </td>
      )}

      {showRecovery && (
        <td className="px-6 py-3">
          <Input
            type="number"
            min="0"
            step="1"
            className={`h-9 ${mtpdError ? "border-red-500" : ""}`}
            value={mtpd}
            placeholder="e.g. 72"
            onChange={(e) =>
              setValue(
                `activities.${activityIndex}.recovery.mtpdHours`,
                e.target.value === "" ? null : Number(e.target.value),
                { shouldValidate: true, shouldDirty: true, shouldTouch: true }
              )
            }
          />
          {mtpdError && <p className="mt-1 text-xs text-red-500">{mtpdError}</p>}
        </td>
      )}

      {showRecovery && (
        <td className="px-6 py-3">
          <select
            className={`w-full rounded-md border border-border bg-white px-2 py-2 text-sm focus:ring-2 focus:ring-ring ${rpoError ? "border-red-500" : ""}`}
            value={rpo || ""}
            onChange={(e) =>
              setValue(
                `activities.${activityIndex}.recovery.rpo`,
                e.target.value === "" ? null : e.target.value,
                { shouldValidate: true, shouldDirty: true }
              )
            }
          >
            <option value="">Select…</option>
            <option value="backup">Last backup</option>
            <option value="mirroring">Mirroring</option>
            <option value="replication">Replication</option>
          </select>
          {rpoError && <p className="mt-1 text-xs text-red-500">{rpoError}</p>}

          {rpo === "replication" && (
            <div className="mt-2 space-y-2">
              <Input
                type="number"
                min="1"
                className={freqError ? "border-red-500" : ""}
                placeholder="Frequency (e.g. every 15 min)"
                value={activity?.recovery?.rpoDetails?.frequency ?? ""}
                onChange={(e) =>
                  setValue(
                    `activities.${activityIndex}.recovery.rpoDetails.frequency`,
                    e.target.value === "" ? null : Number(e.target.value),
                    { shouldValidate: true, shouldDirty: true, shouldTouch: true }
                  )
                }
              />
              {freqError && <p className="mt-1 text-xs text-red-500">{freqError}</p>}

              <Input
                placeholder="Duration (e.g. 2 hours)"
                className={durationError ? "border-red-500" : ""}
                value={activity?.recovery?.rpoDetails?.duration ?? ""}
                onChange={(e) =>
                  setValue(
                    `activities.${activityIndex}.recovery.rpoDetails.duration`,
                    e.target.value === "" ? null : Number(e.target.value),
                    { shouldValidate: true, shouldDirty: true, shouldTouch: true }
                  )
                }
              />
              {durationError && <p className="mt-1 text-xs text-red-500">{durationError}</p>}
            </div>
          )}
        </td>
      )}

      {showRecovery && (
        <td className="px-6 py-3 text-center">
          {classification ? (
            <div className="inline-flex flex-col items-center gap-1">
              <span className="text-sm font-semibold">{classification.label}</span>
            </div>
          ) : (
            <span className="text-xs italic text-muted-foreground">Set RTO</span>
          )}
        </td>
      )}
    </tr>
  )
}
