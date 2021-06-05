import { connectToDatabase } from "../../../../utils/mongodb"
import clamp from "../../../../utils/clamp"

export default async (
  { query: { query = null, limit = 10, type = null } },
  res
) => {
  if (query === null) {
    res.status(400).json({ error: "Please provide a query parameter" })
    return
  }

  if (limit !== 10) {
    limit = parseInt(limit)
    if (limit === NaN) {
      res.status(400).json({ error: "Limit parameter couldn't be parsed!" })
      return
    }
    limit = clamp(limit, 1, 10)
  }

  const { db } = await connectToDatabase()
  let users = await db
    .collection("Users")
    .aggregate([
      {
        $search: {
          text: {
            path: "name",
            query,
            fuzzy: {
              maxEdits: 2,
              maxExpansions: 100
            }
          }
        }
      },
      {
        $limit: limit
      },
      {
        $project: { _id: 0, email: 0, emailVerified: 0 }
      }
    ])
    .toArray()
  // .find(
  //   { $text: { $search: query } },
  //   { projection: { _id: 0, email: 0, emailVerified: 0 } }
  // )

  users = users.map((user) => ({
    ...user,
    partLists: user.partLists.filter((partList) => !partList.private)
  }))

  res.status(200).json(users)
}
