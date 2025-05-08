import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from '@/lib/zod'
import { Provider } from 'next-auth/providers'
import getUserFromDb from '@/lib/auth/getUserFromDb'
import { verifyPassword } from '@/utils/auth/verifyPassword'
import { ZodError } from 'zod'

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    authorize: async (credentials) => {
      try {
        const { email, password } = await signInSchema.parseAsync(credentials)

        const user = await getUserFromDb(email)

        if (!user || !user.password) return null

        const isValidPassword = await verifyPassword(password, user.password)

        if (!isValidPassword) return null

        return { id: user.id.toString(), email: user.email, name: user.name }
      } catch (error) {
        if (error instanceof ZodError) {
          return null
        }

        return null
      }
    }
  })
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    session: async ({ session, token }) => {
      if (session.user && token?.sub) {
        session.user.id = token.sub
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  secret: process.env.AUTH_SECRET,
})