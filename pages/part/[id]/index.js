const about = ({ part }) => {
  return (
    <div>
      <h1>{part.name}</h1>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `http://127.0.0.1:3000/api/parts/${context.params.id}`
  )
  const part = await response.json()
  return {
    props: {
      part
    }
  }
}

export default about
