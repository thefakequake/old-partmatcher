import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div id="pageContent">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
