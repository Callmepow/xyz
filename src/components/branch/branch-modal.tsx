"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBranch, updateBranch } from "@/lib/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BranchModalProps {
  branch?: { id: number; name: string; areaId: number }; // id diubah menjadi number
  areas: { id: number; name: string }[];
  onClose: () => void;
  isOpen: boolean;
}

export default function BranchModal({ branch, areas, onClose, isOpen }: BranchModalProps) {
  const [name, setName] = useState(branch?.name || "");
  const [areaId, setAreaId] = useState<number | null>(branch?.areaId || null);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
      const formData = new FormData();
      formData.append("name", name);
      if (areaId !== null) formData.append("areaId", String(areaId));

      try {
          const response = branch
              ? await updateBranch(branch.id, formData)
              : await createBranch(formData);

          if (response?.Error) {
              // Tampilkan pesan error yang lebih spesifik
              const errorMessages = Object.values(response.Error).flat().join(", ");
              setError("Error: " + errorMessages);
          } else {
              onClose();
              setName("");
              setAreaId(null);
          }
      } catch (error) {
          setError(branch ? "Failed to update branch." : "Failed to create branch.");
      }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{branch ? "Edit Branch" : "Create New Branch"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Branch Name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Dropdown Select untuk memilih area */}
          <Select value={areaId ? String(areaId) : ""} onValueChange={(value) => setAreaId(Number(value))}>
          <SelectTrigger>
              <SelectValue placeholder="Select Area" />
            </SelectTrigger>
            <SelectContent>
              {areas.map((area) => (
                <SelectItem key={area.id} value={String(area.id)}>
                  {area.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleSave} type="submit">
            {branch ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
