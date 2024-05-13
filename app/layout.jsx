import './globals.css'
import { Rubik } from 'next/font/google'
// //Import Mixpanel SDK
// import mixpanel from 'mixpanel-browser';
 
// // Near entry of your product, init Mixpanel
// mixpanel.init('YOUR_TOKEN', {debug: true, track_pageview: true, persistence: 'localStorage'});

import Navbar from './components/Navbar'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
