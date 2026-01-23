import React, { useMemo } from "react"
import { useFormContext, useFieldArray, Controller } from "react-hook-form"
import CreatableSelect from "react-select/creatable"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Trash } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"



export default function ExternalDependenciesTable() {
  const { control, register, watch, setValue } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "externalDependencies",
  })

  const activities = watch("activities") || []
  const allDeps = watch("externalDependencies") || []

  function addRow() {
    append({
      activityIndex: null,
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      resources: [],
    })
  }


  function updateCompanyFieldGlobally(companyName, field, value) {
    const deps = watch("externalDependencies") || []

    deps.forEach((dep, i) => {
      if (dep.companyName === companyName) {
        setValue(
          `externalDependencies.${i}.${field}`,
          value,
          { shouldDirty: true }
        )
      }
    })
  }

 
  const companyDirectory = useMemo(() => {
    const map = new Map()

    for (const dep of allDeps) {
      if (!dep.companyName) continue
      if (!map.has(dep.companyName)) {
        map.set(dep.companyName, {
          email: dep.companyEmail || "",
          phone: dep.companyPhone || "",
        })
      }
    }

    return map
  }, [allDeps])

  const companyOptions = useMemo(
    () =>
      Array.from(companyDirectory.keys()).map((name) => ({
        label: name,
        value: name,
      })),
    [companyDirectory]
  )

  /**
   * Resource suggestions (UI-only)
   */
  const resourceOptions = useMemo(() => {
    const set = new Set()

    for (const dep of allDeps) {
      for (const r of dep.resources || []) {
        if (r && r.trim()) set.add(r.trim())
      }
    }

    return Array.from(set).map((r) => ({
      label: r,
      value: r,
    }))
  }, [allDeps])

  return (
    <Card className="border border-slate-200 shadow-sm mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          External Dependencies
        </CardTitle>

        <Button type="button" variant="classic" onClick={addRow}>
          Add external organization
        </Button>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b bg-[oklch(97.541%_0.01161_264.582)] ">
              <tr>
                <th className=" px-4 py-3 text-left  font-medium">Activity</th>
                <th className=" px-4 py-3 text-left font-medium">Company</th>
                <th className="px-4 py-3 text-left  font-medium">Email</th>
                <th className="px-4 py-3 text-left  font-medium">Phone</th>
                <th className=" px-4 py-3 text-left font-medium">Resources</th>
                <th className="px-4 py-3 text-left font-medium"></th>
              </tr>
            </thead>

            <tbody>
              {fields.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">
                    No external organizations added
                  </td>
                </tr>
              )}

              {fields.map((field, idx) => (
                <tr key={field.id} className="border-b align-top">
                  {/* Activity */}
                  <td className="p-3">
                    <select
                      className="h-10 w-full rounded-md border border-border bg-white px-2 text-sm"
                      {...register(
                        `externalDependencies.${idx}.activityIndex`,
                        {
                          setValueAs: (v) =>
                            v === "" ? null : Number(v),
                        }
                      )}
                    >
                      <option value="">Select activity…</option>
                      {activities.map((a, i) => (
                        <option key={i} value={i}>
                          {a.name || `Activity ${i + 1}`}
                        </option>
                      ))}
                    </select>
                  </td>

                  
                  <td className="p-3">
                    <Controller
                      control={control}
                      name={`externalDependencies.${idx}.companyName`}
                      render={({ field }) => (
                        <CreatableSelect
                          options={companyOptions}
                          value={
                            field.value
                              ? { label: field.value, value: field.value }
                              : null
                          }
                          onChange={(opt) => {
                            const name = opt?.value || ""
                            field.onChange(name)

                            const known = companyDirectory.get(name)
                            if (known) {
                              updateCompanyFieldGlobally(
                                name,
                                "companyEmail",
                                known.email
                              )
                              updateCompanyFieldGlobally(
                                name,
                                "companyPhone",
                                known.phone
                              )
                            }
                          }}
                          onCreateOption={(input) => {
                            field.onChange(input)
                          }}
                          menuPortalTarget={document.body}
                          menuPosition="fixed"
                          placeholder="Type or select company..."
                        />
                      )}
                    />
                  </td>

                  {/* Email */}
                  <td className="p-3">
                    <Input
                      placeholder="company@email.com"
                      {...register(
                        `externalDependencies.${idx}.companyEmail`,
                        {
                          onChange: (e) => {
                            const name = watch(
                              `externalDependencies.${idx}.companyName`
                            )
                            if (name) {
                              updateCompanyFieldGlobally(
                                name,
                                "companyEmail",
                                e.target.value
                              )
                            }
                          },
                        }
                      )}
                    />
                  </td>

                  {/* Phone */}
                  <td className="p-3">
                    <Input
                      placeholder="e.g., +357 99 123456"
                      {...register(
                        `externalDependencies.${idx}.companyPhone`,
                        {
                          onChange: (e) => {
                            const name = watch(
                              `externalDependencies.${idx}.companyName`
                            )
                            if (name) {
                              updateCompanyFieldGlobally(
                                name,
                                "companyPhone",
                                e.target.value
                              )
                            }
                          },
                        }
                      )}
                    />
                  </td>

                  {/* Resources */}
                  <td className="p-3">
                    <Controller
                      control={control}
                      name={`externalDependencies.${idx}.resources`}
                      render={({ field }) => (
                        <CreatableSelect
                          isMulti
                          options={resourceOptions}
                          value={(field.value || []).map((r) => ({
                            label: r,
                            value: r,
                          }))}
                          onChange={(sel) =>
                            field.onChange(
                              sel ? sel.map((o) => o.value) : []
                            )
                          }
                          menuPortalTarget={document.body}
                          menuPosition="fixed"
                          placeholder="Type or select resources..."
                        />
                      )}
                    />
                  </td>

                  {/* Delete */}
                  <td className="p-3 pt-5">
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="p-2"
                    >
                      <Trash className="h-6 w-6 text-red-700 hover:text-red-900" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
