import * as z from "zod";

export const Step1Validator = z.object({
        
        name: z.string().min(1, {message:"Activity name is required"}),
        description: z.string().min(1, {message: "Process description is required"}),
        impacts: z.array(z.string()),
        impactDescription: z.string()

}).superRefine((data,ctx) => {

        if( data.impacts.length > 0 && data.impactDescription=== "" ){
              ctx.addIssue({
                message: "Impact Description is required",
                path: ["impactDescription"]   
              })  
        }
        else if (data.impacts.length === 0 && data.impactDescription != "" ){
                ctx.addIssue({
                        message: "Select an impact ",
                        path: ["impacts"] 
                })
        }
        
})



