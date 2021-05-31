import { connectToDatabase } from "../../../utils/mongodb"
import Header from "../../../components/Header/Header"
import styles from "./usersPage.module.css"
import {
  FaUserShield,
  FaUserCheck,
  FaUserEdit,
  FaUserPlus,
  FaCode
} from "react-icons/fa"

const index = ({ user, partLists = [] }) => {
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(user.id)
    alert("Copied user ID to clipboard")
  }

  return (
    <>
      <Header title={user.name} image={user.image} />
      <div className={styles.container}>
        <div className={styles.userSummary}>
          <div className={styles.userInfo}>
            <img
              src={user.image}
              className={styles.userImage}
              width="230px"
              height="230px"
            />
            <div className={styles.userName} align="center">
              <h1>{user.name}</h1>
              <div className={styles.badges}>
                {user.roles.includes("developer") && (
                  <FaCode data-tip="Developer" className={styles.badge} />
                )}
                {user.roles.includes("moderator") && (
                  <FaUserShield data-tip="Moderator" className={styles.badge} />
                )}
                {user.roles.includes("verified") && (
                  <FaUserCheck data-tip="Verified" className={styles.badge} />
                )}
                {user.contributions > 0 && (
                  <FaUserEdit data-tip="Contributor" className={styles.badge} />
                )}
                {user.roles.includes("og") && (
                  <img
                    src="/images/logo.svg"
                    data-tip="OG"
                    className={styles.badge}
                    height="30px"
                    width="30px"
                  />
                )}
                {user.createdAt > new Date(Date.now() - 604800000) && (
                  <FaUserPlus data-tip="New user" className={styles.badge} />
                )}
              </div>
            </div>
            <p data-tip="Copy to clipboard" onClick={copyLinkToClipboard}>
              <strong>{user.id}</strong>
            </p>
          </div>
          <div className={styles.userStats}>
            <h2 align="center">User Stats</h2>
            <h3 className={styles.stat}>
              Joined:{" "}
              <span>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit"
                })
                  .format(user.createdAt)
                  .replace(",", "")}
              </span>
            </h3>
            <h3 className={styles.stat}>
              Contributions: <span>{user.contributions}</span>
            </h3>
          </div>
        </div>
        <div
          className={`${styles.partLists} ${
            partLists.length == 0 ? styles.noLists : ""
          }`}
        >
          <h2 className={styles.noLists}>
            {user.name} doesn't have any public part lists
          </h2>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { db } = await connectToDatabase(0)

  const user = await db
    .collection("Users")
    .findOne(
      { id: context.params.id },
      { projection: { _id: 0, email: 0, emailVerified: 0 } }
    )

  if (!user) {
    context.res.statusCode = 302
    context.res.setHeader("location", "/404")
    context.res.end()
    return {
      props: {}
    }
  }

  delete user.email
  delete user.emailVerified

  return {
    props: {
      user
    }
  }
}

export default index
