import * as z from "zod";

const Step1 = z.object({
        
        name: z.string().min(1, {error:"Activity name is required"}),
        description: z.string().min(1, {error: "Process description is required"}),
        impacts: z.optional(z.array(z.string())),
       impactDescription: z.optional(z.string()) 

})



