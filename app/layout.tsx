import './globals.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Nav } from './Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inspaverse',
  description: 'A curated collection of inspirational and motivational quotes',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={
          (inter.className,
          'min-h-screen p-4 w-full flex flex-col gap-48 bg-cover relative')
        }
      >
        <BackgroundImage />
        <Nav />
        <main className="flex flex-col items-center justify-center relative">
          <div className="items-center justify-between text-sm lg:flex">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

const BackgroundImage = async () => {
  const backgroundImage = await getBackgroundImage()

  if (!backgroundImage) {
    return null
  }

  return (
    <Image
      alt={backgroundImage.alt_description}
      src={backgroundImage.urls.full}
      fill
      priority
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }}
    />
  )
}

async function getBackgroundImage() {
  const COLLECTION_ID = '1037422'
  const res = await fetch(
    `https://api.unsplash.com/photos/random?collections=${COLLECTION_ID}`,
    {
      headers: { Authorization: `Client-ID ${process.env.CLIENT_ID}` },
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    return null
  }

  return res.json()
}
