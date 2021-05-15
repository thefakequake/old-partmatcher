import { connectToDatabase } from "../../../utils/mongodb"

export default async ({ query: { filename } }, res) => {
  const { gfs } = await connectToDatabase(1)
  var readStream = gfs.createReadStream({
    filename: filename
  })
  readStream.once("error", () => {
    res.status(404).json({ error: "Couldn't find that file." })
  })

  readStream.pipe(res)
  res.status(200)
}
