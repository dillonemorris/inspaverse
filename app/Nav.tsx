'use client'

import { useState } from 'react'
import { TagsModal } from './[id]/TagsModal'
import { TagIcon, SparklesIcon } from '@heroicons/react/20/solid'

export const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className="flex gap-8 relative">
      <SparklesIcon className="h-7 w-7 text-white-400" />
      <button onClick={() => setIsModalOpen(true)}>
        <TagIcon className="h-7 w-7 text-white-400" />
      </button>
      <TagsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
