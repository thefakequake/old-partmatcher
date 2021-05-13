import styles from "./Navbar.module.css"
import pages from "./Pages"
import Logo from "../Logo/Logo"
import { FaTimes, FaBars } from "react-icons/fa"
import { useState } from "react"
import Link from "next/link"

const Navbar = ({ loggedIn = false }) => {
  const [mobileViewShown, setMobileViewShown] = useState(false)

  return (
    <div className={styles.navbar}>
      <Logo />
      <nav
        className={
          styles.navLinks + (mobileViewShown ? " " + styles.active : "")
        }
      >
        {pages
          .filter((page) =>
            loggedIn ? !page.removeOnLogin : !page.requiresLogin
          )
          .map((page, count) => (
            <div className={styles.navLink} key={count}>
              <Link href={page.url}>
                <a>{page.name}</a>
              </Link>
            </div>
          ))}
      </nav>
      <div
        className={styles.toggle + " " + styles.push}
        onClick={() => setMobileViewShown(!mobileViewShown)}
      >
        {mobileViewShown ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  )
}

export default Navbar
