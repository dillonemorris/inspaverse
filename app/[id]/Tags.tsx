'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const Tags = () => {
  const searchParams = useSearchParams()
  const initialTags = searchParams.get('tags')?.split('|')
  const [tags, setTags] = useState<string[]>(initialTags || [])

  const apiUrl = buildUrlWithTagsParam(
    'https://api.quotable.io/quotes/random',
    tags
  )

  const { data, error, isLoading } = useSWR(apiUrl, fetcher)
  const nextQuoteId = !isLoading && data[0]?._id
  const nextUrl = buildUrlWithTagsParam(`/${nextQuoteId}`, tags)

  const handleAddTag = (tag: string) => {
    setTags((tags) => [...tags, tag])
  }

  return (
    <div className="flex justify-between">
      <button
        onClick={() => handleAddTag('History')}
        className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20"
      >
        History
      </button>
      <button
        onClick={() => handleAddTag('Technology')}
        className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20"
      >
        Technology
      </button>
      <button
        onClick={() => handleAddTag('Love')}
        className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20"
      >
        Love
      </button>
      <button
        onClick={() => handleAddTag('Happiness')}
        className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20"
      >
        Happiness
      </button>
      <button className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30">
        Badge
      </button>
      <button className="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30">
        Badge
      </button>
      <button className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-400/30">
        Badge
      </button>
      <button className="inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 text-xs font-medium text-pink-400 ring-1 ring-inset ring-pink-400/20">
        Badge
      </button>

      {/*TODO: Should be disabled if no changes made */}
      <Link href={nextUrl}>Go to quote</Link>
    </div>
  )
}

const buildUrlWithTagsParam = (url, tags) => {
  const tagsFormatted = tags.join('|').toString()
  const tagsParams = tags.length > 1 ? tagsFormatted : tags[0]
  return tags?.length ? `${url}?tags=${tagsParams}` : url
}
