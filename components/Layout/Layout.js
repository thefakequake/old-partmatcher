import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div id="pageContent" style={{marginTop: "5rem"}}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
