"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DepartmentModal } from "@/components/department/department-modal";

export function CreateDepartment() {
  // State untuk mengontrol modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
      variant="outline" 
      size="sm" 
      className="ml-auto h-8 flex sm:h-6 md:h-8 lg:h-8" 
      onClick={() => setIsModalOpen(true)}
      >
      <Plus className="flex h-4 w-4"/>
      <span className="hidden sm:inline">Create Department</span>
      </Button>
      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
