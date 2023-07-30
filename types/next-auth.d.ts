import { NextApiRequest } from "next";

export interface NextApiRequestExt extends NextApiRequest {
    user?: {
        id: number;
        name: string;
        data: any;
    };
};