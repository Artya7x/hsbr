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
import CreatableSelect from "react-select/creatable"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/services/api"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorMessage from "@/components/ui/error-message"


const schema = z.object({
      survey_code: z.string().min(1, "Document number is required"),
      review_date: z.string().min(1, "Date is required"),
      version: z.string().min(1, "Version is required"),
      org_id: z.string().min(1, "Organization is required"),
      departments_id: z.string().min(1, "Department is required"),
      name: z.string().optional(),
      min_threshold: z.number().optional(),
        max_threshold: z.number().optional(),
        intervals: z.array(z.any()).optional(),
      
  })

export default function CreateDocumentPage() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [organization, setOrganization] = useState([])
    const [departments, setDepartments] = useState([])
    const [selectedOrg, setSelectedOrg] = useState(null)
    const [templates, setTemplate] = useState([])
    const [TemplateParameters, setTemplateParameters] = useState(null)
    const [pendingData, setPendingData] = useState(null)
    const [selectedTemplate, setSelectedTemp] = useState("new")

    const {register, setValue, handleSubmit, control, setError, formState: {errors}} = useForm({
        
        resolver: zodResolver(schema),
        defaultValues:{
            survey_code:"",
            review_date: "",
            version: "",
            org_id: "",
            departments_id: "",
            template_id: null,
            name: "",
            min_threshold: "",
            max_threshold: "",
            intervals: [],
            version_id: null
        }
    })




    useEffect( () => {
        
        api.get("/organizations/")
        .then( results => setOrganization(results.data))
        .catch( err => {console.log(err)})

    }, []);

    useEffect( () => {
        if (selectedOrg)
            api.get(`/organizations/${selectedOrg}/department`)
            .then( results => setDepartments(results.data))
            .catch(err => console.log(err))


    }, [selectedOrg])


    useEffect(() => {

        api.get("/template")
        .then( results => setTemplate(results.data))
        .catch(err => console.log(err))

    },[])


    useEffect( ()=> {

        if(selectedTemplate == "new"){
            setTemplateParameters(null)
            setValue("template_id", null)
            setValue("min_threshold", "")
            setValue("max_threshold", "")
            setValue("intervals", [])
            setValue("version_id", null)
        }
        else if(selectedTemplate){
            api.get(`/template/parameters/${selectedTemplate}`)
            .then( 
            results => {
                setTemplateParameters(results.data)
                setValue("template_id", parseInt(selectedTemplate)) 
                setValue("min_threshold", results.data.min_threshold)
                setValue("max_threshold", results.data.max_threshold)
                setValue("intervals", results.data.intervals.map(i => ({ label: i.interval_number, value: i.interval_number })))
                setValue("version_id", results.data.version_id)
            })
            .catch( err => console.log(err))

        }
        
    }, [selectedTemplate])


    const onSubmit = (formData) => {
        const updated_data = {
            ...formData,
            org_id: parseInt(formData.org_id),
            departments_id: parseInt(formData.departments_id),
            intervals: formData.intervals.map(i => parseInt(i.value)),
            template_id: formData.template_id ? parseInt(formData.template_id) : null,
            version_id: formData.version_id ? parseInt(formData.version_id) : null,
            min_threshold: formData.min_threshold != null ? parseInt(formData.min_threshold) : null,
            max_threshold: formData.max_threshold != null ? parseInt(formData.max_threshold) : null,
        }

        //This is the case where the user selected an existing template
        if (selectedTemplate !== "new") {
            api.post("template/create_survey", updated_data)
                .then(res => navigate(`/survey/${res.data.survey_id}`, { state: { created: true } }))
                .catch(() => toast.error("Failed to create survey"))
        }
        //In this case we have to ask the user if he wants to create a template
        else {
            let hasError = false

            if (formData.min_threshold === undefined) {
                setError("min_threshold", { message: "Min threshold is required" })
                hasError = true
            }
            if (formData.max_threshold === undefined) {
                setError("max_threshold", { message: "Max threshold is required" })
                hasError = true
            }
            if (!formData.intervals || formData.intervals.length === 0) {
                setError("intervals", { message: "At least one interval is required" })
                hasError = true
            }

            if (hasError) {
                return
            }

            setPendingData(updated_data)
            setOpen(true)
        }
    }

    //Handles the submition if the user didn't select an existing template
    const onSubmitTemplate = (formData, requireName = false) => {
        if (requireName && !formData.name) {
            setError("name", { message: "Template name is required" })
            return
        }
        const updated_data = {
            ...pendingData,
            name: formData.name || null,
        }
        api.post("template/create_survey", updated_data)
            .then(res => { setOpen(false); navigate(`/survey/${res.data.survey_id}`, { state: { created: true } }) })
            .catch(() => toast.error("Failed to create survey"))
    }


    return (
        <DashboardLayout>
            <div className="p-6 space-y-4">
                <h1 className="text-xl font-bold">Create Survey</h1>

                <Card className="border shadow-sm ">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Survey Details</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6 ">

                        {/* Organization & Department */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Organization</Label>
                                <Select onValueChange = { value => {setSelectedOrg(value); setValue("org_id", value)}}>
                                    <SelectTrigger className={`h-9 text-sm ${errors.org_id ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="Select organization" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       {organization.map( org => (
                                        <SelectItem  key = {org.org_id} value = {String(org.org_id)}>
                                            {org.org_name}
                                        </SelectItem>
                                       ))}
                                    </SelectContent>
                                </Select>
                                <ErrorMessage message={errors.org_id?.message} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Department</Label>
                                <Select onValueChange = {value => {setValue("departments_id", value)}} disabled = {!selectedOrg}>
                                    <SelectTrigger className={`h-9 text-sm ${errors.departments_id ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       {departments.map(dep => (
                                        <SelectItem key = {dep.departments_id} value = {String(dep.departments_id)}>
                                        {dep.departments_name}
                                       </SelectItem>)
                                       )}
                                    </SelectContent>
                                </Select>
                                <ErrorMessage message={errors.departments_id?.message} />
                            </div>
                        </div>

                        <Separator />

                        {/* Parameters */}
                        <div className="space-y-4">
                            <h4 className="text-sm font-medium text-muted-foreground">Parameters</h4>

                            {/* Row 1: Document Number | Survey Template */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Document Number</Label>
                                    <Input className={`h-9 text-sm ${errors.survey_code ? "border-red-500 focus-visible:ring-red-500" : ""}`} placeholder="e.g. 234" {...register("survey_code")}/>
                                    <ErrorMessage message={errors.survey_code?.message} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Survey Template</Label>
                                    <Select onValueChange = { value => {setSelectedTemp(value)} }>
                                        <SelectTrigger className="h-9 text-sm">
                                            <SelectValue placeholder="Select template" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="new">Create New</SelectItem>
                                            {templates.map( temp_name=> (

                                                <SelectItem key = {temp_name.template_id} value ={String(temp_name.template_id)}> {temp_name.name}</SelectItem> )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage message={undefined} />
                                </div>
                            </div>

                            {/* Row 2: Date | Criticality Thresholds */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Date</Label>
                                    <Input className={`h-9 text-sm ${errors.review_date ? "border-red-500 focus-visible:ring-red-500" : ""}`} type="date" {...register("review_date")}/>
                                    <ErrorMessage message={errors.review_date?.message} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Criticality Thresholds</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input className={`h-9 text-sm ${errors.min_threshold ? "border-red-500 focus-visible:ring-red-500" : ""}`} placeholder="Min" type="number" {...register("min_threshold", {setValueAs: (v) => v === "" ? undefined : Number(v)} )} readOnly={!!TemplateParameters}/>
                                        <Input className={`h-9 text-sm ${errors.max_threshold ? "border-red-500 focus-visible:ring-red-500" : ""}`} placeholder="Max" type="number" {...register("max_threshold", {setValueAs: (v) => v === "" ? undefined : Number(v)})} readOnly={!!TemplateParameters}/>
                                    </div>
                                    <ErrorMessage message={errors.min_threshold?.message || errors.max_threshold?.message} />
                                </div>
                            </div>

                            {/* Row 3: Version | Time Intervals */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Version</Label>
                                    <Input className={`h-9 text-sm ${errors.version ? "border-red-500 focus-visible:ring-red-500" : ""}`} placeholder="e.g. 1.0" {...register("version")} />
                                    <ErrorMessage message={errors.version?.message} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Time Intervals</Label>
                                    <Controller
                                        name="intervals"
                                        control={control}
                                        render={({ field }) => (
                                            <CreatableSelect
                                                {...field}
                                                isMulti
                                                isDisabled={!!TemplateParameters}
                                                placeholder="Type a value and press Enter"
                                                classNamePrefix="react-select"
                                            />
                                        )}
                                    />
                                    <ErrorMessage message={errors.intervals?.message} />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Actions */}
                        <div className="flex justify-end">
                            <Dialog open={open} onOpenChange={setOpen}>
                                    <Button variant="classic" onClick = {handleSubmit(onSubmit)}>Create</Button>
                                <DialogContent className="sm:max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle>Save as Template?</DialogTitle>
                                        <DialogDescription>
                                            Would you like to save these settings as a reusable template?
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-4 py-2">
                                        <div className="grid gap-2">
                                            <Label>Template Name</Label>
                                            <Input className={`h-9 text-sm ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`} placeholder="Enter template name" {...register("name")}  />
                                            <ErrorMessage message={errors.name?.message} />
                                        </div>
                                    </div>

                                    <DialogFooter className="flex flex-row justify-center gap-2">
                                        <Button variant="classic" onClick={handleSubmit(data => onSubmitTemplate(data, false))}>
                                            Create Without Saving
                                        </Button>
                                        <Button variant="classic" onClick={handleSubmit(data => onSubmitTemplate(data, true))}>
                                            Save as Template & Create
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
