import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import Nav from "./auth/Nav"
import QueryWrapper from './auth/QueryWrapper'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto"
})

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-24 xl:mx-96 ${roboto.variable} bg-gray-200`}>
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
