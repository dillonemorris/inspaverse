'use client'

import { useState } from 'react'
import { TagsModal } from './[id]/TagsModal'
import { TagIcon, SparklesIcon, LinkIcon } from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'

export const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pathname = usePathname()
  const currentUrl = `http://localhost:3000/${pathname}`

  return (
    <div className="flex gap-8 relative justify-between">
      <div className="flex gap-8">
        <SparklesIcon className="h-7 w-7 text-white" />
        <button onClick={() => setIsModalOpen(true)}>
          <TagIcon className="h-7 w-7 text-white transition ease-in-out hover:text-gray-300 hover:scale-110 duration-300" />
        </button>
      </div>
      <button onClick={() => navigator.clipboard.writeText(currentUrl)}>
        <LinkIcon className="h-7 w-7 text-white transition ease-in-out hover:text-gray-300 hover:scale-110 duration-300" />
      </button>
      <TagsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
