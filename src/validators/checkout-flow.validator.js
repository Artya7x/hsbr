import { z } from "zod"


export const impactMatrixItemSchema = z.object({
  intervalId: z.string(),
  severity: z
    .number({
      required_error: "Impact severity is required",
      invalid_type_error: "Impact severity must be a number",
    })
    .nullable(),
})



export const recoverySchema = z.object({
  rtoHours: z
    .number({
      required_error: "RTO is required",
      invalid_type_error: "RTO must be a number",
    })
    .nullable(),

  mtpdHours: z
    .number({
      required_error: "MTPD is required",
      invalid_type_error: "MTPD must be a number",
    })
    .nullable(),

  rpo: z.string().nullable(),

  rpoDetails: z.object({
    frequency: z.string().optional(),
    duration: z.string().optional(),
  }),
})


export const activitySchema = z.object({
  name: z.string().min(1, "Activity name is required"),

  description: z.string().min(1, "Process description is required"),

  impacts: z.array(z.string()).default([]),

  impactDescription: z.string().optional().default(""),

  impactMatrix: z
    .array(impactMatrixItemSchema)
    .min(1, "Impact matrix is required"),

  recovery: recoverySchema,
})



export const step1Schema = z.object({
  activities: z
    .array(activitySchema)
    .min(1, "At least one activity is required"),
})



export const CombinedCheckoutSchema = step1Schema
