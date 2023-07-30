import { NextApiResponse } from "next";
import { verifyToken } from "./jwt";
import { NextApiRequestExt } from "../../types/next-auth";

type responseType = {
    user?: {
        id: number;
        name: string;
        data: any;
    };
    error?: boolean
};

const authenticate = (req: NextApiRequestExt, res: NextApiResponse): responseType => {

    try{
        if(!req.headers.authorization){
            return { error: true};
        };

        const bearerToken = req.headers.authorization.split(' ')[1];
        
        if(!bearerToken){
            return { error: true};
        }
        
        const data = verifyToken(bearerToken);

        console.log(bearerToken);
        console.log(data);
    
    
        const user = {id: 1, name: 'John Doe', data: data}; // get user from database
        req.user = user;
        return { user: user };
    }
    catch(err){
        console.log(err);
        return { error: true};
    }
};

export default authenticate;