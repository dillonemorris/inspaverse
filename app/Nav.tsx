'use client'

import useSWR from 'swr'
import { useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { TagsModal } from './[id]/TagsModal'
import { TagIcon, SparklesIcon, LinkIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import { API_TAGS, DOMAIN, fetcher, Tag, TagColors } from '@/app/util'

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
      <button
        aria-label="Open tag modal button"
        onClick={() => setIsModalOpen(true)}
      >
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

type ApiTag = {
  slug: string
  name: string
  quoteCount: number
}

const useTags = (): Tag[] => {
  const { data: apiTags } = useSWR<ApiTag[]>(API_TAGS, fetcher)
  const quoteCountFilter = (tag: ApiTag) => tag.quoteCount > 10
  const filteredTags = apiTags?.filter(quoteCountFilter) || []

  return filteredTags.map(({ name, slug }, i: number) => {
    const colorIndex = i % colorsArray.length
    return {
      name,
      slug,
      color: colorsArray[colorIndex],
    }
  })
}

const colorsArray = Object.values(TagColors)

const ShareLink = () => {
  const copyUrlToClipboard = useCopyUrlToClipboard()

  return (
    <Popover className="flex">
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="z-10 bg-gray-800 px-2 py-1 rounded text-sm">
          URL Copied!
        </Popover.Panel>
      </Transition>
      <Popover.Button
        aria-label="Copy url to clipboard button"
        className="ml-2"
        onClick={copyUrlToClipboard}
      >
        <LinkIcon className="h-7 w-7 text-white transition ease-in-out hover:text-gray-300 hover:scale-110 duration-300" />
      </Popover.Button>
    </Popover>
  )
}

const useCopyUrlToClipboard = () => {
  const pathname = usePathname()
  const currentUrl = `${DOMAIN}${pathname}`
  return () => navigator.clipboard.writeText(currentUrl)
}
