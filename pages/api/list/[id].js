import { connectToDatabase } from "../../../utils/mongodb"

export default async ({ query: { id } }, res) => {
  const { db } = await connectToDatabase(0)
  const partList = await db
    .collection("Parts")
    .findOne({ list_id: id }, { projection: { _id: 0 } })
  if (partList == null) {
    res.status(404).json({
      error: `Couldn't find a part list with ID '${id}'`
    })
    return
  }

  res.status(200).json(partList)
}  
