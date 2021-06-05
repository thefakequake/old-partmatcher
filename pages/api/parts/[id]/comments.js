import { connectToDatabase } from "../../../../utils/mongodb.js"
import { getSession } from "next-auth/client"

export default async (req, res) => {
  const { db } = await connectToDatabase(0)
  if (req.method == "POST") {
    const session = await getSession({ req })
    const body = req.body

    if (session) {
      await db.collection("Parts").updateOne(
        {
          part_id: req.query.id
        },
        {
          $push: {
            comments: {
              author: session.user.name,
              createdAt: new Date(Date.now()),
              body: body.body
            }
          }
        }
      )
      res.status(200)
      res.end()
    }
    if (!session) {
      res.status(401).end()
      return
    }
  } else if (req.method == "GET") {
    if (req.query.page == undefined) {
      req.query.page = 1
    }
    const minimumBound = 20 * (req.query.page - 1)
    const maximumBound = req.query.page * 20 - 1

    const comments = (
      await db.collection("Parts").findOne(
        {
          part_id: req.query.id
        },
        {
          projection: {
            comments: { $slice: [minimumBound, maximumBound] }
          }
        }
      )
    ).comments

    res.status(200).json(comments)
  } else {
    res.status(404)
  }
}
