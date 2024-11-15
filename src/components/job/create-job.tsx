"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Department } from "@prisma/client";
import { getDepartments } from "@/lib/data";
import JobModal from "@/components/job/job-modal";

export function CreateJob() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await getDepartments();
      setDepartments(departments);
    };
    fetchDepartments();
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
        <span className="hidden sm:inline">Create Job</span>
      </Button>
      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        departments={departments}
      />
    </>
  );
}
