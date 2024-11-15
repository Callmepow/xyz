"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createDepartment, updateDepartment } from "@/lib/actions";
import { Department } from "@prisma/client";

export function DepartmentModal({
  department,
  isOpen,
  onClose,
}: {
  department?: Department;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState(department ? department.name : "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setName(department ? department.name : "");
    }
  }, [isOpen, department]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", name);

    try {
      const response = department
      ? await updateDepartment(department.id, formData)
      : await createDepartment(formData);

      if (response?.Error) {
        setError("Error: " + response.Error.name);
      } else {
        onClose();
        setName("");
      }
    } catch (error) {
      setError(department ? "Failed to update department." : "Failed to create department.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{department ? "Edit Department" : "Create New Department"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Department Name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleSave} type="submit">
            {department ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
