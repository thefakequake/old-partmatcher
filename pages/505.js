import styles from "../styles/error.module.css"
import Link from "next/link"

const Custom404 = () => {
  return (
    <div className={styles.errorBox}>
      <h1 className={styles.error}>505: Internal server error</h1>
      <h3 className={styles.errorText}>
        Something went wrong.{" "}
        <Link href="https://github.com/QuaKe8782/partmatcher/issues">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={styles.homeLink}
          >
            Report this on GitHub
          </a>
        </Link>
        .
      </h3>
    </div>
  )
}

export default Custom404
