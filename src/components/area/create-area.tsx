"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AreaModal } from "@/components/area/area-modal";
import { Plus } from "lucide-react";

export function CreateArea() {
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
      <span className="hidden sm:inline">Create Area</span>
      </Button>
      <AreaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
