import styles from "../styles/404.module.css"
import Link from "next/link"
import Header from "../components/Header/Header"

const Custom404 = () => {
  return (
    <>
      <Header title="Error 404" description="404: Not found" />
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
    </>
  )
}

export default Custom404
