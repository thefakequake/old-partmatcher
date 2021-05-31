import styles from "./Navbar.module.css"
import pages from "./Pages"
import Logo from "../Logo/Logo"
import { FaTimes, FaBars } from "react-icons/fa"
import { useState } from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/client"
import Image from "next/image"
import NavbarDropdown from "../NavbarDropdown/NavbarDropdown"

const Navbar = () => {
  const [mobileViewShown, setMobileViewShown] = useState(false)
  const [session, loading] = useSession()

  return (
    <div className={styles.navbar}>
      <div
        className={styles.toggle}
        onClick={() => setMobileViewShown(!mobileViewShown)}
      >
        {mobileViewShown ? <FaTimes /> : <FaBars />}
      </div>
      <Logo className={styles.logo} />
      <nav
        className={
          styles.navLinks + (mobileViewShown ? " " + styles.active : "")
        }
      >
        {pages.map((page, count) => (
          <div className={styles.navLink} key={count}>
            <Link href={page.url}>
              <a>{page.name}</a>
            </Link>
          </div>
        ))}
        {!session && (
          <div className={styles.navLink + " " + styles.push}>
            <a onClick={signIn}>Log in</a>
          </div>
        )}
      </nav>
      <NavbarDropdown session={session} className={styles.userToggle} />
    </div>
  )
}

export default Navbar
