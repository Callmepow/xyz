"use client";

import BranchModal from "@/components/branch/branch-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteBranch } from "@/lib/actions";
import { getAreas } from "@/lib/data";
import { Area } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";

export type Branch = {
  id: number;
  name: string;
  areaId: number; 
  area: { name: string };
  createdAt: Date;
  updateAt: Date;
};

export const columns: ColumnDef<Branch>[] = [
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
    accessorKey: "area.name",
    header: "Area Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const branch = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [menuOpen, setMenuOpen] = useState(false);
      const [areas, setAreas] = useState<Area[]>([]);

      useEffect(() => {
        const fetchAreas = async () => {
          try {
            const areas = await getAreas();
            setAreas(areas);
          } catch (error) {
            console.error("Error fetching areas:", error);
          }
        };
        fetchAreas();
      }, []);

      const handleEdit = () => {
        setMenuOpen(false);
        setIsModalOpen(true);
      };

      const handleDelete = async () => {
        await deleteBranch(branch.id);
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
              <DropdownMenuItem onClick={handleEdit}>Edit Branch</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete Branch</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <BranchModal
            branch={branch}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            areas={areas}
          />
        </div>
      );
    },
  },
];
