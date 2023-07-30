import { NextApiRequest, NextApiResponse } from "next";
import apiHandler from "../../../lib/general/api-handler";
import { NextApiRequestExt } from "../../../types/next-auth";

const handler = (req: NextApiRequestExt, res: NextApiResponse) => {
    res.status(200).json({ user: req.user });
};

export default (req: NextApiRequest, res: NextApiResponse) => apiHandler(req, res, handler);
