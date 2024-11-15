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
import { createArea, updateArea } from "@/lib/actions";
import { Area } from "@prisma/client";

export function AreaModal({
  area,
  isOpen,
  onClose,
}: {
  area?: Area;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState(area ? area.name : "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setName(area ? area.name : "");
    }
  }, [isOpen, area]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", name);

    try {
      const response = area
        ? await updateArea(area.id, formData)
        : await createArea(formData);

      if (response?.Error) {
        setError("Error: " + response.Error.name);
      } else {
        onClose();
        setName("");
      }
    } catch (error) {
      setError(area ? "Failed to update area." : "Failed to create area.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{area ? "Edit Area" : "Create New Area"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Area Name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleSave} type="submit">
            {area ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
