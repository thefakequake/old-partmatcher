import styles from "./LoadingSpinner.module.css"

const LoadingSpinner = ({ width, height, className, loading }) => {
  return (
    <img
      src="/images/parts/case-fan.svg"
      className={
        styles.spinner +
        " " +
        (loading ? styles.spinnerLoading : "") +
        (className ? " " + className : "")
      }
      width={width}
      height={height}
    />
  )
}

export default LoadingSpinner
