import { redirect } from 'next/navigation'
import { API_RANDOM_QUOTE } from '@/app/util'

export default async function Home() {
  const data = await getQuote()
  const quote = data[0]

  return redirect(`/${quote._id}`)
}

async function getQuote() {
  const res = await fetch(API_RANDOM_QUOTE, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = res.json()

  return data
}
