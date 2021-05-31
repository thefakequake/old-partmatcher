import { connectToDatabase } from "../../../utils/mongodb"

export default async ({ query: { id } }, res) => {
  const { db } = await connectToDatabase()
  const part = await db
    .collection("Parts")
    .findOne(
      { part_id: id },
      { projection: { _id: 0, comments: { $slice: [0, 19] } } }
    )
  if (part == null) {
    res.status(404).json({
      error: `Couldn't find a part with ID '${id}'`
    })
    return
  }

  res.status(200).json(part)
}
