import { signOut, signIn } from "next-auth/client"
import { useState } from "react"
import styles from "./NavbarDropdown.module.css"
import Link from "next/link"
import { FaUser } from "react-icons/fa"

const NavbarDropdown = ({ session, className }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={styles.navbarDropdown + " " + className}>
      <div
        className={styles.userBox}
        onClick={() => setExpanded(!expanded)}
        onBlur={() => {
          setExpanded(!expanded)
        }}
      >
        {session ? (
          <img
            src={session.user.image}
            height="50px"
            width="50px"
            className={styles.userImage}
          />
        ) : (
          <FaUser className={styles.userImage} />
        )}
      </div>
      <div
        className={styles.userDropdown + " " + (expanded ? styles.shown : "")}
      >
        <h3 className={styles.userName}>
          {session ? session.user.name : "Not logged in"}
        </h3>
        <hr className={styles.divider} />
        {session && (
          <>
            <Link href={`/users/${session.id}`}>
              <a>Profile</a>
            </Link>
            <Link href={`/users/`}>
              <a>Part lists</a>
            </Link>
            <hr className={styles.divider} />
          </>
        )}
        {session ? (
          <a onClick={signOut}>Log out</a>
        ) : (
          <a onClick={signIn}>Log in</a>
        )}
      </div>
    </div>
  )
}

export default NavbarDropdown
