import { connectToDatabase } from "../../../../utils/mongodb"
import clamp from "../../../../utils/clamp"

export default async ({ query: { query = null, limit = 10 } }, res) => {
  if (query == null) {
    res.status(400).json({ error: "Please provide a query parameter" })
    return
  }
  if (limit !== 10) {
    limit = parseInt(limit)
    if (limit == NaN) {
      res.status(400).json({ error: "Limit parameter couldn't be parsed!" })
      return
    }
    limit = clamp(limit, 1, 10)
  }

  const { db } = await connectToDatabase()
  const parts = await db
    .collection("Parts")
    .find({ $text: { $search: query } }, { projection: { _id: 0 } })
    .limit(limit)
    .toArray()

  res.status(200).json(parts)
}
