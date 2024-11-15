import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const departments = await prisma.department.findMany();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
}
