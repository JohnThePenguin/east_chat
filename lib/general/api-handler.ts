import { NextApiRequest, NextApiResponse } from 'next';
import authenticate from '../auth/authenticate';
import { NextApiRequestExt } from '../../types/next-auth';

type callbackType = (req: NextApiRequestExt, res: NextApiResponse) => void;

const apiHandler = (req: NextApiRequest, res: NextApiResponse, callback: any) => {
    const auth = authenticate(req, res);

    if(auth.error){
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    callback(req, res);
};

export default apiHandler;