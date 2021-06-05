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
  let parts = await db
    .collection("Parts")
    .aggregate([
      {
        $search: {
          text: {
            path: ["manufacturer", "name"],
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
        $project: { _id: 0 }
      }
    ])
    //.find({ $text: { $search: query } }, { projection: { _id: 0 }})
    .toArray()
  if (type !== null) {
    parts = parts.filter(
      (part) => part.type.toLowerCase() === type.toLowerCase()
    )
  }

  res.status(200).json(parts)
}
