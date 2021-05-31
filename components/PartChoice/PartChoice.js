import styles from "./PartChoice.module.css"
import styles2 from "../../pages/parts/partsPage.module.css"
import Link from "next/link"
import Image from "next/image"

const PartChoice = ({ partType }) => {
  const partLinkName = partType.toLowerCase().replace(/ /g, "-")

  return (
    <div className={styles.part + ' ' + styles2.partType}>
      <Link href={`/parts/types/${partLinkName}`}>
        <a>
          <Image
            src={`/images/parts/${partLinkName}.svg`}
            height="150px"
            width="150px"
          />
          <h2 align="center">{partType}</h2>
        </a>
      </Link>
    </div>
  )
}

export default PartChoice
