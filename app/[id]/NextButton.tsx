import Link from 'next/link'
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid'

export default async function NextButton({ tags }) {
  const nextQuote = await getNextQuote(tags)
  const nextUrl = buildUrlWithTagsParam(`/${nextQuote[0]._id}`, tags)

  return (
    <Link href={nextUrl}>
      <ArrowRightCircleIcon className="h-7 w-7 text-white-400" />
    </Link>
  )
}

async function getNextQuote(tags) {
  const baseUrl = 'https://api.quotable.io/quotes/random'
  const url = buildUrlWithTagsParam(baseUrl, tags)
  const res = await fetch(url, { cache: 'no-store' })

  return res.json()
}

const buildUrlWithTagsParam = (baseUrl, tags) => {
  return tags?.length ? `${baseUrl}?tags=${tags}` : baseUrl
}
