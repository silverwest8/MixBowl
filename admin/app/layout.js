import './globals.css';
import LoginPage from './login/page';
import { cookies } from 'next/headers';
import Navbar from './navbar';

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({ children }) {
  const isLoggedIn = cookies().get('token');
  return (
    <html lang="ko" className="h-full bg-gray-50">
      <body className="h-full">
        {isLoggedIn ? (
          <>
            <Navbar />
            {children}
          </>
        ) : (
          <LoginPage /> // redirect 함수가 server side에서 동작 안함.
        )}
      </body>
    </html>
  );
}
