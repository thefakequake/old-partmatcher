import { connectToDatabase } from "../../../utils/mongodb"
import { getSession } from "next-auth/client"

export default async (req, res) => {
  if (req.query.id.length != 6) {
    res
      .status(404)
      .json({ error: `Couldn't find a user with ID '${req.query.id}'` })
    return
  }

  const { db } = await connectToDatabase(0)

  const user = await db
    .collection("Users")
    .findOne(
      { id: req.query.id },
      { projection: { _id: 0, email: 0, emailVerified: 0 } }
    )

  if (!user) {
    res
      .status(404)
      .json({ error: `Couldn't find a user with ID '${req.query.id}'` })
    return
  }

  const session = await getSession({ req })

  if (session == null || session.id != user.id) {
    user.partLists = user.partLists.filter((partList) => !partList.private)
  }

  res.status(200).json(user)
}
