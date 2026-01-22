import { z } from "zod"

export const activityBaseSchema = z.object({
  name: z.string().trim().min(1, "Activity name is required"),
  description: z.string().trim().min(1, "Process description is required"),
  impacts: z.array(z.string()).default([]),
  impactDescription: z.string().trim().optional(),
})

export const impactMatrixItemSchema = z.object({
  intervalId: z.string(),
  severity: z.number().nullable(), 
})

export const recoverySchema = z.object({
  rtoHours: z.number().nullable(),
  mtpdHours: z.number().nullable(),
  rpo: z.enum(["backup", "mirroring", "replication"]).nullable(),

  rpoDetails: z.object({
    frequency: z.string(),
    duration: z.string(),
  }),
})

export const fullActivitySchema = activityBaseSchema.extend({
  impactMatrix: z.array(impactMatrixItemSchema),
  recovery: recoverySchema,
})

export const checkoutSchema = z.object({
  activities: z.array(fullActivitySchema).min(1),
})
