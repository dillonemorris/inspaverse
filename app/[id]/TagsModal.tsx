'use client'
import useSWR from 'swr'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import { API_RANDOM_QUOTE, fetcher, Tag, getColorVariant } from '@/app/util'
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

  const handleGetTagColorVariant = ({ color, slug }: Tag) =>
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
                    getTagColorVariant={handleGetTagColorVariant}
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

const addTagParamToUrl = (url: string, tags: string[]): string => {
  const param = tags.length > 1 ? tags.join('|') : tags[0]
  return tags.length ? `${url}?tags=${param}` : url
}

const useInitialTags = (): string[] => {
  const searchParams = useSearchParams()
  const tagParam = searchParams.get('tags')
  return tagParam?.split('|') || []
}

type TagsProps = {
  onTagClick: (tag: string) => void
  getTagColorVariant: (tag: Tag) => string
  tags: Tag[]
}

const Tags = ({ onTagClick, getTagColorVariant, tags }: TagsProps) => {
  return tags.map((tag) => {
    return (
      <button
        key={tag.slug}
        onClick={() => onTagClick(tag.slug)}
        className={`inline-flex m-1 items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset
        ${getTagColorVariant(tag)} transition ease-in-out`}
      >
        {tag.name}
      </button>
    )
  })
}
