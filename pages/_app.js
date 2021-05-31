import "../styles/globals.css"
import Layout from "../components/Layout/Layout"
import { Provider } from "next-auth/client"
import NProgress from "nprogress"
import Router from "next/router"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/client"
import ReactTooltip from "react-tooltip"

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

function MyApp({ Component, pageProps }) {
  const [session, loading] = useSession()
  const [tooltipVisible, setTooltipVisibility] = useState(false)
  const isUser = !!session?.user
  useEffect(() => {
    setTooltipVisibility(true);
    if (loading) return
  }, [isUser, loading])

  return (
    <Provider session={pageProps.session}>
      {tooltipVisible && <ReactTooltip backgroundColor="#121212" />}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
