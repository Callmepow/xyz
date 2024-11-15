"use client";

import JobModal from "@/components/job/job-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteJob } from "@/lib/actions";
import { getDepartments } from "@/lib/data";
import { Department } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";

export type Job = {
  id: number;
  name: string;
  departmentId: number; 
  department: { name: string };
  createdAt: Date;
  updateAt: Date;
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "department.name",
    header: "Department Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [menuOpen, setMenuOpen] = useState(false);
      const [departments, setDepartments] = useState<Department[]>([]);

      useEffect(() => {
        const fetchDepartments = async () => {
          try {
            const departments = await getDepartments();
            setDepartments(departments);
          } catch (error) {
            console.error("Error fetching departments:", error);
          }
        };
        fetchDepartments();
      }, []);

      const handleEdit = () => {
        setMenuOpen(false);
        setIsModalOpen(true);
      };

      const handleDelete = async () => {
        await deleteJob(job.id);
        setMenuOpen(false);
      };

      useEffect(() => {
        if (!isModalOpen) {
          setIsModalOpen(false);
        }
      }, [isModalOpen]);

      return (
        <div className="flex justify-end">
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleEdit}>Edit Job</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete Job</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <JobModal
            job={job}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            departments={departments}
          />
        </div>
      );
    },
  },
];
