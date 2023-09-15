'use client'
import useSWR from 'swr'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import { API_RANDOM_QUOTE, TagColors, fetcher, Tag } from '@/app/util'
import { ArrowPathIcon } from '@heroicons/react/20/solid'

type TagsModalProps = {
  onClose: () => void
  isOpen: boolean
  tags: Tag[]
}

export const TagsModal = ({ isOpen, onClose, tags }: TagsModalProps) => {
  const initialTags = useInitialTags()
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags)
  const nextUrl = useNextQuoteUrl(selectedTags)

  const handleTagClick = (tag: string) => {
    const removeOrAddTag = (tags: string[]) => {
      if (tags.includes(tag)) {
        return tags.filter((t) => t !== tag)
      }

      return [...tags, tag]
    }

    setSelectedTags(removeOrAddTag)
  }

  const handleGetColorVariant = ({ color, slug }: Tag) =>
    getColorVariant(color, selectedTags.includes(slug))

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          onClose()
          setSelectedTags(initialTags)
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
                  <Tags
                    tags={tags}
                    onTagClick={handleTagClick}
                    getColorVariant={handleGetColorVariant}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={nextUrl}
                    onClick={onClose}
                    className="inline-flex justify-center rounded-md border border-blue-900 bg-transparent px-4 py-2 text-sm font-medium text-white transition ease-in-out hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Save changes
                  </Link>
                  <button onClick={() => setSelectedTags(initialTags)}>
                    <ArrowPathIcon className="h-6 w-6 text-blue-100 transition ease-in-out hover:text-blue-300 hover:scale-110 duration-300" />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const useNextQuoteUrl = (tags: string[]): string => {
  const urlRandomQuote = addTagParamToUrl(API_RANDOM_QUOTE, tags)
  const { data: quote, isLoading } = useSWR(urlRandomQuote, fetcher)
  const nextQuoteId = !isLoading && quote[0]?._id
  return addTagParamToUrl(`/${nextQuoteId}`, tags)
}

const useInitialTags = (): string[] => {
  const searchParams = useSearchParams()
  const tagParam = searchParams.get('tags')
  return tagParam?.split('|') || []
}

const addTagParamToUrl = (url: string, tags: string[]): string => {
  const param = tags.length > 1 ? tags.join('|') : tags[0]
  return tags.length ? `${url}?tags=${param}` : url
}

type TagsProps = {
  onTagClick: (tag: string) => void
  getColorVariant: (tag: Tag) => string
  tags: Tag[]
}

const Tags = ({ onTagClick, getColorVariant, tags }: TagsProps) => {
  return tags.map((tag) => {
    return (
      <button
        key={tag.slug}
        onClick={() => onTagClick(tag.slug)}
        className={`inline-flex m-1 items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset
        ${getColorVariant(tag)} transition ease-in-out`}
      >
        {tag.name}
      </button>
    )
  })
}

const getColorVariant = (color: TagColors, isActive: boolean): string => {
  const colorVariants = {
    [TagColors.GRAY]: {
      base: 'bg-gray-400/10 text-gray-300 ring-gray-400/20 hover:bg-transparent',
      active: 'bg-gray-200/80 hover:bg-gray-200/80 text-gray-800 ring-gray-500',
    },
    [TagColors.RED]: {
      base: 'bg-red-400/10 text-red-400 ring-red-400/20 hover:bg-transparent',
      active: 'bg-red-200/80 hover:bg-red-200/80 text-red-800 ring-red-600',
    },
    [TagColors.YELLOW]: {
      base: 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20 hover:bg-transparent',
      active:
        'bg-yellow-100/80 hover:bg-yellow-100/80 text-yellow-800 ring-yellow-600',
    },
    [TagColors.GREEN]: {
      base: 'bg-green-400/10 text-green-400 ring-green-400/20 hover:bg-transparent',
      active:
        'bg-green-200/80 hover:bg-green-200/80 text-green-900 ring-green-600',
    },
    [TagColors.BLUE]: {
      base: 'bg-blue-400/10 text-blue-400 ring-blue-400/20 hover:bg-transparent',
      active: 'bg-blue-200/90 hover:bg-blue-200/90 text-blue-800 ring-blue-600',
    },
    [TagColors.INDIGO]: {
      base: 'bg-indigo-400/10 text-indigo-400 ring-indigo-400/20 hover:bg-transparent',
      active:
        'bg-indigo-200 hover:bg-indigo-200 text-indigo-800 ring-indigo-600',
    },
    [TagColors.PURPLE]: {
      base: 'bg-purple-400/10 text-purple-400 ring-purple-400/20 hover:bg-transparent',
      active:
        'bg-purple-200/90 hover:bg-purple-200/90 text-purple-800 ring-purple-600',
    },
    [TagColors.PINK]: {
      base: 'bg-pink-400/10 text-pink-400 ring-pink-400/20 hover:bg-transparent',
      active: 'bg-pink-200/90 hover:bg-pink-200/90 text-pink-800 ring-pink-600',
    },
  }

  const colorVariant = colorVariants[color]

  return colorVariant[isActive ? 'active' : 'base']
}
