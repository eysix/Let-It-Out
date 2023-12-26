import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]"
import prisma from '../../../prisma/client'

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
    console.log(title)

    //get user
    const prismaUser = await prisma.user.findUnique({
      where: {email: session?.user?.email },
    })

    // check title
    if (title.length > 300) 
      return res.status(403).json({ message: "Please keep it a little shorter"})
    // res = response, status 400 = access forbidden, message = ...

    if (!title.length){
      console.log("rah")
      return res.status(403).json({ message: "Please do not leave empty, let it out"})
    }
  
    //create post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      })
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({err: 'Error has occurred while making a post'})
    }
  } 


}
