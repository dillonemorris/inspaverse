import { Quote } from '@/components/Quote'
import Link from 'next/link'
import { BackButton } from './BackButton'

export default async function QuotePage({ params }) {
  const currentQuote = await getQuote(params.id)
  const data = await getNextQuote()
  const nextQuote = data[0]

  return (
    <>
      <BackButton />
      <Quote>{currentQuote.content}</Quote>
      <Link href={`/${nextQuote._id}`}>Next</Link>
    </>
  )
}

async function getQuote(id) {
  const res = await fetch(`https://api.quotable.io/quotes/${id}`)

  if (!res.ok) {
    // TODO: Create error boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getNextQuote() {
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
