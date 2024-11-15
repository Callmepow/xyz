"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Area } from "@prisma/client";
import { getAreas } from "@/lib/data";
import BranchModal from "@/components/branch/branch-modal";

export function CreateBranch() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      const areas = await getAreas();
      setAreas(areas);
    };
    fetchAreas();
  }, []);

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="ml-auto h-8 flex sm:h-6 md:h-8 lg:h-8" 
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="flex h-4 w-4"/>
        <span className="hidden sm:inline">Create Branch</span>
      </Button>
      <BranchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        areas={areas}
      />
    </>
  );
}
