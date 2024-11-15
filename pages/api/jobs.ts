import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        department: true, 
      },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}
