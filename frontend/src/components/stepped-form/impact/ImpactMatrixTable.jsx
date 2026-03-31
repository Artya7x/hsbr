import { useFormContext } from "react-hook-form"
import { useMultiStepForm } from "@/hooks/use-stepped-form"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImpactMatrixTableView from "./ImpactMatrixTableView"

export default function ImpactMatrixTable() {
  const { watch, setValue, formState: { errors } } = useFormContext()
  const { intervals, surveyParams } = useMultiStepForm()
  const activities = watch("activities") || []

  if (!activities.length) {
    return (
      <p className="text-sm italic text-muted-foreground">
        No activities defined yet.
      </p>
    )
  }

  return (
    <Card className="mt-10 border border-border shadow-sm">
      <Tabs defaultValue="Impact Severity">
        <CardHeader className="flex flex-col gap-4 pb-0">
          <CardTitle className="text-base font-medium">
            Impact Severity, Recovery Objectives, and Criticality
          </CardTitle>
          <TabsList className="w-fit bg-background">
            <TabsTrigger value="Impact Severity" className="data-[state=active]:bg-[var(--sidebar)] data-[state=active]:text-white">
              Impact Severity
            </TabsTrigger>
            <TabsTrigger value="Recovery and Criticality" className="data-[state=active]:bg-[var(--sidebar)] data-[state=active]:text-white">
              Recovery and Criticality
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="pt-0">
          <TabsContent value="Impact Severity">
            <ImpactMatrixTableView
              mode="Impact Severity"
              activities={activities}
              intervals={intervals}
              surveyParams={surveyParams}
              errors={errors}
              setValue={setValue}
            />
          </TabsContent>

          <TabsContent value="Recovery and Criticality">
            <ImpactMatrixTableView
              mode="Recovery and Criticality"
              activities={activities}
              intervals={intervals}
              surveyParams={surveyParams}
              errors={errors}
              setValue={setValue}
            />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
