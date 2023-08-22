'use client'

import { useState } from 'react'
import { TagsModal } from './[id]/TagsModal'

export const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <TagsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
