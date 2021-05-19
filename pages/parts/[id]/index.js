import { connectToDatabase } from "../../../utils/mongodb"
import Custom404 from "../../404"
import styles from "./part.module.css"
import Link from "next/link"
import ImageBox from "../../../components/ImageBox/ImageBox"
import Header from "../../../components/Header/Header"
import parts from "../parts"
import PartSearchPage from "../../../components/PartSearchPage/PartSearchPage"

const partUrls = parts.map((part) => part.toLowerCase().replace(/ /g, "-"))

const part = ({ part, page }) => {
  if (page !== undefined) return <PartSearchPage part={page} />
  if (!part) return <Custom404 />

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Copied Part URL to clipboard")
  }

  return (
    <>
      <Header
        title={`${part.manufacturer} ${part.name}`}
        image={part.images ? part.images[0] : "/images/noimage.png"}
      />
      <div className={styles.partName}>
        <div className={styles.upper}>
          <Link href={`/parts/${part.type.toLowerCase().replace(" ", "-")}`}>
            <a>
              <strong>{part.type.toUpperCase()}</strong>
            </a>
          </Link>
          <p className={styles.seperator}>•</p>
          <p onClick={copyLinkToClipboard} className={styles.partId}>
            {part.part_id}
          </p>
        </div>
        <h1>
          {part.manufacturer} {part.name}
        </h1>
      </div>
      <div className={styles.content}>
        <ImageBox>
          <img
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
          {Object.keys(part.specs).map((specName) => (
            <div>
              <h2>{specName}</h2>
              <h4>{part.specs[specName]}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  if (partUrls.includes(context.params.id))
    return {
      props: {
        page: {
          partLink: context.params.id,
          partName: parts[partUrls.indexOf(context.params.id)]
        }
      }
    }

  const { db } = await connectToDatabase(0)

  const part = await db
    .collection("Parts")
    .findOne({ part_id: context.params.id }, { projection: { _id: 0 } })

  return {
    props: {
      part: part
    }
  }
}

export default part
