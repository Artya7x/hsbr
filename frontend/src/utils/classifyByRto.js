export function classifyByRto(rtoHours, minThreshold, maxThreshold) {
  if (rtoHours === null || rtoHours === undefined || rtoHours === "") return null

  const numeric = Number(rtoHours)
  if (Number.isNaN(numeric)) return null

  if (numeric <= minThreshold) return { label: "Critical / Vital" }
  if (numeric <= maxThreshold) return { label: "Important / Essential" }
  if (numeric > maxThreshold) return { label: "Useful" }
}
