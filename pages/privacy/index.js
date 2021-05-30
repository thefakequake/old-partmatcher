import Header from "../../components/Header/Header"
import styles from "./privacy.module.css"

const privacy = () => {
  return (
    <>
      <Header title="Privacy Policy" />
      <div className={styles.privacy}>
        <h1 align="center">Privacy Policy</h1>
        <div className={styles.privacyBody}>
          <h2>What data we collect:</h2>
          <ul>
            <li>Username/name</li>
            <li>Email</li>
            <li>Social provider account ID</li>
            <li>Auth sessions</li>
            <li>Part lists and builds</li>
            <li>Contributions</li>
            <li>Your site preferences and settings</li>
          </ul>
          <h2>How it's collected:</h2>
          <p>
            When you make an account on PartMatcher by signing in with a social
            account, a PartMatcher account is generated, assigning additional
            data to the required data provided by your social provider. When you
            change your settings or preferences, this is saved between accounts.
            When you log in on PartMatcher, a session is created that is used to
            hold user state. We also store your contributions so that we can
            keep logs of what gets edited and when. When you create a part list
            or build, the data to construct them are stored.
          </p>
          <h2>Why it's collected:</h2>
          <p>
            Settings/preferences are saved to sync settings between accounts, so
            you can save your configurations. Sessions are a required part of
            the auth system. Contributions are logged to make rollbacks easier.
          </p>
          <h2>How it's used:</h2>
          <p>
            Your data is used to povide an integrated and seamless experience on
            PartMatcher, that respects your privacy. No unnecessary data is
            stored or tracked, mostly because the site doesn't have ads.
          </p>
          <h2>How it's stored:</h2>
          <p>
            All PartMatcher data is stored safely with{" "}
            <a href="https://www.mongodb.com/">MongoDB</a>.
          </p>
        </div>
      </div>
    </>
  )
}

export default privacy
