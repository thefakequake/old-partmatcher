import styles from "./Logo.module.css"
import Link from "next/link"


const Logo = () => {
  return (
    <Link href="/">
      <a className={styles.logo}>
        <img src="/images/logo64.png" width="64px" height="64px" />
        <h1>PartMatcher</h1>
      </a>
    </Link>

  )
}

export default Logo
