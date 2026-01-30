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

export default function CreateDocumentPage() {
    const methods = useForm({
        defaultValues: {
            timeColumns: [],
        },
    })

    const { control } = methods

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
                                    <Select>
                                        <SelectTrigger className="h-9 text-sm">

                                            <SelectValue placeholder="Select organization" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="org1">Org1</SelectItem>
                                            <SelectItem value="org2">Org2</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Department */}
                                <div className="grid gap-2">
                                    <Label>Department</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="hr">HR</SelectItem>
                                            <SelectItem value="it">IT</SelectItem>
                                            <SelectItem value="finance">Finance</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                            <Input className="h-9 text-sm px-3" placeholder="e.g. 234" />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label>Version</Label>
                                            <Input placeholder="e.g. 1.0" />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-6">
                                        {/* Date stays a real date */}
                                        <div className="grid gap-1.5 w-full max-w-xs">
                                            <Label>Date</Label>
                                            <Input className="h-9 text-sm" type="date" />
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

                                    </div>

                                </div>

                                <Separator />

                                {/* Actions */}
                                <div className="flex justify-end gap-3">
                                     <NavLink to="/survey">
                                    <Button variant="classic">Create</Button>
                                    </NavLink>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </DashboardLayout>
        </FormProvider>
    )
}
