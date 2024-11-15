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

import { Area, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getAreas } from "@/lib/data";
import { AreaModal } from "@/components/area/area-modal";
import { CreateArea } from "@/components/area/create-area";

export default async function AreasPage() {
  const data = await getAreas();

  return (
    <ContentLayout title="Areas">
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
            <BreadcrumbPage>Areas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* <PlaceholderContent /> */}
      
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <CardTitle className="text-lg">
            Areas Data
          </CardTitle>
          <div className="flex justify-end mr-8">
            <CreateArea />
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