import "./globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Metadata } from "next"
import {
  ClerkProvider,
  
} from '@clerk/nextjs'
import { dark } from "@clerk/themes"
import { Provider } from "./Room"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata : Metadata = {
  title:"live docs" , 
  description : 'live docs using next js'
}

export default function RootLayout({ children }: {children :ReactNode}) {
  return (
      <ClerkProvider
        appearance={
          {
            baseTheme : dark , 
            variables : {colorBackground: '#0f172a' , colorText : '#64748b' , fontSize:'16px'   }
          }
        }
      >
        <html lang='en'>

          <body
            className={cn(
              "min-h-screen bg-gray-950 text-[#EEEE] font-sans antialiased",
              fontSans.variable
            )}
          >
            <Provider>
              {children}
            </Provider>
          </body>
        </html>
    </ClerkProvider>
    
  )
}
