import { z } from "zod";

//////////////////////////////////////////////////// SCHEMA /////////////////////////////////////////////////////

// Area Schema
export const AreaSchema = z.object({
    name: z.string().min(1, { message: "Name is required" })
});

// Branch Schema
export const BranchSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    areaId: z.coerce.number().min(1, { message: "Area ID is required" }),
});

// Department Schema
export const DepartmentSchema = z.object({
    name: z.string().min(1, { message: "Name is required" })
});

// Job Schema
export const JobSchema = z.object({
    name: z.string().min(1, { message: "Name is required"}),
    departmentId: z.coerce.number().min(1, { message: "Department ID is required" }),
});

// User Schema
export const UserSchema = z.object({
    id: z.string().min(1, { message: "User ID is required" }),
    username: z.string().min(1, { message: "Username must be at least 1 character" }).optional(),
    name: z.string().min(1, { message: "Name is required" }),
    nip: z.string().min(1, { message: "NIP is required" }).max(10, { message: "NIP must be less than 10 characters" }),
    email: z.string().email().optional(),
    phone: z.coerce.number().int().positive().optional(),
    address: z.string().optional(),
    photo: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    areaId: z.coerce.number().min(1, { message: "Area ID is required" }),
    branchId: z.coerce.number().min(1, { message: "Branch ID is required" }),
    departmentId: z.coerce.number().min(1, { message: "Department ID is required" }),
    jobId: z.coerce.number().min(1, { message: "Job ID is required" }),
    role: z.enum(["ADMIN", "USER"]).default("USER"),
    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});  

//////////////////////////////////////////////////// SCHEMA /////////////////////////////////////////////////////
