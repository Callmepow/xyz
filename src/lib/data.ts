import { prisma } from"@/lib/prisma"

export const getAreas = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/areas`);
  if (!response.ok) {
    throw new Error("Failed to fetch areas");
  }
  return response.json();
};

export const getBranches = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/branches`);
  if (!response.ok) {
    throw new Error("Failed to fetch branches");
  }
  return response.json();
};

export const getDepartments = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/departments`);
  if (!response.ok) {
    throw new Error("Failed to fetch departments");
  }
  return response.json();
};

export const getJobs = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
}

export const getUsers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}