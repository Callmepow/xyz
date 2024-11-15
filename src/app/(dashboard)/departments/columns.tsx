"use client";

import { DepartmentModal } from "@/components/department/department-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteDepartment } from "@/lib/actions";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";

export type Department = {
  id: number;
  name: string;
  createdAt: Date;
  updateAt: Date;
};

export const columns: ColumnDef<Department>[] = [
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
    id: "actions",
    cell: ({ row }) => {
      const department = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [menuOpen, setMenuOpen] = useState(false);

      const handleEdit = () => {
        setMenuOpen(false); // Tutup menu dropdown sebelum modal dibuka
        setIsModalOpen(true);
      };

      const handleDelete = async () => {
        await deleteDepartment(department.id);
        setMenuOpen(false); // Tutup menu setelah delete
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
              <DropdownMenuItem onClick={handleEdit}>Edit Department</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete Department</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Modal Edit */}
          <DepartmentModal
            department={department}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      );
    },
  },
];
