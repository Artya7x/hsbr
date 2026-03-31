import ImpactMatrixRow from "./ImpactMatrixRow"

export default function ImpactMatrixTableView({ mode, activities, intervals, surveyParams, errors, setValue }) {
  const showImpact = mode === "Impact Severity"
  const showRecovery = mode === "Recovery and Criticality"

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-[oklch(97.541%_0.01161_264.582)] text-muted-foreground">
          <tr className="border-b border-border/60">
            <th className="px-6 py-3 text-left tracking-wide font-medium min-w-[190px]">Activity</th>

            {showImpact && intervals.map((interval) => (
              <th
                key={interval.interval_id}
                className="px-9 py-3 text-center font-medium tracking-wide min-w-[160px]"
              >
                {interval.interval_number}h
              </th>
            ))}

            {showRecovery && <>
              <th className="px-6 py-3 text-center font-medium tracking-wide min-w-[110px]">RTO (hrs)</th>
              <th className="px-6 py-3 text-center font-medium tracking-wide min-w-[110px]">MTPD (hrs)</th>
              <th className="px-6 py-3 text-center font-medium tracking-wide min-w-[110px]">RPO</th>
              <th className="px-6 py-3 text-center font-medium tracking-wide min-w-[190px]">Criticality</th>
            </>}
          </tr>
        </thead>

        <tbody>
          {activities.map((activity, activityIndex) => (
            <ImpactMatrixRow
              key={activityIndex}
              activity={activity}
              activityIndex={activityIndex}
              mode={mode}
              intervals={intervals}
              surveyParams={surveyParams}
              errors={errors}
              setValue={setValue}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
