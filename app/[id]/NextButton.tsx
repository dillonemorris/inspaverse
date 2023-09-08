import Link from 'next/link'
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid'
import { API_RANDOM_QUOTE } from '@/app/constants'

type NextButtonProps = {
  tags: string[]
}

export default async function NextButton({ tags }: NextButtonProps) {
  const nextQuote = await getNextQuote(tags)
  const nextUrl = buildUrlWithTagsParam(`/${nextQuote[0]._id}`, tags)

  return (
    <Link href={nextUrl}>
      <ArrowRightCircleIcon className="h-7 w-7 text-white-400" />
    </Link>
  )
}

async function getNextQuote(tags) {
  const url = buildUrlWithTagsParam(API_RANDOM_QUOTE, tags)
  const res = await fetch(url, { cache: 'no-store' })

  return res.json()
}

const buildUrlWithTagsParam = (baseUrl: string, tags: string[]) => {
  return tags?.length ? `${baseUrl}?tags=${tags}` : baseUrl
}
