"use server";

import { prisma } from "@/lib/prisma";
import { AreaSchema, BranchSchema, DepartmentSchema, JobSchema, UserSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


///////////////////////////////////////////////////// AREA /////////////////////////////////////////////////////
// Create Area
export const createArea = async (formData: FormData) => {
    const validatedFields = AreaSchema.safeParse(Object.fromEntries(formData.entries()));

    if(!validatedFields.success){
        return{
            Error: validatedFields.error.flatten().fieldErrors
        }
    }    

    try {
        await prisma.area.create({
            data:{
                name: validatedFields.data.name,
            }
        })
    } catch (error) {
        return{message:"Failed to create area!"}
    }   

    revalidatePath("/areas");
    redirect("/areas");
}

// Update Area
export const updateArea = async (id: number, formData: FormData) => {
    const validatedFields = AreaSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors
        };
    }

    try {
        await prisma.area.update({
            where: { id },
            data: {
                name: validatedFields.data.name,
                updateAt: new Date()
            }
        });
    } catch (error) {
        return { message: "Failed to update area!" };
    }

    revalidatePath("/areas");
    redirect("/areas");
};

// Delete Area
export const deleteArea = async (id: number) => {
    try {
        await prisma.area.delete({
            where: { id },
        });
    } catch (error) {
        return { message: "Failed to delete area!" };
    }

    revalidatePath("/areas");
    redirect("/areas");
};
///////////////////////////////////////////////////// AREA /////////////////////////////////////////////////////

//////////////////////////////////////////////////// BRANCH ////////////////////////////////////////////////////
// Create Branch
export const createBranch = async (formData: FormData) => {
    const validatedFields = BranchSchema.safeParse({
        name: formData.get("name"),
        areaId: Number(formData.get("areaId")), // Convert to number here
    });

    if (!validatedFields.success) {
      return {
        Error: validatedFields.error.flatten().fieldErrors,
      };
    }
  
    try {
      await prisma.branch.create({
        data: {
          name: validatedFields.data.name,
          areaId: validatedFields.data.areaId,
        },
      });
    } catch (error) {
      return { message: "Failed to create branch!" };
    }
  
    revalidatePath("/branches");
    redirect("/branches");
};

// Update Branch
export const updateBranch = async (id: number, formData: FormData) => {
    const validatedFields = BranchSchema.safeParse({
        name: formData.get("name"),
        areaId: Number(formData.get("areaId")), // Convert to number here
    });
      
    if (!validatedFields.success) {
      return {
        Error: validatedFields.error.flatten().fieldErrors,
      };
    }
  
    try {
      await prisma.branch.update({
        where: { id },
        data: {
          name: validatedFields.data.name,
          areaId: validatedFields.data.areaId,
          updateAt: new Date(),
        },
      });
    } catch (error) {
      return { message: "Failed to update branch!" };
    }
  
    revalidatePath("/branches");
    redirect("/branches");
};
  
// Delete Branch
export const deleteBranch = async (id: number) => {
    try {
      await prisma.branch.delete({
        where: { id },
      });
    } catch (error) {
      return { message: "Failed to delete branch!" };
    }
  
    revalidatePath("/branches");
};
//////////////////////////////////////////////////// BRANCH ////////////////////////////////////////////////////

////////////////////////////////////////////////// DEPARTMENT //////////////////////////////////////////////////
// Create Department
export const createDepartment = async (formData: FormData) => {
  const validatedFields = DepartmentSchema.safeParse(Object.fromEntries(formData.entries()));

  if(!validatedFields.success){
      return{
          Error: validatedFields.error.flatten().fieldErrors
      }
  }    

  try {
      await prisma.department.create({
          data:{
              name: validatedFields.data.name,
          }
      })
  } catch (error) {
      return{message:"Failed to create department!"}
  }   

  revalidatePath("/departments");
  redirect("/departments");
}

// Update Department
export const updateDepartment = async (id: number, formData: FormData) => {
  const validatedFields = DepartmentSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
      return {
          Error: validatedFields.error.flatten().fieldErrors
      };
  }

  try {
      await prisma.department.update({
          where: { id },
          data: {
              name: validatedFields.data.name,
              updateAt: new Date()
          }
      });
  } catch (error) {
      return { message: "Failed to update department!" };
  }

  revalidatePath("/departments");
  redirect("/departments");
};

// Delete Department
export const deleteDepartment = async (id: number) => {
  try {
      await prisma.department.delete({
          where: { id },
      });
  } catch (error) {
      return { message: "Failed to delete department!" };
  }

  revalidatePath("/departments");
  redirect("/departments");
};
////////////////////////////////////////////////// DEPARTMENT //////////////////////////////////////////////////

////////////////////////////////////////////////// JOB //////////////////////////////////////////////////
// Create Job
export const createJob  = async (formData: FormData) => {
    const validatedFields = JobSchema.safeParse({
      name: formData.get("name"),
      departmentId: Number(formData.get("departmentId")),
    });

    if(!validatedFields.success) {
      return {
        Error: validatedFields.error.flatten().fieldErrors,
      };
    }

    try {
      await prisma.job.create({
        data: {
          name: validatedFields.data.name,
          departmentId: validatedFields.data.departmentId,
        },
      });
    } catch (error) {
      return { message: "Failed to create job!" };
    }

    revalidatePath("/jobs");
    redirect("/jobs");
};

// Update Job
export const updateJob = async (id: number, formData: FormData) => {
  const validatedFields = JobSchema.safeParse({
      name: formData.get("name"),
      departmentId: Number(formData.get("departmentId")), // Convert to number here
  });
    
  if (!validatedFields.success) {
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.job.update({
      where: { id },
      data: {
        name: validatedFields.data.name,
        departmentId: validatedFields.data.departmentId,
        updateAt: new Date(),
      },
    });
  } catch (error) {
    return { message: "Failed to update branch!" };
  }

  revalidatePath("/jobs");
  redirect("/jobs");
};

// Delete Job
export const deleteJob = async (id: number) => {
  try {
    await prisma.job.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete job!" };
  }

  revalidatePath("/jobs");
};
////////////////////////////////////////////////// JOB //////////////////////////////////////////////////

