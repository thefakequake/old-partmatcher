import styles from "./Logo.module.css"
import Link from "next/link"


const Logo = () => {
  return (
    <Link href="/">
      <a className={styles.logo}>
        <img src="/images/logo.svg" width="58px" height="58px" alt="PartMatcher logo" />
        <h1>PartMatcher</h1>
      </a>
    </Link>
  )
}

export default Logo
