import { Quote } from '@/components/Quote'
import { BackButton } from './BackButton'
import NextButton from '@/app/[id]/NextButton'

export default async function QuotePage({ params, searchParams }) {
  const quote = await getQuote(params.id)

  return (
    <>
      <BackButton />
      <Quote>{quote.content}</Quote>
      <NextButton tags={searchParams.tags} />
    </>
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
