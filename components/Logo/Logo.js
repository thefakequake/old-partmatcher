import styles from "./Logo.module.css"
import Link from "next/link"
import Image from "next/image"

const Logo = () => {
  return (
    <Link href="/">
      <a className={styles.logo}>
        <Image src="/images/logo.svg" width="58px" height="58px" alt="PartMatcher logo" />
        <h1>PartMatcher</h1>
      </a>
    </Link>
  )
}

export default Logo
