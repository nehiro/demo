// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAuth } from 'firebase-admin/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      revalidated: boolean;
    }
  | string;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    // console.log(req.headers.authorization);
    const token = req.headers.authorization?.split(' ')?.[1] as string;
    // console.log(token, 'token');
    // console.log('走った1');
    await getAuth().verifyIdToken(token);
    // console.log('走った2');
    await res.revalidate(req.query.path as string);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
    // token errorなのかrevalidateのerrorなのか
  }
};

export default handler;
