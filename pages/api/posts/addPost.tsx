import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]"

// type Data = {
//   name: string
// }

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const session = await getServerSession(req, res, authOptions)
    if (!session)
      return res.status(401).json({ message: "Please sign in to post"})

    //console.log(req.body)
    const title: string = req.body.title

    // check title
    if (title.length > 300) 
      return res.status(403).json({ message: "Please keep it a little shorter"})
    // res = response, status 400 = access forbidden, message = ...

    if (!title.length)
      console.log("rah")
      return res.status(403).json({ message: "Please do not leave empty, let it out"})
  } 
}
