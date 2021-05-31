import Header from "../components/Header/Header"
import React from "react"
import { useSession } from "next-auth/client"

export default function Home() {
  const [session, loading] = useSession()

  return (
    <div>
      <Header />
      {!session && (
        <>
          <h1>You aren't logged in.</h1>
        </>
      )}
      {session && (
        <>
          <h1>{session.id}</h1>
        </>
      )}
      <h1>Welcome to PartMatcher!</h1>
    </div>
  )
}
