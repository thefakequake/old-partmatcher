import Header from "../components/Header/Header"
import React from "react"
import { useSession } from "next-auth/client"
import styles from "../styles/homePage.module.css"
import ImageBox from "../components/ImageBox/ImageBox"
import { FaMemory, FaUsers, FaCode } from "react-icons/fa"
import { useRouter } from "next/router"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

const Feature = ({ image, name, description, click }) => {
  return (
    <div className={styles.feature}>
      <ImageBox
        style={{
          borderWidth: "20px",
          backgroundColor: "transparent",
          borderColor: "transparent"
        }}
      >
        {image}
      </ImageBox>
      <h1>{name}</h1>
      <p>{description}</p>
      <button onClick={click}>Find out more</button>
    </div>
  )
}

const homePage = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  return (
    <>
      <Header description="Building a PC. Simplified." />
      {session ? (
        <>
          <h1>Welcome to PartMatcher!</h1>
          <h2>
            Logged in as{" "}
            <span style={{ color: "#14d18c" }}>{session.user.name}</span>.
          </h2>
        </>
      ) : loading ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner width="150px" height="150px" loading={loading} />
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className={styles.landingContainer}>
          <div className={styles.waveContainer}>
            <div className={styles.filler} />
            <img src="/images/wave.svg" className={styles.wave} />
            <h1 className={styles.titleText}>PartMatcher</h1>
            <h1 className={styles.scrollText}>Building a PC. Simplified.</h1>
          </div>
          <div className={styles.features}>
            <Feature
              name="The parts you 💚"
              description="Browse a diverse range of PC parts for your next build, with 12
        different part types and search functionality."
              image={<FaMemory size="230px" style={{ color: "#14d18c" }} />}
              click={() => router.push("/parts")}
            />
            <Feature
              name="Community centered"
              description="See what the community has to say on certain parts, and add new parts to the database via the contributions system."
              image={<FaUsers size="230px" style={{ color: "#14d18c" }} />}
              click={() => router.push("/wip")}
            />
            <Feature
              name="Devs first"
              description="Integrate the PartMatcher API into your applications, and explore the site's code on GitHub."
              image={<FaCode size="230px" style={{ color: "#14d18c" }} />}
              click={() => router.push("/wip")}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default homePage
