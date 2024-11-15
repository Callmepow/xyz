import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getBranches } from "@/lib/data";
import { CreateBranch } from "@/components/branch/create-branch";

export default async function BranchesPage() {
  const data = await getBranches();

  return (
    <ContentLayout title="Branches">
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
            <BreadcrumbPage>Branches</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6">
          <CardTitle className="text-lg">
            Branches Data
          </CardTitle>
          <div className="flex justify-end mr-8">
            <CreateBranch />
          </div>
          <div className="container mx-auto py-6">
            <DataTable columns={columns} data={data} />
          </div>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
