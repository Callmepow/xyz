import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { Department, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getDepartments } from "@/lib/data";
import { CreateDepartment } from "@/components/department/create-department";

export default async function DepartmentsPage() {
  const data = await getDepartments();

  return (
    <ContentLayout title="Departments">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Departments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* <PlaceholderContent /> */}
      
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <CardTitle className="text-lg">
            Departments Data
          </CardTitle>
          <div className="flex justify-end mr-8">
            <CreateDepartment />
          </div>
        <div className="container mx-auto py-6">
          <DataTable columns={columns} data={data} />
          {/* <DataTablePagination table={table} /> */}

        </div>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}