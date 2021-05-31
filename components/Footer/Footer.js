import styles from "./Footer.module.css"
import socials from "./Socials"
import ReactTooltip from 'react-tooltip'

const Footer = () => {
  return (
    <>
    <ReactTooltip backgroundColor="#121212" />
      <footer className={styles.footerBar}>
        <div>
          {socials.map((platform, count) => (
            <a
              className={styles.socialIcon}
              data-tip={platform.name}
              target="_blank"
              rel="noopener noreferrer"
              href={platform.url}
              key={count}
            >
              {platform.component}
            </a>
          ))}
        </div>
        <p className={styles.copyrightText}>© PartMatcher</p>
      </footer>
    </>
  )
}

export default Footer
