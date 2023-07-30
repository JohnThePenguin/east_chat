import { NextApiRequest, NextApiResponse } from "next";

import { generateNewToken } from "../../../lib/auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            try{
                const { nick } = req.body;
                const token = generateNewToken(nick);

                console.log(token);
                res.status(200).json({ token });
            }
            catch(err){
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
            };

            break;
        default:
            res.status(405).json({ error: "Method not allowed" });
            break;
    };
};