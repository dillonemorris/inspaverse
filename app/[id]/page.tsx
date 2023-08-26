import { Quote } from './Quote'
import { BackButton } from './BackButton'
import NextButton from './NextButton'

export default async function QuotePage({ params, searchParams }) {
  const quote = await getQuote(params.id)

  return (
    <div className="flex items-center h-64 max-w-2xl">
      <BackButton />
      <Quote>{quote.content}</Quote>
      <NextButton tags={searchParams.tags} />
    </div>
  )
}

async function getQuote(id) {
  const res = await fetch(`https://api.quotable.io/quotes/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
