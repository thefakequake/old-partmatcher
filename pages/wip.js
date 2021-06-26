import styles from "../styles/wip.module.css"
import Header from "../components/Header/Header"

const Custom404 = () => {
  return (
    <>
      <Header
        title="Work in Progress..."
        description="This page is not finished yet. Please check again later!"
      />
      <div className={styles.messageBox}>
        <h1 className={styles.message}>Work in Progress...</h1>
        <h3 className={styles.messageText}>
          This page is not finished yet. Please check again later!
        </h3>
      </div>
    </>
  )
}

export default Custom404
