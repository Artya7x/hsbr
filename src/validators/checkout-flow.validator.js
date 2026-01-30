
import { z } from "zod"
import { Step1Validator } from "./step1Validator"
export const step2Validator = z.object({
  impactMatrix: z.array(
    z.object({
      intervalId: z.string(),
      severity: z.string().min(1, "Severity is required"),
    })
  ),

  recovery: z.object({
    rtoHours: z.number().nullable().refine((v) => v !== null && v >= 1, {
      message: "RTO is required",
    }),
    mtpdHours: z.number().nullable().refine((v) => v !== null && v >= 1, {
      message: "MTPD is required",
    }),

    rpo: z
      .enum(["backup", "mirroring", "replication"])
      .nullable()
      .refine((v) => v !== null, {
        message: "RPO is required",
      })
    ,

    rpoDetails: z.object({
      frequency: z.number().int().positive().nullable(),
      duration: z.number().int().positive().nullable(),
    }),
  })
    .superRefine((recovery, ctx) => {
      if (recovery.rpo === "replication") {
        if (recovery.rpoDetails.frequency == null) {
          ctx.addIssue({
            path: ["rpoDetails", "frequency"],
            message: "Frequency is required",
          })
        }

        if (recovery.rpoDetails.duration == null) {
          ctx.addIssue({
            path: ["rpoDetails", "duration"],
            message: "Duration is required",
          })
        }
      }
    }),
})

export const step3Validator = z.object({
  dependsOn: z
    .number()
    .optional()
    .refine((v) => v !== undefined, {
      message: "Please select an activity",
    }),

  requiredBy: z
    .number()
    .optional()
    .refine((v) => v !== undefined, {
      message: "Please select an activity",
    }),
})



export const step4Validator = z.object({
  workEnvironment: z.object({
     staffingLevel: z.number().nullable().refine((v) => v !== null && v >= 1, {
        message: "Staffing level is required",
      }),
     workstations: z.number().nullable().refine((v) => v !== null && v >= 1, {
        message: "Workstations is required",
      }),
    additionalResources: z.array(z.string()),
    systems: z.array(z.string()),
    physicalArchives: z.object({
      criticality: z.string().optional(),
      description: z.string().optional(),
    }).superRefine((data, ctx) => {

      if (data.criticality && !data.description) {
        ctx.addIssue({
          path: ["description"],
          message: "Physical Archives is required"
        })
      }

    }),
    fireproofCabinets: z.string().optional(),
  }),

})

export const Step5Validator = z.object({

  externalDependencies: z.array(
    z.object({
      activityIndex: z
        .number()
        .nullable()
        .refine((v) => v !== null, {
          message: "Activity is required",
        }),
      companyName: z.string().trim().min(1, "Company Name is required"),
      email: z.string().trim().email("Invalid email address"),
      phone: z.string().min(1, "Phone is required"),
      resources: z.array(z.string()).min(1, "At least one resource is required"),
    })
  ),

})

export const Schema = z.object({
  activities: z.array(
    Step1Validator
      .merge(step2Validator)
      .merge(step3Validator)
      .merge(step4Validator)
      
  ),
})