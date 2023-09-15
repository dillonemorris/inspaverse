'use client'

import useSWR from 'swr'
import { useState } from 'react'
import { TagsModal } from './[id]/TagsModal'
import { TagIcon, SparklesIcon, LinkIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import { API_TAGS, fetcher, Tag, TagColors } from '@/app/util'

export const Nav = () => {
  return (
    <div className="flex gap-8 relative justify-between">
      <div className="flex gap-8">
        <SparklesIcon className="h-7 w-7 text-white" />
        <TagsButtonAndModal />
      </div>
      <ShareLink />
    </div>
  )
}

const TagsButtonAndModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const tags = useTags()
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        <TagIcon className="h-7 w-7 text-white transition ease-in-out hover:text-gray-300 hover:scale-110 duration-300" />
      </button>
      <TagsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tags={tags}
      />
    </>
  )
}

const useTags = (): Tag[] => {
  const { data: apiTags } = useSWR(API_TAGS, fetcher)
  const colorsRepeated = [...colorsArray, ...colorsArray, ...colorsArray]
  const quoteCountFilter = (tag) => tag.quoteCount > 10
  const filteredTags = apiTags?.filter(quoteCountFilter) || []

  return filteredTags.map(({ name, slug }, i: number) => ({
    name,
    slug,
    color: colorsRepeated[i],
  }))
}

const colorsArray = Object.values(TagColors)

const ShareLink = () => {
  const pathname = usePathname()
  const currentUrl = `http://localhost:3000${pathname}`
  return (
    <button onClick={() => navigator.clipboard.writeText(currentUrl)}>
      <LinkIcon className="h-7 w-7 text-white transition ease-in-out hover:text-gray-300 hover:scale-110 duration-300" />
    </button>
  )
}
