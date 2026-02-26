import DashboardLayout from "@/components/layout/DashBoardLayout"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useForm, FormProvider } from "react-hook-form"
import CreatableSelect from "react-select/creatable"
import { Controller } from "react-hook-form"
import { NavLink } from "react-router-dom"
import { useFieldArray } from "react-hook-form"

import React from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"


export default function CreateDocumentPage() {
    const methods = useForm({
        defaultValues: {
            timeColumns: [],
            organization: "",
            department: "",
            documentNumber: "",
            version: "",
            date: "",
            criticalityLevels: {
                min: "",
                max: ""
            }


        },
    })

    const { control, watch } = methods
    const [open, setOpen] = React.useState(false)

    const timeIntervals = watch("timeColumns")
    const criticality = watch("criticalityLevels")



    // ---------------- Templates ----------------
const surveyTemplates = {
    basic: {
        timeColumns: [1, 2, 3],
        criticalityLevels: { min: 1, max: 5 }
    },
    advanced: {
        timeColumns: [10, 20, 30],
        criticalityLevels: { min: 5, max: 10 }
    }
}

const handleTemplateChange = (value) => {
    if (value === "new") {
        methods.setValue("timeColumns", [])
        methods.setValue("criticalityLevels.min", "")
        methods.setValue("criticalityLevels.max", "")
        return
    }

    const template = surveyTemplates[value]

    if (template) {
        methods.setValue("timeColumns", template.timeColumns)
        methods.setValue("criticalityLevels.min", template.criticalityLevels.min)
        methods.setValue("criticalityLevels.max", template.criticalityLevels.max)
    }
}


    return (

        <FormProvider {...methods}>
            <DashboardLayout>
                <form onSubmit={methods.handleSubmit(console.log)}>
                    {/* Page title */}
                    <div className="pt-6 pl-6 pb-4 text-xl font-bold">
                        Create Survey
                    </div>

                    {/* Centered content */}
                    <div className="flex p-6 pt-1 flex justify-center">
                        <Card className="w-full max-w-8xl border shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">
                                    Survey Details
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Organization */}
                                <div className="grid gap-2">
                                    <Label>Organization</Label>

                                    <Controller
                                        name="organization"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="h-9 text-sm">
                                                    <SelectValue placeholder="Select organization" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="org1">Org1</SelectItem>
                                                    <SelectItem value="org2">Org2</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>


                                {/* Department */}
                                <div className="grid gap-2">
                                    <Label>Department</Label>
                                    <Controller
                                        name="department"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select department" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="hr">HR</SelectItem>
                                                    <SelectItem value="it">IT</SelectItem>
                                                    <SelectItem value="finance">Finance</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                </div>

                                <Separator />

                                {/* Parameters */}
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        Parameters
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label>Document Number</Label>
                                            <Input className="h-9 text-sm px-3" placeholder="e.g. 234" {...methods.register("documentNumber")} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label>Version</Label>
                                            <Input placeholder="e.g. 1.0" {...methods.register("version")} />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-6">
                                        {/* Date stays a real date */}
                                        <div className="grid gap-1.5 w-full max-w-xs">
                                            <Label>Date</Label>
                                            <Input className="h-9 text-sm" type="date" {...methods.register("date")} />
                                        </div>

                                        {/* From interval */}
                                        <div className="grid gap-1.5 w-full max-w-xs">
                                            <Label>Time Intervals</Label>

                                            <Controller
                                                name="timeColumns"
                                                control={control}
                                                render={({ field }) => (
                                                    <CreatableSelect
                                                        isMulti
                                                        placeholder="Type a value and press Enter"
                                                        value={field.value.map(v => ({ label: v, value: v }))}
                                                        onChange={(newValue) =>
                                                            field.onChange(newValue.map(v => v.value))
                                                        }
                                                        classNamePrefix="react-select"
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="grid gap-2 w-full max-w-lg">
                                            <Label>Criticality thresholds</Label>

                                            <div className="grid grid-cols-2 gap-4">
                                                <Input
                                                    className="h-9 text-sm"
                                                    placeholder="Min criticality"
                                                    type="number"
                                                    {...methods.register("criticalityLevels.min", { valueAsNumber: true })}
                                                />

                                                <Input
                                                    className="h-9 text-sm"
                                                    placeholder="Max criticality"
                                                    type="number"
                                                    {...methods.register("criticalityLevels.max", { valueAsNumber: true })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <Separator />

                                {/* Actions */}
                                <div className="flex justify-end gap-3">
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="classic"
                                                onClick={() => setOpen(true)}
                                            >
                                                Create
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className="sm:max-w-lg">
                                            <DialogHeader>
                                                <DialogTitle>Save as Template?</DialogTitle>
                                                <DialogDescription>
                                                    Would you like to save these settings as a reusable template?
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="space-y-4 py-2">

                                                {/* Template Name */}
                                                <div className="grid gap-2">
                                                    <Label>Template Name</Label>
                                                    <Input
                                                        placeholder="Enter template name"
                                                        {...methods.register("templateName")}
                                                    />
                                                </div>

                                                {/* Preview Time Intervals */}
                                                <div className="grid gap-2">
                                                    <Label>Time Intervals</Label>
                                                    <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                                        {timeIntervals?.length > 0
                                                            ? timeIntervals.join(", ")
                                                            : "No intervals selected"}
                                                    </div>
                                                </div>

                                                {/* Preview Criticality */}
                                                <div className="grid gap-2">
                                                    <Label>Criticality Thresholds</Label>
                                                    <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                                        Min: {criticality?.min ?? "-"} | Max: {criticality?.max ?? "-"}
                                                    </div>
                                                </div>
                                            </div>

                                            <DialogFooter className="!flex !flex-row !justify-center items-center">
                                                <Button
                                                     variant="classic"
                                                    onClick={() => {
                                                        methods.setValue("templateName", "")
                                                        setOpen(false)
                                                        methods.handleSubmit(console.log)()
                                                    }}
                                                >
                                                    Create Without Saving
                                                </Button>

                                                <Button
                                                     variant="classic"
                                                    onClick={() => {
                                                        setOpen(false)
                                                        methods.handleSubmit(console.log)()
                                                    }}
                                                >
                                                    Save as Template & Create
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </DashboardLayout>
        </FormProvider>
    )
}
