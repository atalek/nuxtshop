import { Lucia } from 'lucia'
import { adapter } from '~/server/models/userSchema'

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !process.dev,
    },
  },
  getUserAttributes: attributes => {
    return {
      id: attributes.id,
      name: attributes.name,
      email: attributes.email,
      isAdmin: attributes.isAdmin,
    }
  },
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  [x: string]: any
  id: string
  name: string
  email: string
  isAdmin: boolean
}
