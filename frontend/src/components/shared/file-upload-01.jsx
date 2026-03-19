"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HelpCircle, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";

export default function FileUpload01({ onFileChange }) {
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileProgresses, setFileProgresses] = useState({});

  const handleFileSelect = (files) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles(newFiles);
    if (onFileChange) onFileChange(newFiles[0] || null);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (filename) => {
    setUploadedFiles([]);
    if (onFileChange) onFileChange(null);
    setFileProgresses((prev) => {
      const newProgresses = { ...prev };
      delete newProgresses[filename];
      return newProgresses;
    });
  };

  return (
    <div >
            <div
              className="border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer"
              onClick={handleBoxClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}>
              <div className="mb-2 bg-muted rounded-full p-3">
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Upload a logo image
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                or,{" "}
                <label
                  htmlFor="fileUpload"
                  className="text-primary hover:text-primary/90 font-medium cursor-pointer"
                  onClick={(e) => e.stopPropagation()}>
                  click to browse
                </label>{" "}
                
              </p>
              <input
                type="file"
                id="fileUpload"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files)} />
            </div>
          

          <div
            className={cn("pb-5 space-y-3", uploadedFiles.length > 0 ? "mt-4" : "")}>
            {uploadedFiles.map((file, index) => {
              const imageUrl = URL.createObjectURL(file);

              return (
                <div
                  className="border border-border rounded-lg p-2 flex flex-col"
                  key={file.name + index}
                  onLoad={() => {
                    return () => URL.revokeObjectURL(imageUrl);
                  }}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-18 h-14 bg-muted rounded-sm flex items-center justify-center self-start row-span-2 overflow-hidden">
                      <img src={imageUrl} alt={file.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 pr-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground truncate max-w-[200px]">
                            {file.name}
                          </span>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {Math.round(file.size / 1024)} KB
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 bg-transparent! hover:text-red-500"
                          onClick={() => removeFile(file.name)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
           
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

         
       
    </div>
  );
}
