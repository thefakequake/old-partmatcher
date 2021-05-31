import "../styles/globals.css"
import Layout from "../components/Layout/Layout"
import { Provider } from "next-auth/client"
import NProgress from "nprogress"
import Router from "next/router"
import { useEffect } from "react"
import { useSession } from "next-auth/client"

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
  const isUser = !!session?.user
  useEffect(() => {
    if (loading) return
  }, [isUser, loading])

  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
