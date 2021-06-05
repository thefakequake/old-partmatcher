import { connectToDatabase } from "../../../utils/mongodb"
import styles from "./part.module.css"
import Link from "next/link"
import ImageBox from "../../../components/ImageBox/ImageBox"
import Header from "../../../components/Header/Header"
import Image from "next/image"

const part = ({ part }) => {
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Copied part URL to clipboard")
  }

  return (
    <>
      <Header
        title={`${part.manufacturer} ${part.name}`}
        image={part.images ? part.images[0] : "/images/noimage.png"}
      />
      <div className={styles.partName}>
        <div className={styles.upper}>
          <Link href={`/parts/type/${part.type.toLowerCase().replace(" ", "-")}`}>
            <a>
              <strong>{part.type.toUpperCase()}</strong>
            </a>
          </Link>
          <p className={styles.seperator}>•</p>
          <p onClick={copyLinkToClipboard} data-tip="Copy" className={styles.partId}>
            {part.part_id}
          </p>
        </div>
        <h1>
          {part.manufacturer} {part.name}
        </h1>
      </div>
      <div className={styles.content}>
        <ImageBox>
          <Image
            src={part.images[0]}
            className={styles.partImg}
            width="300px"
            height="300px"
            alt={`${part.manufacturer} ${part.name}`}
          />
        </ImageBox>
        <div className={styles.notes}>
          <h1 align="center">Notes</h1>
          <ul>
            {part.notes.map((note, index) => (
              <li className={styles.note} key={index}>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.specs}>
          <h1 align="center">Specs</h1>
          {Object.keys(part.specs).map((specName, count) => (
            <div key={count}>
              <h2>{specName}</h2>
              <h3>{part.specs[specName]}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { db } = await connectToDatabase(0)

  const part = await db
    .collection("Parts")
    .findOne({ part_id: context.params.id }, { projection: { _id: 0 } })

  if (!part) {
    context.res.statusCode = 302
    context.res.setHeader("location", "/404")
    context.res.end()
    return {props: {}}
  }

  return {
    props: {
      part: part
    }
  }
}

export default part
