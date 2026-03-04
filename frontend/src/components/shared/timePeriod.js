

export const TIME_INTERVALS = [
  { id: "1h", label: "1 h", hours: 1 },
  { id: "6h", label: "6 h", hours: 6 },
  { id: "12h", label: "12 h", hours: 12 },
  { id: "24h", label: "24 h", hours: 24 },
  { id: "48h", label: "48 h", hours: 48 },
  { id: "72h", label: "72 h", hours: 72 },
  { id: "gt72h", label: ">72 h", hours: 999 },
]

//This is constant for now. Later for each orgnizaiton will be different 

//TODO: Fetch from backend

export const IMPACT_SCALE = [
  { value: 1, label: "Little or No Impact", color: "green" },
  { value: 3, label: "Minimal Impact", color: "lime" },
  { value: 5, label: "Moderate Impact", color: "yellow" },
  { value: 7, label: "Significant Impact", color: "orange" },
  { value: 10, label: "Severe Impact", color: "red" },
]


export const CLASSIFICATION_RULES = [
  {
    level: "critical",
    label: "Critical / Vital",
    maxRtoHours: 24,
    color: "red",
  },
  {
    level: "important",
    label: "Important / Essential",
    maxRtoHours: 72,
    color: "orange",
  },
  {
    level: "useful",
    label: "Useful",
    maxRtoHours: Infinity,
    color: "green",
  },
]
