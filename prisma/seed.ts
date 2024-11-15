import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Insert multiple areas (sorted alphabetically by name)
  await prisma.area.createMany({
    data: [
      { name: "AIPO" },
      { name: "CAMM" },
      { name: "Jakarta" },
      { name: "Lampung" },
      { name: "Sumsel Babel" },
    ],
  });

  // Insert multiple branches (sorted by areaId and then alphabetically by name)
  await prisma.branch.createMany({
    data: [
      // areaId: 1 (AIPO)
      { name: "AIPO Plaju", areaId: 1 },
      { name: "AIPO Veteran", areaId: 1 },
      // areaId: 2 (CAMM)
      { name: "CAMM Palembang", areaId: 2 },
      // areaId: 3 (Jakarta)
      { name: "Depok", areaId: 3 },
      { name: "Jembatan Lima", areaId: 3 },
      { name: "Kalimalang", areaId: 3 },
      { name: "Kebon Jeruk", areaId: 3 },
      { name: "Matraman", areaId: 3 },
      { name: "Pusat", areaId: 3 },
      // areaId: 4 (Lampung)
      { name: "Bandarjaya", areaId: 4 },
      { name: "Baradatu", areaId: 4 },
      { name: "Kotabumi", areaId: 4 },
      { name: "Mesuji", areaId: 4 },
      { name: "Metro", areaId: 4 },
      { name: "Tenggiri", areaId: 4 },
      { name: "Way Lunik", areaId: 4 },
      // areaId: 5 (Sumsel Babel)
      { name: "Baturaja", areaId: 5 },
      { name: "Belitung", areaId: 5 },
      { name: "Betung", areaId: 5 },
      { name: "Bengkulu Km6", areaId: 5 },
      { name: "Bengkulu Km9", areaId: 5 },
      { name: "Lahat", areaId: 5 },
      { name: "Lubuk Linggau", areaId: 5 },
      { name: "Palembang", areaId: 5 },
      { name: "Pangkalpinang", areaId: 5 },
      { name: "Prabumulih", areaId: 5 },
      { name: "Sekayu", areaId: 5 },
      { name: "Soekarno Hatta", areaId: 5 },
      { name: "Sungaililin", areaId: 5 },
      { name: "Tanjug Api - Api", areaId: 5 },
    ],
  });

  // Insert multiple departments (sorted alphabetically by name)
  await prisma.department.createMany({
    data: [
      { name: "Pusat" },
      { name: "Sales" },
      { name: "Service" },
      { name: "Sparepart" },
    ],
  });

  // Insert multiple jobs (sorted by departmentId and then alphabetically by name)
  await prisma.job.createMany({
    data: [
      // departmentId: 1 (Pusat)
      { name: "ACCOUNTING Head", departmentId: 1 },
      { name: "ACCOUNTING Staff", departmentId: 1 },
      { name: "EDP Head", departmentId: 1 },
      { name: "EDP Staff Administration", departmentId: 1 },
      { name: "EDP Staff Digital Marketing", departmentId: 1 },
      { name: "EDP Staff Maintenance", departmentId: 1 },
      { name: "EDP Staff Programmer", departmentId: 1 },
      { name: "FINANCE Head", departmentId: 1 },
      { name: "FINANCE Staff", departmentId: 1 },
      { name: "HRD Head", departmentId: 1 },
      { name: "HRD Personalia", departmentId: 1 },
      { name: "HRD Staff Personalia", departmentId: 1 },
      { name: "HRD Staff Planner", departmentId: 1 },
      { name: "HRD Staff Recruitment", departmentId: 1 },
      { name: "HRD Staff Trainer", departmentId: 1 },
      { name: "PRIO Head", departmentId: 1 },
      { name: "PRIO Staff", departmentId: 1 },
      { name: "VAD Head", departmentId: 1 },
      { name: "VAD Staff", departmentId: 1 },
      // departmentId: 2 (Sales)
      { name: "Sales Administration", departmentId: 2 },
      { name: "Sales Consultant", departmentId: 2 },
      { name: "Sales Counter", departmentId: 2 },
      { name: "Sales Manager", departmentId: 2 },
      { name: "Sales Operation Head", departmentId: 2 },
      { name: "Sales Supervisor", departmentId: 2 },
      // departmentId: 3 (Service)
      { name: "Service Administration", departmentId: 3 },
      { name: "Service Consultant", departmentId: 3 },
      { name: "Service Leader Mechanic", departmentId: 3 },
      { name: "Service Manager", departmentId: 3 },
      { name: "Service Mechanic", departmentId: 3 },
      { name: "Service Quality Control", departmentId: 3 },
      { name: "Service Supervisor", departmentId: 3 },
      // departmentId: 4 (Sparepart)
      { name: "Sparepart Administration", departmentId: 4 },
      { name: "Sparepart Consultant", departmentId: 4 },
      { name: "Sparepart Leader", departmentId: 4 },
      { name: "Sparepart Manager", departmentId: 4 },
    ],
  });

  // Insert Admin & User
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       id: "administrator", 
  //       username: "admin_user",
  //       name: "Admin User",
  //       nip: "1234567890",
  //       email: "admin@example.com",
  //       phone: 1234567890,
  //       address: "Admin Address",
  //       photo: "admin-photo-url",
  //       password: "hashed-password", 
  //       areaId: 1,
  //       branchId: 1, 
  //       departmentId: 1, 
  //       jobId: 1,
  //       role: "ADMIN",
  //       status: "ACTIVE",
  //     },
  //     {
  //       username: "regular_user",
  //       name: "Regular User",
  //       nip: "0987654321",
  //       email: "user@example.com",
  //       phone: 9876543210,
  //       address: "User Address",
  //       password: "hashed-password", 
  //       areaId: 2, 
  //       branchId: 2, 
  //       departmentId: 2, 
  //       jobId: 2, 
  //       role: "USER",
  //       status: "INACTIVE", 
  //     },
  //   ],
  // });

}

main()
  .then(() => console.log("Data seeded successfully"))
  .catch((error) => {
    console.error("Error seeding data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
