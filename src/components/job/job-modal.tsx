"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createJob, updateJob } from "@/lib/actions";

interface JobModalProps {
  job?: { id: number; name: string; departmentId: number }; // id diubah menjadi number
  departments: { id: number; name: string }[];
  onClose: () => void;
  isOpen: boolean;
}

export default function JobModal({ job, departments, onClose, isOpen }: JobModalProps) {
  const [name, setName] = useState(job?.name || "");
  const [departmentId, setDepartmentId] = useState<number | null>(job?.departmentId || null);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
      const formData = new FormData();
      formData.append("name", name);
      if (departmentId !== null) formData.append("departmentId", String(departmentId));

      try {
          const response = job
              ? await updateJob(job.id, formData)
              : await createJob(formData);

          if (response?.Error) {
              // Tampilkan pesan error yang lebih spesifik
              const errorMessages = Object.values(response.Error).flat().join(", ");
              setError("Error: " + errorMessages);
          } else {
              onClose();
              setName("");
              setDepartmentId(null);
          }
      } catch (error) {
          setError(job ? "Failed to update job." : "Failed to create job.");
      }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{job ? "Edit Job" : "Create New Job"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Job Name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Dropdown Select untuk memilih department */}
          <Select value={departmentId ? String(departmentId) : ""} onValueChange={(value) => setDepartmentId(Number(value))}>
          <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => (
                <SelectItem key={department.id} value={String(department.id)}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleSave} type="submit">
            {job ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
