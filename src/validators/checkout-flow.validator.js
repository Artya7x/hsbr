import { z } from "zod"

export const activitySchema = z.object({
  name: z.string().min(1, "Activity name is required"),
  description: z.string().min(1, "Process description is required"),
  impacts: z.array(z.string()).default([]),       
  impactDescription: z.string().optional().default(""),
})

export const step1Schema = z.object({
  activities: z.array(activitySchema).min(1, "At least one activity is required"),
})

export const CombinedCheckoutSchema = step1Schema
  .merge(activitySchema)
  .merge(step1Schema)