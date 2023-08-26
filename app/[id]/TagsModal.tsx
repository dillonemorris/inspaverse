'use client'
import useSWR from 'swr'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'

const COLORS = {
  GRAY: 'gray',
  RED: 'red',
  YELLOW: 'yellow',
  GREEN: 'green',
  BLUE: 'blue',
  INDIGO: 'indigo',
  PURPLE: 'purple',
  PINK: 'pink',
}

const getColorVariant = (color, isActive) =>
  ({
    [COLORS.GRAY]: {
      base: 'bg-gray-400/10 text-gray-400 ring-gray-400/20',
      active: 'bg-gray-200/80 text-gray-800 ring-gray-500',
    },
    [COLORS.RED]: {
      base: 'bg-red-400/10 text-red-400 ring-red-400/20',
      active: 'bg-red-200/80 text-red-800 ring-red-600',
    },
    [COLORS.YELLOW]: {
      base: 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20',
      active: 'bg-yellow-200/80 text-yellow-800 ring-yellow-600',
    },
    [COLORS.GREEN]: {
      base: 'bg-green-400/10 text-green-400 ring-green-400/20',
      active: 'bg-green-200/80 text-green-900 ring-green-600',
    },
    [COLORS.BLUE]: {
      base: 'bg-blue-400/10 text-blue-400 ring-blue-400/20',
      active: 'bg-blue-300/90 text-blue-800 ring-blue-600',
    },
    [COLORS.INDIGO]: {
      base: 'bg-indigo-400/10 text-indigo-400 ring-indigo-400/20',
      active: 'bg-indigo-300 text-indigo-800 ring-indigo-600',
    },
    [COLORS.PURPLE]: {
      base: 'bg-purple-400/10 text-purple-400 ring-purple-400/20',
      active: 'bg-purple-300/90 text-purple-800 ring-purple-600',
    },
    [COLORS.PINK]: {
      base: 'bg-pink-400/10 text-pink-400 ring-pink-400/20',
      active: 'bg-pink-300/90 text-pink-800 ring-pink-600',
    },
  })[color][isActive ? 'active' : 'base']

const fetcher = (url: URL) => fetch(url).then((res) => res.json())

type TagsModalProps = {
  onClose: () => void
  isOpen: boolean
}

export const TagsModal = ({ isOpen, onClose }: TagsModalProps) => {
  const searchParams = useSearchParams()
  const initialTags = searchParams.get('tags')?.split('|') || []
  const [tags, setTags] = useState<string[]>(initialTags)

  const apiUrl = buildUrlWithTagsParam(
    'https://api.quotable.io/quotes/random',
    tags
  )

  const { data, isLoading } = useSWR(apiUrl, fetcher)
  const nextQuoteId = !isLoading && data[0]?._id
  const nextUrl = buildUrlWithTagsParam(`/${nextQuoteId}`, tags)

  const handleTagClick = (tag: string) => {
    const doesTagExist = tags.indexOf(tag) > -1
    const removeOrAddTag = (tags) => {
      if (doesTagExist) {
        return tags.filter((t) => t !== tag)
      }

      return [...tags, tag]
    }

    setTags(removeOrAddTag)
  }

  const tagsData = useTags()

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          onClose()
          setTags(initialTags)
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Select quote tags
                </Dialog.Title>
                <div className="mt-2">
                  <Dialog.Description className="text-sm text-indigo-200">
                    Select tags to tailor the quotes to your liking.
                  </Dialog.Description>
                </div>

                <div className="-m-1 py-6">
                  {tagsData.map((tag) => {
                    return (
                      <button
                        key={tag.slug}
                        onClick={() => handleTagClick(tag.slug)}
                        className={`inline-flex m-1 items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${getColorVariant(
                          tag.color,
                          tags.some((t) => t === tag.slug)
                        )}`}
                      >
                        {tag.name}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-4">
                  <Link
                    href={nextUrl}
                    onClick={onClose}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Save changes
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const colorsArray = Object.values(COLORS)

const useTags = () => {
  const { data: tagsData } = useSWR('https://api.quotable.io/tags', fetcher)
  const filteredTags = tagsData?.filter((tag) => tag.quoteCount > 10) || []
  const colorsRepeated = colorsArray.concat(...Array(2).fill(colorsArray))

  const tags = filteredTags.reduce((acc, { name, slug }, i) => {
    const color = colorsRepeated[i]
    return [...acc, { name, slug, color }]
  }, [])

  return tags
}

const buildUrlWithTagsParam = (url, tags) => {
  const tagsFormatted = tags.join('|').toString()
  const tagsParams = tags.length > 1 ? tagsFormatted : tags[0]
  return tags?.length ? `${url}?tags=${tagsParams}` : url
}
