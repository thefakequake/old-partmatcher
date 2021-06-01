import "../styles/globals.css"
import Layout from "../components/Layout/Layout"
import { Provider } from "next-auth/client"
import NProgress from "nprogress"
import Router from "next/router"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/client"
import ReactTooltip from "react-tooltip"
import { useRouter } from "next/router"

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
  const router = useRouter()
  const [tooltipKey, setTooltipKey] = useState(0)

  const isUser = !!session?.user
  useEffect(() => {
    if (loading) return
  }, [isUser, loading])

  useEffect(() => {
    setTooltipVisibility(true)
  })

  useEffect(() => {
    setTooltipKey(prev => prev + 1)
  }, [router.pathname])

  return (
    <Provider session={pageProps.session}>
      {tooltipVisible && <ReactTooltip backgroundColor="#121212" key={tooltipKey} />}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
