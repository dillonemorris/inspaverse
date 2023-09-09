import { BackButton } from './BackButton'
import NextButton from './NextButton'
import { API_QUOTES } from '@/app/constants'

export default async function QuotePage({ params, searchParams }) {
  const quote = await getQuote(params.id)

  return (
    <div className="flex items-center h-64 max-w-2xl">
      <BackButton />
      <div className="text-center">
        <blockquote className="text-2xl lg:text-4xl lg:leading-snug px-16 py-12 text-white">
          {quote.content}
        </blockquote>
        <p className="text-white text-sm lg:text-lg">{quote.author}</p>
      </div>
      <NextButton tags={searchParams.tags} />
    </div>
  )
}

async function getQuote(id) {
  const res = await fetch(`${API_QUOTES}/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
