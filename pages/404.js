import styles from "../styles/error.module.css"
import Link from "next/link"

const Custom404 = () => {
  return (
    <div className={styles.errorBox}>
      <h1 className={styles.error}>404: Not found</h1>
      <h3 className={styles.errorText}>
        Perhaps you made a typo?{" "}
        <Link href="/">
          <a className={styles.homeLink}>Go home</a>
        </Link>
        .
      </h3>
    </div>
  )
}

export default Custom404
