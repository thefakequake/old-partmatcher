import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { accountAdapter } from "../../../utils/accountAdapter"
import { connectToDatabase } from "../../../utils/mongodb"

const options = async () => ({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Providers.Discord({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET
    })
  ],
  pages: {
    signIn: "/login"
  },

  adapter: await accountAdapter(),

  callbacks: {
    async session(session, token) {
      const newSession = { ...session, id: token.id, user: {...session.user, roles} }
      return newSession
    },
    signIn: async (profile, account, metadata) => {
      const image =
        metadata.image_url ??
        metadata.avatar_url ??
        metadata.picture ??
        metadata.profile_image_url_https.replace(
          /_normal\.(jpg|png|gif)$/,
          ".$1"
        )

      // checks if user's image has changed and updates it if it has
      if (image != profile.image) {
        const { db } = await connectToDatabase(0)
        await db
          .collection("Users")
          .updateOne({ id: profile.id }, { $set: { image } })
      }

      if (account.provider != "github") return
      const res = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `token ${account.accessToken}`
        }
      })
      const emails = await res.json()
      if (!emails || emails.length === 0) {
        return
      }
      const sortedEmails = emails.sort((a, b) => b.primary - a.primary)
      profile.email = sortedEmails[0].email
    }
  },

  database: process.env.MONGO_URI,

  session: {
    jwt: false
  }
})

export default async (req, res) => NextAuth(req, res, await options())
