import Link from 'next/link'
import { Quote } from '@/components/Quote'
import { redirect } from 'next/navigation'

export default async function Home() {
  const data = await getQuote()
  const quote = data[0]

  return redirect(`/${quote._id}`)
}

async function getQuote() {
  const res = await fetch('https://api.quotable.io/quotes/random', {
    cache: 'no-store',
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // TODO: Create error boundary
    throw new Error('Failed to fetch data')
  }

  const data = res.json()

  return data
}
