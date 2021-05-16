import styles from "./ImageBox.module.css"

const ImageBox = ({ children, style }) => {
  return (
    <div className={styles.imgBox} style={style}>
      {children}
    </div>
  )
}

export default ImageBox
