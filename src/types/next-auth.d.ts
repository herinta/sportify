import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      displayName: string;
      email: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    displayName: string;
    email: string;
    role: string;
  }
}
