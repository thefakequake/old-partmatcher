import { connectToDatabase } from "./mongodb"
import { createHash, randomBytes } from "crypto"
import models from "./models"

export const accountAdapter = async () => {
  const db = (await connectToDatabase(0)).db

  const hashToken = (token) =>
    createHash("sha256").update(`${token}${secret}`).digest("hex")

  const stripUndefined = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([, value]) => typeof value !== "undefined")
    )
  }

  const genUserId = async (obj) => {
    var id
    while (true) {
      id = randomBytes(3).toString("hex")
      if (!(await db.collection("Users").findOne({ id }))) {
        break
      }
    }
    return id
  }

  return {
    async getAdapter({ session }) {
      const sessionMaxAge = session.maxAge * 1000 // default is 30 days
      const sessionUpdateAge = session.updateAge * 1000 // default is 1 day

      return {
        async createUser(profile) {
          const user = stripUndefined({
            ...models.user,
            name: profile.name,
            email: profile.email,
            image: profile.image,
            emailVerified: profile.emailVerified ?? null,
            id: await genUserId(),
            createdAt: new Date(Date.now())
          })
          await db.collection("Users").insertOne(user)
          return user
        },
        async getUser(id) {
          const user = await db.collection("Users").findOne({ id })
          return user
        },
        async getUserByEmail(email) {
          if (!email) return null

          return await db.collection("Users").findOne({ email: email })
        },
        async getUserByProviderAccountId(providerId, providerAccountId) {
          const account = await db
            .collection("Accounts")
            .findOne({ providerId, providerAccountId })

          if (!account) return null

          const user = await db
            .collection("Users")
            .findOne({ id: account.userId })

          return { ...user, id: user.id }
        },
        async updateUser(user) {
          delete user._id
          const updatedUser = { ...user, updatedAt: new Date(Date.now()) }

          await db
            .collection("Users")
            .replaceOne({ id: user.id }, updatedUser)

          return updatedUser
        },
        async deleteUser(userId) {
          await db.collection("Users").deleteOne({ id: userId })
        },
        async linkAccount(
          userId,
          providerId,
          providerType,
          providerAccountId,
          refreshToken,
          accessToken,
          accessTokenExpires
        ) {
          const account = {
            userId,
            providerId,
            providerType,
            providerAccountId,
            refreshToken,
            accessToken,
            accessTokenExpires,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now())
          }

          await db.collection("Accounts").insertOne(account)

          return account
        },
        async unlinkAccount(userId, providerId, providerAccountId) {
          const account = await db
            .collection("Accounts")
            .findOne({ userId, providerId, providerAccountId })

          await db.collection("Accounts").deleteOne({ accountId: account.id })
        },
        async createSession(user) {
          const sessionRef = {
            userId: user.id,
            expires: new Date(Date.now() + sessionMaxAge),
            sessionToken: randomBytes(32).toString("hex"),
            accessToken: randomBytes(32).toString("hex")
          }
          await db.collection("Sessions").insertOne(sessionRef)
          return sessionRef
        },
        async getSession(sessionToken) {
          const session = await db
            .collection("Sessions")
            .findOne({ sessionToken })

          if (!session) return null

          if (session.expires < new Date(Date.now())) {
            await db.collection("Sessions").deleteOne({ id: sessionId })
            return null
          }
          
          return session
        },
        async updateSession(session, force) {
          delete session._id
          if (
            !force &&
            Number(session.expires) - sessionMaxAge + sessionUpdateAge >
              new Date(Date.now())
          ) {
            return null
          }

          const expires = new Date(Date.now() + sessionMaxAge)
          await db
            .collection("Sessions")
            .replaceOne({ id: session.id }, { ...session, expires })

          return {
            ...session,
            updatedAt: expires
          }
        },

        async deleteSession(sessionToken) {
          await db.collection("Sessions").deleteOne({ sessionToken })
        }
      }
    }
  }
}
