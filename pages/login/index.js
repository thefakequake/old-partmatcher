import { providers, signIn, getSession } from "next-auth/client"
import styles from "./login.module.css"
import { FaGoogle, FaGithub, FaDiscord, FaTwitter } from "react-icons/fa"
import Header from "../../components/Header/Header"

const themes = [
  <FaGoogle className={styles.socialIcon} />,
  <FaGithub className={styles.socialIcon} />,
  <FaDiscord className={styles.socialIcon} />,
  <FaTwitter className={styles.socialIcon} />
]

function logIn({ providers }) {
  return (
    <>
      <Header title="Log in" />
      <div className={styles.logInBox}>
        <h1 align="center">Log in</h1>
        <div className={styles.logins}>
          {Object.values(providers).map((provider, count) => (
            <button key={count} onClick={() => signIn(provider.id)}>
              {themes[count]} Log in with {provider.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

logIn.getInitialProps = async (context) => {
  const { req, res } = context
  const session = await getSession({ req })

  if (session && res) {
    res.writeHead(302, {
      Location: "/"
    })
    res.end()
    return
  }

  return {
    session: undefined,
    providers: await providers(context)
  }
}

export default logIn
