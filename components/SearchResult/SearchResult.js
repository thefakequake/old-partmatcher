import styles from "./SearchResult.module.css"
import ImageBox from "../ImageBox/ImageBox"
import Link from "next/link"
import Image from "next/image"

const SearchResult = ({ part }) => {
  return (
    <div className={styles.searchResult}>
      <Link href={`/parts/${part.part_id}`}>
        <a>
          <ImageBox>
            <Image src={part.images[0]} width="100px" height="100px" />
          </ImageBox>
          <h2 className={styles.partName}>{part.manufacturer} {part.name}</h2>
        </a>
      </Link>
    </div>
  )
}

export default SearchResult
