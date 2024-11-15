import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const areas = await prisma.area.findMany();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch areas' });
  }
}
