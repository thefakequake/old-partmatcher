import styles from "../styles/500.module.css"
import Link from "next/link"
import Header from "../components/Header/Header"

const Custom404 = () => {
  return (
    <>
      <Header title="Error 500" description="500: Internal server error" />
      <div className={styles.errorBox}>
        <h1 className={styles.error}>500: Internal server error</h1>
        <h3 className={styles.errorText}>
          Something went wrong.{" "}
          <Link href="https://github.com/QuaKe8782/partmatcher/issues">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={styles.homeLink}
            >
              Report on GitHub
            </a>
          </Link>
          .
        </h3>
      </div>
    </>
  )
}

export default Custom404
