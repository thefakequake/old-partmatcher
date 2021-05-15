const clamp = (num, min, max) => {
  return Math.max(min, Math.min(num, max))
}

export default clamp
