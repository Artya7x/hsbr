import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/ui/error-message";
import FileUpload01 from "@/components/shared/file-upload-01";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CiEdit } from "react-icons/ci";
import api from "@/services/api";

const schema = z.object({
  org_name: z
    .string()
    .min(1, "Organization name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\d+$/, "Phone must contain only numbers"),
});

export default function NewOrgModal({ onSuccess, org }) {
  const isEdit = !!org;
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const closeRef = useRef(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      org_name: org?.org_name ?? "",
      phone: org?.phone ?? "",
    },
  });

  const onSubmit = (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("org_name", values.org_name);
    formData.append("phone", values.phone);
    if (logoFile) formData.append("logo", logoFile);

    const request = isEdit
      ? api.patch(`/organizations/${org.org_id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
      : api.post("/organizations/", formData, { headers: { "Content-Type": "multipart/form-data" } });

    request
      .then(() => {
        if (!isEdit) { reset(); setLogoFile(null); }
        closeRef.current?.click();
        toast.success(isEdit ? "Organization updated successfully" : "Organization added successfully", { duration: 3000 });
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        console.error(err);
        toast.error(isEdit ? "Failed to update organization" : "Failed to add organization", { duration: 5000 });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isEdit
          ? <Button size="sm" variant="outline"><CiEdit className="text-current" /> Edit</Button>
          : <Button type="button" variant="classic">Add Organization</Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] animate-none">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="py-2">{isEdit ? "Edit Organization" : "Create New Organization"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1">
              <Label htmlFor="org_name">Organization Name <span className="text-destructive">*</span></Label>
              <Input
                id="org_name"
                placeholder="eg. Ex LTD"
                className={errors.org_name ? "border-red-500 focus-visible:ring-red-500" : ""}
                {...register("org_name")}
              />
              <ErrorMessage message={errors.org_name?.message} />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="phone">Phone <span className="text-destructive">*</span></Label>
              <Input
                id="phone"
                placeholder="eg. 99027659"
                className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                {...register("phone")}
              />
              <ErrorMessage message={errors.phone?.message} />
            </div>
            <div className="grid gap-3">
              <Label>Logo</Label>
              <FileUpload01 onFileChange={setLogoFile} existingLogo={org?.logo ? `${import.meta.env.VITE_API_URL}/${org.logo}` : null} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button ref={closeRef} type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="classic" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
