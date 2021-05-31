import Header from "../../components/Header/Header"
import PartChoice from "../../components/PartChoice/PartChoice"
import styles from "./partsPage.module.css"
import parts from "../../utils/parts"

const partsPage = () => {
  return (
    <>
      <Header
        title="Parts"
        description={`There are ${parts.length} part types available on PartMatcher.`}
      />
      <div className={styles.container}>
        <h1 align="center" className={styles.titleText}>Part Types</h1>
        <div className={styles.partTypes}>
          {parts.map((part, count) => (
            <PartChoice partType={part} key={count} className={styles.partType} />
          ))}
        </div>
      </div>
    </>
  )
}

export default partsPage
