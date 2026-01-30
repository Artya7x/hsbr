import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUpload01 from "@/components/shared/file-upload-01";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function NewOrgModal() {

  return (

    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button type = "button" variant="classic" >Add Organization </Button>
        </DialogTrigger>
        <DialogContent  className="sm:max-w-[450px] animate-none">
          <DialogHeader>
            <DialogTitle className="py-2">Create New Organization</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="organization name">Organization Name <span className="text-destructive">*</span> </Label>
              <Input id="organization name" name="organization name" placeholder="eg. Ex LTD" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone <span className="text-destructive">*</span></Label>
              <Input id="phone" name="phone" placeholder="eg. 99027659" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="logo">Logo <span className="text-destructive">*</span></Label>
              <FileUpload01></FileUpload01>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button variant = "classic" type="submit cursor-pointer">Save changes</Button>
          </DialogFooter>

        </DialogContent>
      </form>
    </Dialog>

  );

}
