import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const branches = await prisma.branch.findMany({
      include: {
        area: true, 
      },
    });
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch branches' });
  }
}
