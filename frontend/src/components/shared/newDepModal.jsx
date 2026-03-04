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

export default function NewDepModal() {

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="mr-1 cursor-pointer">Add Department</Button>
        </DialogTrigger>
        <DialogContent  className="sm:max-w-[450px] animate-none">
          <DialogHeader>
            <DialogTitle className="py-2">Create New Department</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="department name">Department Name <span className="text-destructive">*</span> </Label>
              <Input id="department name" name="department name" placeholder="e.g., Marketing" />
            </div>
            
            
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline cursor-pointer">Cancel</Button>
            </DialogClose>
            <Button type="submit cursor-pointer">Save changes</Button>
          </DialogFooter>

        </DialogContent>
      </form>
    </Dialog>
  );

}
