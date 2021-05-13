import Head from "next/head"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
